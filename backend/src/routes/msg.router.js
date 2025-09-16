import { Router } from "express";
import { verifyJwt } from "../middleware/auth.middleware.js";
import {
  getUserMsg,
  sendMsg,
  unReadMsg,
} from "../controller/msg.controller.js";
const router = Router();

router.use(verifyJwt);

router.route("/:receiverId").post(sendMsg).get(getUserMsg);
router.route("/unRead/:receiverId").get(unReadMsg);

export default router;
