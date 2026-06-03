import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const reviews = await db.getReviews(status as 'pending' | 'approved' | undefined);
    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Fetch reviews error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, rating, text } = body;

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const review = await db.addReview({
      name,
      rating: Number(rating),
      text
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('Add review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, action } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing review id' }, { status: 400 });
    }

    if (action === 'delete') {
      await db.deleteReview(id);
      return NextResponse.json({ success: true, message: 'Review deleted' });
    }

    if (status === 'approved' || status === 'pending') {
      await db.updateReviewStatus(id, status);
      return NextResponse.json({ success: true, message: 'Review updated' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Update review error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
