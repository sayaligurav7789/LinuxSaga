import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

/* CORS (Allow Local + Vercel)  */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true
  })
);

app.use(express.json());

/* Ensure uploads folder exists */
const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB Connected!!"))
  .catch((err) => {
    console.error("MongoDB Error:", err);
    process.exit(1);
  });

/* Cloudinary Configuration */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

/* Multer Configuration */
const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (_req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 }
});

/* Mongo Schema */
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

/* Health Route */
app.get("/", (_req: Request, res: Response) => {
  res.send("LinuxSaga Backend Running");
});

/* Register Route */
app.post(
  "/register",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Payment screenshot required"
        });
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Delete local file
      fs.unlinkSync(req.file.path);

      // Save to MongoDB
      await Registration.create({
        ...req.body,
        paymentScreenshot: result.secure_url
      });

      return res.status(201).json({
        success: true,
        message: "Registration successful"
      });
    } catch (error) {
      console.error("Registration Error:", error);
      return res.status(500).json({
        success: false,
        message: "Server error"
      });
    }
  }
);

/* Start Server (Render Safe) */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});