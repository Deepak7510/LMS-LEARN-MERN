import express from "express";
import { upload } from "../../config/cloudinary.js";
import {
  deleteMedia,
  uploadMedia,
} from "../../controllers/media/media-controller.js";
const route = express.Router();

route.post("/upload", upload.single("file"), uploadMedia);
route.delete("/delete/:public_id", deleteMedia);

export default route;
