import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Event from "@/models/eventSchema";
import User from "@/models/userSchema";

export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const { clerkId } = await req.json();
    const user = await User.findOne({ clerkId: clerkId });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    
    const eventDetails = await Promise.all(
      user.registeredEvents.map(async (registeredEvent: any) => {
        const event = await Event.findById(registeredEvent);

        if (event) {
          return {
            name: event.title,
            date: event.date,
            confno: registeredEvent.confno, // Get `confno` from registeredEvent entry
          };
        }
        return null; // If the event is not found, return null
      })
    );

    // Filter out any null values in case an event was not found
    const filteredEventDetails = eventDetails.filter(
      (detail: any) => detail !== null
    );

    return NextResponse.json(
      { success: true, userData: user, eventData: filteredEventDetails },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
