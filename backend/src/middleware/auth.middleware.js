import User from "../models/user.model.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

      
    if (!token) {
      return res
        .status(401)
        .json(new apiResponse(401,  "unothrised user"));
    }

   
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user =await User.findById(decodeToken?._id).select("-password");
  

    if(!user){
        return res
        .status(404)
        .json(new apiResponse(404, "user not exist"));
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(500)
      .json(new apiResponse(500, error, "error in verify jwt"));
  }
});
