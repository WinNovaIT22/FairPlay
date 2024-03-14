import { NextResponse } from 'next/server';
import { db } from '@/utils/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id } = body;

    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await db.user.update({
      where: { id: id },
      data: {
        blocked: false,
      },
    });

    return NextResponse.json({ message: 'User unblocked successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error unblocking user:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
