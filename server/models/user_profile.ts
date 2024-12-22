import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// Define the interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

// Create the user schema
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords during login
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Export the User model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;