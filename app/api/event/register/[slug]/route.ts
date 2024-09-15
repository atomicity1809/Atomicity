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
        { success: false, error: "Event not found" },
        { status: 404 }
      );
    }
    // console.log(event);
    // Initialize registeredUsers if undefined
    if (!event.registeredUsers) {
      event.registeredUsers = [];
    }
    console.log("step1");

    // Check if registration is closed
    if (!event.isAvailableToReg) {
      return NextResponse.json(
        { success: false, error: "Registration closed" },
        { status: 406 }
      );
    }

    console.log("step2");

    // Add userId to the event's registeredUsers array
    if (!event.registeredUsers?.includes(userId)) {
      event.registeredUsers.push(userId);
      event.noOfParticipants += 1;
      // Save the updated event
      await event.save();
    }

    console.log("step3");

    // Fetch the user by ID
    console.log("line 56: ");

    // const user = await User.findById(userId);
    const user = await User.findOne({ clerkId: userId });

    // console.log("line 56: ", user);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 408 }
      );
    }
    console.log("step4");

    if (!user.registeredEvents) {
      user.registeredEvents = [];
    }

    // Add eventId to the user's registeredEvents array
    if (!user.registeredEvents?.includes(eventId)) {
      user.registeredEvents.push(eventId);
      await user.save();
    }

    return NextResponse.json(
      { success: true, message: "Successfully registered for the event" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message + "ok" },
      { status: 400 }
    );
  }
}
