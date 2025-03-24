import { NextResponse } from 'next/server';
import { RateLimiter } from 'limiter';

// Create a rate limiter: 10 requests per minute
const limiter = new RateLimiter({
  tokensPerInterval: 10,
  interval: "minute"
});

export async function GET() {
  try {
    // Check rate limit
    const hasToken = await limiter.tryRemoveTokens(1);
    if (!hasToken) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait a minute before trying again." },
        { status: 429 }
      );
    }

    // Call backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/positions/crypto-positions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch positions');
    }

    const positions = await response.json();
    return NextResponse.json(positions);

  } catch (error: Error | unknown) {
    console.error('Positions API Error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch positions',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
} 