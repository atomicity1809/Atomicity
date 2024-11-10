import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/userSchema";
import Event from "@/models/eventSchema"; // assuming this is your event model
import { Document } from "mongoose";

export async function POST(req: NextRequest) {

  try {
    await connectToDB();

    // Find the user and get registered event IDs
    const { clerkId } = await req.json();
    // console.log(clerkId);
    const user = await User.findOne({ clerkId: clerkId }).select(
      "registeredEvents"
    );
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    // console.log(user);

    // Fetch each event’s details based on the registered events list
    const registeredEvents = await Event.find({
      _id: { $in: user.registeredEvents.map((eventId: string) => eventId) },
    }).select("title ownerName date location time");
    // console.log(registeredEvents);

    return NextResponse.json({
      success: true,
      data: { registeredEvents: registeredEvents },
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
