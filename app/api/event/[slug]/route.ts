import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Event from "@/models/eventSchema";
import User from "@/models/userSchema";

export async function POST(req: NextRequest) {
  await connectToDB();
  const { pathname } = new URL(req.url);
  console.log("pathname: ", pathname);
  const slug = pathname.split("/").pop();
  const body = await req.json();
  const userID = body.userID;
  var isInterestedInitial = false;
  console.log(userID);

  try {
    const event = await Event.find({ _id: slug });
    const user = await User.find({ clerkId: userID });
    if (user[0]?.interestedEvents.includes(slug)) {
      isInterestedInitial = true;
    }
    console.log("Is interested from route ts 22: ",isInterestedInitial);

    // console.log(event);
    return NextResponse.json(
      { success: true, data: event, eventId: slug, isInterested:isInterestedInitial },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
