import { NextRequest, NextResponse } from 'next/server';

/**
 * API endpoint to handle coming soon email subscriptions
 * POST /api/coming-soon/subscribe
 *
 * Example usage in coming-soon.tsx:
 * const response = await fetch('/api/coming-soon/subscribe', {
 *   method: 'POST',
 *   body: JSON.stringify({ email }),
 *   headers: { 'Content-Type': 'application/json' },
 * });
 */

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Implement your email storage logic here
    // Examples:
    // - Save to database
    // - Add to mailing list service (Mailchimp, ConvertKit, etc.)
    // - Send confirmation email

    console.log('New subscriber:', email);

    return NextResponse.json(
      { message: 'Successfully subscribed!', email },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

