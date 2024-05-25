const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const mongoose = require('mongoose');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT;

// Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

mongoose
    .connect(process.env.mongodbUrl,{
        newUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Successfully connected:");
    })
    .catch((error)=>{
        console.log("Some Error Occured:",error);
    });
app.listen(process.env.PORT, ()=>{
    console.log('listening on port:',PORT);
})
