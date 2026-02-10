import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Ensure uploads folder exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => console.error("MongoDB Error:", err));

// Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string
});

// Multer (disk storage + 5MB limit)
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Schema
const RegistrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  college: String,
  experience: String,
  paymentScreenshot: String,
  createdAt: { type: Date, default: Date.now }
});

const Registration = mongoose.model("Registration", RegistrationSchema);

// Route
app.post(
  "/register",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "Image required" });
      }

      // Upload to Cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path);

      // Remove local file after upload
      fs.unlinkSync(req.file.path);

      // Save to DB
      await Registration.create({
        ...req.body,
        paymentScreenshot: result.secure_url
      });

      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  }
);

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});