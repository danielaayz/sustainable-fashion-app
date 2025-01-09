/*import mongoose, { Document, Model } from "mongoose";//Importing necessary modules from mongoose
import bcrypt from "bcryptjs"; //This is a library used for hashing passwords securely


// Define the shape of the user data in the database
//It includes the fields 'name', 'email', 'password', 'createdAt', and a method 'comparePassword'.
export interface IUser extends Document {
  name: string; 
  email: string; 
  password: string;  
  createdAt: Date; 
  comparePassword(password: string): Promise<boolean>; // Method for comparing passwords (used during login)
}

// Create the schema for user profile,
//  which defines how the user data is structured and validated before saving to the database.
const userSchema = new mongoose.Schema<IUser>({
  name: {
    type: String, // Defines the 'name' field as a string
    required: true, //Ensures that the 'name' is required when creating a user
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
// This is a Mongoose middleware that runs before saving a user document
// The middleware will only run if the password field is modified.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {  //check if the password was modified
    return next(); //if the password wasnt modified, skip the hashing process 
  }
// Hash the password using bcrypt (with a  round of 10, which is a good level of security)
  this.password = await bcrypt.hash(this.password, 10);
  next(); //Continue with the save operation after hashing the password
});

// Method to compare passwords during login
// This method allows you to check if the entered password matches the hashed password stored in the database
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create the 'User' model based on the schema
// The model allows us to interact with the 'users' collection in the MongoDB database.
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
// Export the User model so it can be used in other files (e.g., for user registration and login)
export default User; */