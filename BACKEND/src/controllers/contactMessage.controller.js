import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ContactMessage } from "../models/contactMessage.model.js";
import { sendEmail } from "../utils/sendEmail.js";

const createContactMessage = asyncHandler(async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const ipAddress = req.ip;
    const userAgent = req.headers["user-agent"];

    if (!name || !email || !message) {
      throw new ApiError(400, "All fields are required");
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      message,
      ipAddress,
      userAgent,
    });

    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          contactMessage,
          "Contact message created successfully",
        ),
      );
  } catch (error) {
    console.error("Create Contact Message Error:", error);
    throw new ApiError(
      500,
      error?.message || "Failed to create contact message",
    );
  }
});

const getContactMessages = asyncHandler(async (req, res) => {
  try {
    const contactMessages = await ContactMessage.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          contactMessages,
          "Contact messages fetched successfully",
        ),
      );
  } catch (error) {
    console.error("Get Contact Messages Error:", error);
    throw new ApiError(500, error?.message || "Failed to get contact messages");
  }
});

const deleteContactMessage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const contactMessage = await ContactMessage.findByIdAndDelete(id);
    if (!contactMessage) {
      throw new ApiError(404, "Contact message not found");
    }
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          contactMessage,
          "Contact message deleted successfully",
        ),
      );
  } catch (error) {
    console.error("Delete Contact Message Error:", error);
    throw new ApiError(
      500,
      error?.message || "Failed to delete contact message",
    );
  }
});

export { createContactMessage, getContactMessages, deleteContactMessage };
