import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongoDBURL, PORT } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

const corsOptions = {
    origin: 'https://shelf-space-frontend.vercel.app',
    optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/books", booksRoute);
app.get("/", (req, res) => {
    res.status(200).send('Welcome to MERN Stack Adesh...');
});

mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connected to MongoDB");
})
.catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

export default app;
