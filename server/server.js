import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cardsRoute from "./routes/cards.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/cards", cardsRoute);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5001, () => console.log("Server running on http://localhost:5001"));
  })
  .catch(err => console.error(err));