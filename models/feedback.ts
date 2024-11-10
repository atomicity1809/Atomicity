import mongoose, { Document, Schema } from "mongoose";

interface Feedback extends Document {
    clerkId: string;
    eventId: string;
    rating: number;
    feedback: string;
}

const feedbackSchema: Schema = new Schema<Feedback>({
    clerkId: { type: String, required: true },
    eventId: { type: String, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
});

const Feedback = mongoose.models.Feedback || mongoose.model<Feedback>("Feedback", feedbackSchema);

export default Feedback;
