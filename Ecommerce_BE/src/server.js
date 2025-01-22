/* eslint-disable no-console */
import express from "express";
import { env } from "./config/env";
import { API } from "~/routes/index";
import { connectToDB } from "~/config/connectDB";
import cors from "cors";
import cookieParser from "cookie-parser";

const SERVER = () => {
  const app = express();

  let corsOptions = {
    origin: "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true,
  };

  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use(express.json());
  app.use("/api", API);

  if (env.BUILD_MODE == "dev") {
    app.listen(env.APP_PORT, () => {
      console.log(`Running on: http://${env.APP_HOST}:${env.APP_PORT}/api`);
    });
  }
};

connectToDB()
  .then(() => console.log("Connect to SQL Server successfully!"))
  .then(() => SERVER())
  .catch((err) => console.log(err));
