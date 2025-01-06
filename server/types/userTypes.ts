import { Request } from "express";

export interface RegisterRequestBody {
   name: string;
   email: string;
   password: string;
}

export interface LoginRequestBody {
   name: string; // Changed from username to name
   password: string;
}

export interface IUser {
   name: string;
   email: string;
   password: string;
   comparePassword(candidatePassword: string): Promise<boolean>;
}
