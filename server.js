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
  process.env.FE_PRODUCTION_HOST,
  process.env.FE_LOCAL_HOST,
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
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
