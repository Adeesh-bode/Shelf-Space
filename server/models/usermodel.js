import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username : {
            type: String,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        about : {
            type : String,
            required : false,
        },
        
        // password : String,
    },
    {
        timestamps:true,
    }
)

export const User = mongoose.model( "users", userSchema ); // ab iska route(get/post) banana in server file isko import karke
// users name of the newly creating collection, kuch specify nhi kiya toh test database mai banega 
