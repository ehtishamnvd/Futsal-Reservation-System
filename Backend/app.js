import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";


//Routes
import teamRoute from "./routes/team.js";
import groundRoute from "./routes/ground.js";
// Import the new chatbot route
import chatbotRoute from "./routes/chatbot.js";

import academyRoute from "./routes/academy.js";
import * as CONSTANT from "./Constants/constants.js";

const app = express();

// CORS Configuration (Yeh pehle hi add karein)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

// Body Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Home Route (Add this before other routes)
app.get("/", (req, res) => {
  res.send("Futsal API Working! Try /team, /ground or /academy");
});

// Routes
app.use("/team", teamRoute);
app.use("/ground", groundRoute);
app.use("/academy", academyRoute);
app.use("/api/chatbot", chatbotRoute);

// 404 Handler
app.use("*", (req, res) => {
  res.status(404).send({ message: "Wrong Endpoint" });
});

// DB Connection
mongoose.connect(CONSTANT.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database Connected");
  app.listen(CONSTANT.PORT, () => 
    console.log(`Server running on port ${CONSTANT.PORT}`)
  );
})
.catch(err => console.log("Connection Failed:", err.message));