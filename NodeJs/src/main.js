import express from "express";
import mongoose from "mongoose";
import productRouter from "./routes/products";
import categoryRouter from "./routes/categories";
import authtRouter from "./routes/auth";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routers
app.use("/api", productRouter);
app.use("/api", authtRouter);
app.use("/api", categoryRouter);
app.get("/search", (req, res) => {
  console.log(req.query.q);
  res.render("seacrh");
});

// connect
mongoose
  .connect("mongodb://127.0.0.1/we17305") 
  .then(() => console.log("Db is connecting"))
  .catch(() => console.log("Failed connect")); // eslint-disable-line no-console

export const viteNodeApp = app;
