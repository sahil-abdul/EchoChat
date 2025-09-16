import {
  registerUser,
  loginUser,
  logoutUser,
  getAlluser,
  getuser,
  getRecever,
} from "../controller/user.controller.js";
import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/allUser").get(verifyJwt, getAlluser);

router.route("/getUser").get(verifyJwt, getuser);

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(verifyJwt, logoutUser);

router.route("/getRecever/:receiverId").get(verifyJwt, getRecever);

export default router;
