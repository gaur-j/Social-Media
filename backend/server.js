import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDB.js";
import userRouter from "./routes/userRouter.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/posts", postRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
