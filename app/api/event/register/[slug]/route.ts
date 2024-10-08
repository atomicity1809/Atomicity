import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Event from "@/models/eventSchema";
import User from "@/models/userSchema";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await connectToDB();
  //   const { pathname } = new URL(req.url);
  //   console.log("pathname: ", pathname);
  //   const slug = pathname.split("/").pop();
  try {
    const { userId, eventId } = await req.json();

    console.log("get ids: ", userId, eventId);

    // Fetch the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { success: false, message: "Event not found" },
        { status: 404 }
      );
    }
    console.log("Step 1 pass, got event data: ",event);
    // Initialize registeredUsers if undefined
    if (!event.registeredUsers) {
      event.registeredUsers = [];
    }
    
    // Check if registration is closed
    if (!event.isAvailableToReg) {
      return NextResponse.json(
        { success: false, message: "Registration closed" },
        { status: 406 }
      );
    }

    console.log("step 2 pass, available to register: ");

    // Add userId to the event's registeredUsers array
    if (!event.registeredUsers?.includes(userId)) {
      event.registeredUsers.push(userId);
      event.maxAllowedParticipants += 1;
      // Save the updated event
      await event.save();
    }
    else{
      return NextResponse.json(
        { success: false, message: "User already registered" },
        { status: 408 }
      );
    }

    console.log("step3 pass, userId added to event registered users");

    
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 410 }
      );
    }
    console.log("step4 passed user found");

    if (!user.registeredEvents) {
      user.registeredEvents = [];
    }

    // Add eventId to the user's registeredEvents array
    if (!user.registeredEvents?.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }
    console.log("step 5 pass event id added to user registered events");

    return NextResponse.json(
      { success: true, message: "Successfully registered for the event" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}
