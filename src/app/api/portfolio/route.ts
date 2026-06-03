import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const portfolio = await db.getPortfolio();
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error('Fetch portfolio error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { url, title, category } = body;

    if (!url || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const image = await db.addPortfolioImage({
      url,
      title,
      category
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    console.error('Add portfolio image error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
