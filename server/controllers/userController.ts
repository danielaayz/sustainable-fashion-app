import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userProfile.js";
import { RegisterRequestBody, LoginRequestBody } from "../types/userTypes.js";

//This function handles user registration.
export const registerHandler = async (
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

export const loginHandler = async (
   req: Request<{}, {}, LoginRequestBody>,
   res: Response,
   next: NextFunction
) => {
   const { name, password } = req.body; //// Changed from username to name

   try {

            const user = await User.findOne({ name: name });
            if (!user) {
               return res.status(400).json({ message: "Invalid credentials" });
            }
      
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
               return res.status(400).json({ message: "Invalid credentials" });
            }
      
            const token = jwt.sign({ id: user._id }, "tokenIDkeepingitsecret", {
               expiresIn: "1h",
            });
      
            res.status(200).json({
               message: "Login successful",
               token,
               user: {
                  id: user._id,
                  name: user.name,
                  email: user.email
               }
            });
         } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
         }
      };