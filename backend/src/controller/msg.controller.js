import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getReceiverSoketId, io } from "../socketIO/server.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const sendMsg = asyncHandler(async (req, res) => {
  const sender = req.user;
  const { receiverId } = req.params;
  const { message } = req.body;

  if (!sender) {
    return res
      .status(400)
      .json(new apiResponse(400, "please first login", "failed"));
  }

  if (!receiverId) {
    return res
      .status(400)
      .json(new apiResponse(400, "please provide recever Id", "failed"));
  }

  if (!message) {
    return res
      .status(400)
      .json(new apiResponse(400, "message requred", "failed"));
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return res
      .status(400)
      .json(new apiResponse(400, "recever does not exsit", "failed"));
  }

  const msg = await Message.create({
    sender: sender._id,
    receiver: receiver._id,
    message,
    readStatus: false,
  });

  // const receiverSoketId = getReceiverSoketId(receiver._id);

  // if (receiverSoketId) {
  //   io.to(receiverSoketId).emit("newMsg", msg);
  // }

  const receiverSocketId = getReceiverSoketId(receiver._id.toString());

  if (receiverSocketId) {
  io.to(receiverSocketId).emit("newMsg", msg);
}

  return res
    .status(200)
    .json(new apiResponse(200, msg, "msg send successfully"));
});

const getUserMsg = asyncHandler(async (req, res) => {
  const sender = req.user;
  const { receiverId } = req.params;

  if (!sender) {
    return res
      .status(400)
      .json(new apiResponse(400, "please first login", "failed"));
  }

  if (!receiverId) {
    return res
      .status(400)
      .json(new apiResponse(400, "please provide recever Id", "failed"));
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return res
      .status(400)
      .json(new apiResponse(400, "recever does not exsit", "failed"));
  }

  await Message.updateMany(
    { sender: receiver._id, receiver: sender._id, readStatus: false },
    { $set: { readStatus: true } }
  );

  const msgs = await Message.find({
    $or: [
      { sender: sender._id, receiver: receiver._id },
      { sender: receiver._id, receiver: sender._id },
    ],
  }).sort({ createdAt: 1 });

  return res
    .status(200)
    .json(new apiResponse(200, msgs, "All msg fetched successfully"));
});

const unReadMsg = asyncHandler(async (req, res) => {
  const sender = req.user;
  const { receiverId } = req.params;

  if (!sender) {
    return res
      .status(400)
      .json(new apiResponse(400, "please first login", "failed"));
  }

  if (!receiverId) {
    return res
      .status(400)
      .json(new apiResponse(400, "please provide recever Id", "failed"));
  }

  const receiver = await User.findById(receiverId);

  if (!receiver) {
    return res
      .status(400)
      .json(new apiResponse(400, "recever does not exsit", "failed"));
  }

  const msgs = await Message.find({
    $and: [
      { sender: receiver._id, receiver: sender._id },
      { readStatus: false },
    ],
  });

  return res
    .status(200)
    .json(
      new apiResponse(200, { unRead: msgs.length }, "count fetch successfully")
    );
});

export { sendMsg, getUserMsg, unReadMsg };
