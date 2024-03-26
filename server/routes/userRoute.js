import { User } from "../models/usermodel.js";
import express from "express";
import CryptoJS from 'crypto-js';

// import { UsersBooks } from "../models/usersbooks.js";
/// USER COLLECTION AND GET,POST, put ,delete methods only for practice karo..    
////!!!!!!!!!!!!!! Ab iske liye bhi route banao..auth lao issproject mai..

const router = express.Router(); 
router.post("/signup", async (req, res)=>{    
    try {
        // setting custom errors
        if( !req.body.email || !req.body.password || !req.body.username ){
            return res.status(201).send({ message: "Send all required fields : username , password , email" });
        } 
        else if(await User.findOne({email: req.body.email })){
            return res.status(202).send({ message:"Email Already in use"});
        }
        else if( req.body.password < 6){
            return res.status(203).send({ message:"Password atleast 6 characters" });
        }       
        const hash = CryptoJS.HmacSHA256( req.body.password, "happy").toString();
        // console.log("Hashed:",  CryptoJS.HmacSHA256( req.body.password).toString())
        const newUser = {
            username: req.body.username,
            email : req.body.email,
            password :  hash,
            // password : CryptoJS.HmacSHA256( req.body.password, "happy").toString(),
            // password :  req.body.password,
        } 

        await User.create(newUser); // so yaha newUser add hoge return mai updated users ki list mil rahi hai..
        
        const uid  = await User.find({ email: newUser.email} , { _id: 1}); // where clause , projection clause

        return res.status(200).send(uid );

    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
})

router.post("/login", async (req, res)=> {
    try {
        // setting custom errors
        if( !req.body.email || !req.body.password ){
            return res.status(201).send({ message:" Send all required fields : username , password , email "});
        } 
        const hash = CryptoJS.HmacSHA256( req.body.password , "happy").toString() ;
        const userData = await User.findOne( { email: req.body.email , password: hash} )
        if(userData){
            return res.status(200).send(userData._id);
        }
        else{
            return res.status(202).send({message:"No User Found, recheck credentials"});
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).send({message:error.message});
    }
})

router.get("/", async(req,res)=>{
    try {
        const users = await User.find({});
        return res.status(201).send(users); 
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

export default router;