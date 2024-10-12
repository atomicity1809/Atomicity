import { NextResponse, NextRequest } from "next/server";

import { connectToDB } from "@/lib/connectToDB";
import Event from "@/models/eventSchema";
import User from "@/models/userSchema";

// if user click interested button
export async function POST(req: NextRequest) {
  await connectToDB();
  const { pathname } = new URL(req.url);
  console.log("pathname: ", pathname);
  const slug = pathname.split("/").pop();
  const body = await req.json();
  const { userID, eventID, interested } = body;
  console.log(userID, eventID, interested);

  try {
    const event = await Event.findById(eventID);
    const user = await User.findOne({ clerkId: userID });

    if (!event || !user) {
      return NextResponse.json(
        { success: false, message: "Event or user not found" },
        { status: 404 }
      );
    }

    // Update the user's interestedEvents array
    if (interested) {
      // Add the event ID to the user's interestedEvents if not already there
      if (!user.interestedEvents.includes(eventID)) {
        user.interestedEvents.push(eventID);
        event.likeCounter += 1;
      }
    } else {
      // Remove the event ID from the user's interestedEvents if it's there
      user.interestedEvents = user.interestedEvents.filter(
        (id: string) => id !== eventID
      );
      event.likeCounter = Math.max(0, event.likeCounter - 1); // Ensure it doesn't go below 0
      // Decrement the event's likeCounter
    }

    // Save the updated user and event
    await user.save();
    await event.save();

    return NextResponse.json(
      { success: true, message: "User and event updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
