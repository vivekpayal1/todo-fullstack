import express from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome To Full Stack Todo App" });
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
