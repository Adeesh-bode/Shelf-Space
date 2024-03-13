
// samaj apan jb expressk function use kar rahe hai tb hum client se baat kar rahe hai(get/post routings)...
// aur mongodb ko connect karliye hai apan (through mongoose)...sidha vo particular model k through...jiska structure apan he banate hai...

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { mongoDBURL ,PORT } from "./config.js";
import { User } from "./models/usermodel.js";
// import { route } from 

const app = express();
app.use(express.json()); // middleware for parsing request body ( post request jo hai..usko achese se read karta hai.. postman pe error de raha tha)

app.use(cors()); // to fix cors policy error  // used allow all origin by empty paranthesis

// Can restrict by setting custom origin 

// app.use(                     ////////////////////////////////// ALLOW ALL ORIGIN WHEN LOCALHOST 3000 not used... nhi toh error dega
//     cors(
//         {
//             origin : "http://localhost:3000",
//             methods:["POST", "DELETE", "PUT", "GET"],
//             allowHeaders:['Content-Type'],
//         }
//     )
// )

import booksRoute from "./routes/booksRoute.js";
app.use("/books", booksRoute); // middleware for bookRoute and server file // each request with prefix of /books will user booksRoute

// console.log(mongoDBURL);

// helps express to use json body.. 
app.get("/",(req,res)=>{
    // console.log(req);
    console.log(req.url);
    // res.setHeader("type-content","html/text");
    res.status(234).send('welcome to MERN Stack Adesh...');
})

///// TODO

/// USER COLLECTION AND GET,POST, put ,delete methods only for practice karo..    ////!!!!!!!!!!!!!! Ab iske liye bhi route banao..auth lao issproject mai..


app.post("/users", async (req, res)=>{
    try {
        if( !req.body.username || !req.body.password ){
            return res.status(400).send({ message:"Send all required fields : username , password" });
        }        

        const newUser = {
            username: req.body.username,
            password : req.body.password
        } 

        const user = await User.create(newUser); // so yaha newUser add hoge return mai updated users ki list mil rahi hai..

        return res.status(201).send(user);

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message:error.message});
    }
})

app.get("/users", async(req,res)=>{
    try {
        const users = await User.find({});
        return res.status(201).send(users); 
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

mongoose
    .connect(mongoDBURL)
    .then(()=>{
        console.log("Successfully connected to mongodb")
        app.listen(PORT,()=>console.log(`Listening at port ${PORT}`)) // it will listen only when connected to mongodb // listen through expressjs
        // uppar mai deployent link dal dena
    })
    .catch((err)=>{
        console.log(err);
    })
