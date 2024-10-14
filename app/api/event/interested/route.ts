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
      console.log("got request to like button");
      if (!user.interestedEvents.includes(eventID)) {
        console.log("event liked and counter increamented");
        user.interestedEvents.push(eventID);
        event.likeCounter += 1;
      }
      else{
        console.log("event already liked");
      }
    } else {
      // Remove the event ID from the user's interestedEvents if it's there
      console.log("got request to dislike button");

      user.interestedEvents = user.interestedEvents.filter(
        (id: string) => id !== eventID
      );
      event.likeCounter = Math.max(0, event.likeCounter - 1); // Ensure it doesn't go below 0
      // Decrement the event's likeCounter
    }

    // Save the updated user and event
    await user.save();
    console.log("user saved");
    await event.save();
    console.log("event saved");

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
