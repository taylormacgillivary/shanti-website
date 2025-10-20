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
      throw new Error('MAILCHIMP_API_KEY is not configured');
    }
    if (!process.env.MAILCHIMP_SERVER_PREFIX) {
      throw new Error('MAILCHIMP_SERVER_PREFIX is not configured');
    }

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
    await mailchimp.lists.setListMember(
      listId,
      email.toLowerCase(),
      {
        email_address: email.toLowerCase(),
        status_if_new: 'subscribed',
        merge_fields,
      }
    );

    // Add tags if provided
    if (tags.length > 0) {
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
    };
  } catch (error: unknown) {
    console.error('Mailchimp subscription error:', error);

    const err = error as { status?: number; response?: { body?: { detail?: string } }; message?: string };

    // Handle specific Mailchimp errors
    if (err.status === 400) {
      return {
        success: false,
        message: 'Invalid email address or already subscribed.',
        error: err.response?.body?.detail || err.message || 'Unknown error',
      };
    }

    if (err.status === 404) {
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

export default mailchimp;

