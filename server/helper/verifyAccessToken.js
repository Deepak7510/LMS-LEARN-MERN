import jwt from "jsonwebtoken";

function verifyAccessToken(token) {
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
  return decode;
}

export default verifyAccessToken;
