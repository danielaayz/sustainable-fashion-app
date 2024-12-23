import express, { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user_profile";


const router = express.Router();

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  username: string;  // Change email to username
  password: string;
}

// Define handler with explicit Express types
const registerHandler = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const loginHandler = async (
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  console.log("Request Body:", req.body); // Debugging

  try {
    const user = await User.findOne({ name: username  });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    console.log("Password Match:", isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "tokenIDkeepingitsecret", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add type assertions to the route handlers
router.post("/register", registerHandler as express.RequestHandler);
router.post("/login", loginHandler as express.RequestHandler);

export default router;