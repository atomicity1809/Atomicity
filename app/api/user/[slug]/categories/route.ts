import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/userSchema";

export async function POST(req: NextRequest) {
  await connectToDB();
  const { pathname } = new URL(req.url);
  const clerkId = pathname.split("/")[3];

//   console.log(clerkId);

  try {
    const { category } = await req.json();
    
    // Check if the category is valid
    if (!category || typeof category !== 'string') {
      return NextResponse.json(
        { success: false, error: "Invalid category" },
        { status: 400 }
      );
    }

    // Find the user by clerkId and add the new category to the interestedCategories array
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $addToSet: { interestedCategories: category } },  // $addToSet prevents duplicates
      { new: true }  // Return the updated document
    );

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
      { status: 500 }
    );
  }
}
