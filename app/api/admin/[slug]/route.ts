import { NextResponse, NextRequest } from "next/server";
import { connectToDB } from "@/lib/connectToDB";
import Admin from "@/models/adminSchema";
import mongoose from "mongoose";

// Helper function for error responses
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json(
    { success: false, message },
    { status }
  );
};

// Helper function for success responses
const createSuccessResponse = (data: any, status: number) => {
  return NextResponse.json(
    { success: true, data },
    { status }
  );
};

// GET: Fetch Admin details using MongoDB _id
export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  await connectToDB();

  const adminId = params.slug; // The slug now represents the MongoDB _id

  // Basic validation: Check if adminId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return createErrorResponse("Invalid admin ID", 400);
  }

  try {
    // Fetch admin details from the database using the MongoDB _id
    const adminDetails = await Admin.findById(adminId);

    // Check if admin details were found
    if (!adminDetails) {
      return createErrorResponse("Admin not found", 404);
    }

    // Respond with the fetched admin details
    return createSuccessResponse(adminDetails, 200);
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return createErrorResponse("Internal server error", 500);
  }
}

// PUT: Update Admin details using MongoDB _id
export async function PUT(req: NextRequest, { params }: { params: { slug: string } }) {
  await connectToDB();

  const adminId = params.slug; // The slug represents the MongoDB _id

  // Basic validation: Check if adminId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    return createErrorResponse("Invalid admin ID", 400);
  }

  try {
    // Parse the request body to get the updated data
    const updatedData = await req.json();

    // Validate if there is any data to update
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return createErrorResponse("No data provided for update", 400);
    }

    // Find the admin by MongoDB _id and update all provided fields
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    // Check if the admin was found and updated
    if (!updatedAdmin) {
      return createErrorResponse("Admin not found", 404);
    }

    // Respond with the updated admin details
    return createSuccessResponse(updatedAdmin, 200);
  } catch (error) {
    console.error("Error updating admin details:", error);

    // Specific error handling for validation errors
    if (error.name === "ValidationError") {
      return createErrorResponse("Validation failed for the provided data", 400);
    }

    return createErrorResponse("Internal server error", 500);
  }
}
