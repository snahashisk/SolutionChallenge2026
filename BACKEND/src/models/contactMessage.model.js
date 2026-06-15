import mongoose, { Schema } from "mongoose";

const contactMessageSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            minLength: [10, "Message must be at least 10 characters long"],
            maxLength: [1000, "Message must be at most 1000 characters long"],
            trim: true,
        },
        ipAddress: {
            type: String,
            trim: true,
        },
        userAgent: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true },
);

export const ContactMessage = mongoose.models.ContactMessage || mongoose.model("ContactMessage", contactMessageSchema);