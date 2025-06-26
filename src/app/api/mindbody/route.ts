import { NextRequest, NextResponse } from 'next/server';

const MINDBODY_BASE_URL = 'https://api.mindbodyonline.com/public/v6';

export async function GET(request: NextRequest) {
  const { search, searchParams } = request.nextUrl;
  const path = searchParams.get('path');

  // Create a new URLSearchParams object from the original search string
  // and remove the 'path' parameter, so we're left with only the ones to forward.
  const mindBodyParams = new URLSearchParams(search);
  mindBodyParams.delete('path');

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  try {
    const url = new URL(`${MINDBODY_BASE_URL}${path}`);
    mindBodyParams.forEach((value, key) => {
      url.searchParams.append(key, value);
    });

    console.log('Fetching from MindBody:', url.toString());

    const response = await fetch(url.toString(), {
      headers: {
        'Api-Key': process.env.MINDBODY_API_KEY || '',
        'SiteId': process.env.MINDBODY_SITE_ID || '',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('MindBody API error:', data);
      return NextResponse.json(data, { status: response.status });
    }

    // Log the full response to inspect the data
    console.log('MindBody API Response:', JSON.stringify(data, null, 2));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error proxying to MindBody:', error);
    return NextResponse.json({ error: 'Failed to fetch from MindBody' }, { status: 500 });
  }
} 