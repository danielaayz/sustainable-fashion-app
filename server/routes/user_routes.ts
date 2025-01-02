import express, { Request, Response, NextFunction } from "express"; //framework to build the backend
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user_profile"; //import User from the user_profile.ts model, which represents the user schema and interacts with the MongoDB database.

//creating a router for routes (register and login )
const router = express.Router();

//these interfaces define the structure of the data that the user will send in their requests:
interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  username: string;  
  password: string;
}

// Define handler with explicit Express types.
//This function handles user registration.
const registerHandler = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body; //extracts name, email and password from body
  
  try {
    const existingUser = await User.findOne({ email }); //checks if user excits in the db.
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" }); //if user exists, sends a error message "user already exists"
    }
    //if user doesnt exists, it creates a new user 
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
  // console.log("Request Body:", req.body); // Debugging

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

    //If the password is correct, a JWT token is generated using jwt.sign. 
    //The token is created with the user's ID (user._id) and has an expiration time of 1 hour.
    //The token is sent back in the response, allowing the user to be authenticated for subsequent requests.
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