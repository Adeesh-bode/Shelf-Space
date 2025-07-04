//todo: add users as shopowners , institutes  libraries
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongoDBURL, PORT } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

const corsOptions = {
  origin: ['https://shelfspacebackend.adesh.tech', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 200, 
    allowedHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
    credentials: true 
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

app.use(express.json());

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
    // yaha server.listen part is removed as it is deployed
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});

export default app;
