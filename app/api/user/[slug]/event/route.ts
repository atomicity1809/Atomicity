import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/lib/connectToDB';
import User from '@/models/userSchema';
import { Document } from 'mongoose';

interface UserDocument extends Document {
  registeredEvents: string[];
  interestedEvents: string[];
}

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const userId = slug;
  console.log(slug, userId);

  try {
    await connectToDB();
    
    // Find user without populating events - just get the IDs
    const user = await User.findOne({ clerkId: userId })
      .select('registeredEvents interestedEvents') as UserDocument | null;

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        registeredEvents: user.registeredEvents,
        interestedEvents: user.interestedEvents,
      },
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}