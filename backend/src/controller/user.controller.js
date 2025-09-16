import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import User from "../models/user.model.js";

const createAcceessToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.genrateAccessToken();

    if (!accessToken) {
      return res
        .status(500)
        .json(new apiResponse(500, "cant genrate access token"));
    }

    return accessToken;
  } catch (error) {
    return res
      .status(500)
      .json(
        new apiResponse(500, error, "error occure during creating access token")
      );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!email) {
      return res.status(400).json(new apiResponse(400, "Email is required"));
    }
    if (!password) {
      return res.status(400).json(new apiResponse(400, "Password is required"));
    }
    if (!username) {
      return res.status(400).json(new apiResponse(400, "Username is required"));
    }

    if ([email, username, password].some((feild) => feild.trim() == "")) {
      return res
        .status(400)
        .json(new apiResponse(400, "plese provide the valid data"));
    }

    const isUserExsit = await User.findOne({ email: email });

    if (isUserExsit) {
      return res.status(400).json(new apiResponse(400, "user already exist"));
    }

    const user = await User.create({
      username,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res
        .status(400)
        .json(new apiResponse(500, "something get wrong in creating user"));
    }

    return res
      .status(200)
      .json(new apiResponse(200, createdUser, "user register succeessfully"));
  } catch (error) {
    return res
      .status(500)
      .json(new apiResponse(500, error, "error during register user"));
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(new apiResponse(400, "plese provide all field"));
  }

  if ([email, password].some((feild) => feild.trim() == "")) {
    return res
      .status(400)
      .json(new apiResponse(400, "plese provide the valid data"));
  }

  const isUserExist = await User.findOne({ email: email });

  if (!isUserExist) {
    return res.status(400).json(new apiResponse(404, "user is not found"));
  }

  const isPassValid = await isUserExist.isPassCorrect(password);

  if (!isPassValid) {
    return res.status(400).json(new apiResponse(400, "wrong password"));
  }

  const accessToken = await createAcceessToken(isUserExist._id);
  const logInUser = await User.findById(isUserExist._id).select("-password");

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "None", // adjust as needed
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new apiResponse(
        200,
        { accessToken, logInUser },
        "user logIn successFully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json(new apiResponse(400, "please first login"));
  }

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new apiResponse(200, {}, "user logout succeessfully"));
});

const getAlluser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json(new apiResponse(401, "please first login", "faild"));
  }

  const allUser = await User.find({ _id: { $ne: user._id } }).select(
    "-password"
  );

  return res
    .status(200)
    .json(new apiResponse(200, allUser, "all user Fetch successfully"));
});

const getuser = asyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json(new apiResponse(400, "please first login"));
  }

  const currUser = await User.findById(user._id).select("-password");

  return res
    .status(200)
    .json(new apiResponse(200, currUser, "user data fetch successfully"));
});

const getRecever = asyncHandler(async (req, res) => {
  const { receiverId } = req.params;
  const user = req.user;

  if (!user) {
    return res.status(400).json(new apiResponse(400, "please first login"));
  }

  if (!receiverId) {
    return res
      .status(400)
      .json(new apiResponse(400, "plese provide recevr id"));
  }

  const recever = await User.findById(receiverId).select("-password");
  if (!recever) {
    return res.status(404).json(new apiResponse(404, "recever not found"));
  }

  return res
    .status(200)
    .json(new apiResponse(200, recever, "user data fetch successfully"));
});

export { registerUser, loginUser, logoutUser, getAlluser, getuser, getRecever };
