import express from "express";

import isAuthenticated from "../../middleware/isAuthenticated.js";
import {
  checkAuth,
  logoutUser,
  signinUser,
  signupUser,
} from "../../controllers/auth/auth-controller.js";

const route = express.Router();

route.post("/signup", signupUser);
route.post("/signin", signinUser);
route.get("/check-auth", isAuthenticated, checkAuth);
route.get("/logout", isAuthenticated, logoutUser);

export default route;
