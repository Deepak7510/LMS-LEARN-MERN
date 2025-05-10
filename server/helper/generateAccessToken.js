import jwt from "jsonwebtoken";

function generateAccessToken(payload) {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return accessToken;
}

export default generateAccessToken;
