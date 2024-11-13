import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome To Full Stack Todo App" });
});

// Register User
app.use("/api/users", userRouter);
// Login User
app.use("/api/users", userRouter);

app.use("/api/books", bookRouter);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
