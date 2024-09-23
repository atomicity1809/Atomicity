import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Event from "@/models/eventSchema";
import Admin from "@/models/adminSchema";

export async function GET(req: NextRequest) {
  await connectToDB();
  const { pathname } = new URL(req.url);
  //   console.log("pathname: ", pathname);
  const slug = pathname.split("/").pop();
  try {
    const admin = await Admin.find({ clerkId: slug });
    // console.log(event);
    return NextResponse.json(
      { success: true, data: admin},
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}
