import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/userSchema";

export async function GET(req: NextRequest) {
  await connectToDB();
  const { pathname } = new URL(req.url);
  const clerkId = pathname.split("/").pop();

  try {
    const user = await User.findOne({ clerkId: clerkId });
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}

export async function PUT(req: NextRequest) {
  await connectToDB();
  const { pathname } = new URL(req.url);
  const clerkId = pathname.split("/").pop();

  try {
    const data = await req.json();
    const updatedUser = await User.findOneAndUpdate({ clerkId: clerkId }, data, { new: true });

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 400 }
    );
  }
}