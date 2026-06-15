import { Router } from "express";
import { verifyEmail, verifyOtp } from "../controllers/anonymous.controller.js";

const anonymousRouter = Router();

anonymousRouter.route("/sendotp").post(verifyEmail);
anonymousRouter.route("/verifyotp").post(verifyOtp);

export { anonymousRouter };
