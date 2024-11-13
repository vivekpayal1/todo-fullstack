import app from "./src/app";
import { config } from "./src/config/config";
import connectDB from "./src/config/db";

const startServer = async () => {
  await connectDB();
  const port = config.port;
  app.listen(port, () => {
    console.log(`Listning on Port ${port}`);
  });
};
startServer();
