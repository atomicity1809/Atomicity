import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Feedback from "@/models/feedback";

// submit feedback
export async function POST(req: NextRequest) {
  await connectToDB();

  try {
    const { clerkId, eventId, feedback, rating } = await req.json();
    console.log(clerkId,eventId,feedback,rating);
    if (!clerkId || !eventId || !feedback || rating === undefined) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }
    // Create a new feedback document
    const newFeedback = new Feedback({
      clerkId,
      eventId,
      feedback,
      rating,
    //   createdAt: new Date(),
    });

    // Save the feedback to the database
    await newFeedback.save();

    return NextResponse.json(
      { success: true, message: "Feedback submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
