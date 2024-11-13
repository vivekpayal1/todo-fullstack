import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import User from "./userTypes";
import { config } from "../config/config";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }
  } catch (error) {
    console.error("Error checking existing user:", error);
    return next(createHttpError(500, "Internal server error"));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    console.error("Error hashing password:", error);
    return next(createHttpError(500, "Password hashing failed"));
  }

  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return next(createHttpError(500, "Failed to create user"));
  }

  try {
    const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "5d",
      algorithm: "HS256",
    });
    res.status(201).json({
      accessToken: token,
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return next(createHttpError(500, "Error generating token"));
  }
};

export { createUser };
