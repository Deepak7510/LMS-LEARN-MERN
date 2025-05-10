import verifyAccessToken from "../helper/verifyAccessToken.js";
import { ApiError } from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const accesstoken =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!accesstoken) {
    return next(new ApiError(401, "Unauthorized: No token provided"));
  }
  const decode = await verifyAccessToken(accesstoken);
  if (!decode) {
    return next(new ApiError(401, "Unauthorized access."));
  }
  req.user = decode;
  next();
});

export default isAuthenticated;
