import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {name, email, password} = req.body;
  if(!name || !email || !password || !password) {
    const error = createHttpError(400, "All Fields are required");
    return next(error)
  }
  res.status(201).json({
    message: "User Created",
  });
};

export { createUser };
