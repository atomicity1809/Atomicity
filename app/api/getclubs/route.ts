import { NextResponse,NextRequest } from 'next/server';

import { connectToDB } from '@/lib/connectToDB';
import Event from '@/models/eventSchema';
import Admin from '@/models/adminSchema';

//to get all clubs
export async function GET(req:NextRequest) {
    await connectToDB();

    try {
        const clubs = await Admin.find({});
        // console.log(events);
        console.log("all clubs fetched ---------------------------------------------")
        return NextResponse.json({ success: true, data: clubs, message:"success" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: (error as Error).message }, { status: 400 });
    }
}
