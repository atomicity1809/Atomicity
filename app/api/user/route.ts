import { NextResponse,NextRequest } from 'next/server';

import { connectToDB } from '@/lib/connectToDB';
import User from '@/models/userSchema';

// create new user
export async function POST(req:NextRequest) {
    await connectToDB();

    try {
        const data = await req.json();
        const user = new User(data);
        await user.save();
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}

// get all users
export async function GET(req:NextRequest) {
    await connectToDB();

    try {
        const users = await User.find({});
        console.log(users);
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 400 });
    }
}
