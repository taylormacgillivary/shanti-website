import mailchimp from '@mailchimp/mailchimp_marketing';

// Initialize Mailchimp client lazily
let isConfigured = false;

function ensureMailchimpConfigured() {
  if (!isConfigured) {
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });
    isConfigured = true;
  }
}

export interface SubscribeToListParams {
  email: string;
  firstName?: string;
  lastName?: string;
  listId: string;
  tags?: string[];
  mergeFields?: Record<string, string>;
}

export interface MailchimpResponse {
  success: boolean;
  message: string;
  error?: string;
  status?: string;
}

/**
 * Subscribe a user to a Mailchimp audience/list
 */
export async function subscribeToList({
  email,
  firstName,
  lastName,
  listId,
  tags = [],
  mergeFields = {},
}: SubscribeToListParams): Promise<MailchimpResponse> {
  try {
    // Ensure Mailchimp is configured
    ensureMailchimpConfigured();

    // Validate environment variables
    if (!process.env.MAILCHIMP_API_KEY) {
      console.error('MAILCHIMP_API_KEY environment variable is not set');
      throw new Error('MAILCHIMP_API_KEY is not configured');
    }
    if (!process.env.MAILCHIMP_SERVER_PREFIX) {
      console.error('MAILCHIMP_SERVER_PREFIX environment variable is not set');
      throw new Error('MAILCHIMP_SERVER_PREFIX is not configured');
    }

    console.log(`Mailchimp: Subscribing ${email} to list ${listId}`);

    // Build merge fields
    const merge_fields: Record<string, string> = {
      ...mergeFields,
    };

    if (firstName) {
      merge_fields.FNAME = firstName;
    }
    if (lastName) {
      merge_fields.LNAME = lastName;
    }

    // Add or update member
    const memberResponse = await mailchimp.lists.setListMember(
      listId,
      email.toLowerCase(),
      {
        email_address: email.toLowerCase(),
        status_if_new: 'subscribed',
        merge_fields,
      }
    );

    console.log(`Mailchimp: Member added/updated. Status: ${memberResponse.status}`);

    // Add tags if provided
    if (tags.length > 0) {
      console.log(`Mailchimp: Adding tags: ${tags.join(', ')}`);
      await mailchimp.lists.updateListMemberTags(
        listId,
        email.toLowerCase(),
        {
          tags: tags.map(tag => ({ name: tag, status: 'active' })),
        }
      );
    }

    return {
      success: true,
      message: 'Successfully subscribed to the list!',
      status: typeof memberResponse.status === 'string' ? memberResponse.status : undefined,
    };
  } catch (error: unknown) {
    console.error('Mailchimp subscription error:', error);

    const err = error as { status?: number; response?: { body?: { detail?: string; title?: string } }; message?: string };

    // Log detailed error information
    if (err.response?.body) {
      console.error('Mailchimp error details:', JSON.stringify(err.response.body, null, 2));
    }

    // Handle specific Mailchimp errors
    if (err.status === 400) {
      const errorDetail = err.response?.body?.detail || err.response?.body?.title || 'Invalid request';
      console.error(`Mailchimp 400 error: ${errorDetail}`);
      return {
        success: false,
        message: 'Invalid email address or data. Please check and try again.',
        error: errorDetail,
      };
    }

    if (err.status === 401) {
      console.error('Mailchimp 401 error: Invalid API key or authentication failed');
      return {
        success: false,
        message: 'Configuration error. Please contact support.',
        error: 'Invalid API credentials',
      };
    }

    if (err.status === 404) {
      console.error(`Mailchimp 404 error: List ${listId} not found`);
      return {
        success: false,
        message: 'List not found. Please check your configuration.',
        error: err.message || 'Unknown error',
      };
    }

    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
      error: err.message || 'Unknown error',
    };
  }
}

/**
 * Get list of all audiences
 */
export async function getAudiences() {
  try {
    ensureMailchimpConfigured();
    const response = await mailchimp.lists.getAllLists();
    return 'lists' in response ? response.lists : [];
  } catch (error) {
    console.error('Error fetching Mailchimp audiences:', error);
    throw error;
  }
}

/**
 * Check if an email is subscribed to a list
 */
export async function checkSubscription(email: string, listId: string) {
  try {
    ensureMailchimpConfigured();
    const response = await mailchimp.lists.getListMember(
      listId,
      email.toLowerCase()
    );
    return {
      subscribed: response.status === 'subscribed',
      status: response.status,
    };
  } catch (error: unknown) {
    const err = error as { status?: number };
    if (err.status === 404) {
      return {
        subscribed: false,
        status: 'not_found',
      };
    }
    throw error;
  }
}

type TagSignupStatus = 'requested' | 'already-requested' | 'pending' | 'resubscribe' | 'unavailable';

interface MailchimpApiError {
  status?: number;
  response?: { body?: { title?: string; detail?: string } };
}

/** Create a new subscriber or apply a request tag without updating an existing profile. */
export async function tagSignup({
  email,
  firstName,
  listId,
  tag,
}: { email: string; firstName: string; listId: string; tag: string }): Promise<TagSignupStatus> {
  if (!process.env.MAILCHIMP_API_KEY || !process.env.MAILCHIMP_SERVER_PREFIX) {
    throw new Error('Mailchimp credentials are not configured');
  }
  ensureMailchimpConfigured();

  const lookup = () => mailchimp.lists.getListMember(listId, email, { fields: ['status', 'tags'] });
  let member;
  try {
    member = await lookup();
  } catch (error) {
    if ((error as MailchimpApiError).status !== 404) throw error;

    try {
      member = await mailchimp.lists.addListMember(listId, {
        email_address: email,
        status: 'subscribed',
        merge_fields: { FNAME: firstName },
      });
    } catch (addError) {
      const { status, response } = addError as MailchimpApiError;
      const { title, detail } = response?.body ?? {};
      if (/compliance state|resubscribe|permanently deleted/i.test(`${title} ${detail}`)) {
        return 'resubscribe';
      }
      if (status !== 400 || title !== 'Member Exists') throw addError;
      // A concurrent signup created this contact after the first lookup.
      member = await lookup();
    }
  }

  if (member.status === 'pending') return 'pending';
  if (member.status === 'unsubscribed' || member.status === 'archived') return 'resubscribe';
  if (member.status !== 'subscribed') return 'unavailable';
  if ('tags' in member && member.tags?.some(({ name }) => name === tag)) return 'already-requested';

  await mailchimp.lists.updateListMemberTags(listId, email, {
    tags: [{ name: tag, status: 'active' }],
  });
  return 'requested';
}

export default mailchimp;

