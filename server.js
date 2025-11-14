import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connection } from "./config/connection.js";
import accountRouter from "./routes/accountRouter.js";
import projectRouter from "./routes/projectRouter.js";

const app = express();
dotenv.config();

// middleware
const allowedOrigins = [
  process.env.FE_LOCAL_HOST,
  process.env.FE_PRODUCTION_HOST,
];
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["POST", "PUT", "DELETE", "GET"],
    credentials: true,
  })
);
app.use(express.json());

const port = Number(process.env.PORT);

app.use("/account", accountRouter);
app.use("/project", projectRouter);

app.listen(port, () => {
  connection();
});
