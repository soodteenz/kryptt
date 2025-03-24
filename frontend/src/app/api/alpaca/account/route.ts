import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = await fetch('http://localhost:8000/api/v1/alpaca/account', {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Alpaca account data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account data' },
      { status: 500 }
    );
  }
} 