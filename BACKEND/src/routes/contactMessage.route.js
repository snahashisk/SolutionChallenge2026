import { Router } from "express";
import { createContactMessage, getContactMessages, deleteContactMessage } from "../controllers/contactMessage.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const contactMessageRouter = Router();

contactMessageRouter.route("/createcontactmessage").post(createContactMessage);
contactMessageRouter.route("/getallcontactmessages").get(verifyJWT, getContactMessages);
contactMessageRouter.route("/deletecontactmessage/:id").delete(verifyJWT, deleteContactMessage);

export { contactMessageRouter };