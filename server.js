import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./config/connection.js";
import accountRouter from "./routes/accountRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();
dotenv.config();

// middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const port = Number(process.env.PORT);

app.use("/account", accountRouter);
app.use("/project", projectRouter);

app.listen(port, () => {
  connection();
  console.log(`running port: ${port}`);
});
