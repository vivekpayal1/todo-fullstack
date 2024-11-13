import { NextFunction, Request, Response } from "express";

const createUser = (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({
    message: "User Created",
  });
};

export { createUser };
