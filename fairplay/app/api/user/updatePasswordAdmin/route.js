import { NextResponse } from 'next/server';
import { db } from '@/utils/db';
import { hash } from 'bcrypt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { id, newPassword } = body;

    const user = await db.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const hashedNewPassword = await hash(newPassword, 10);
    await db.user.update({
      where: { id: id },
      data: {
        password: hashedNewPassword,
      },
    });

    return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error changing password:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
