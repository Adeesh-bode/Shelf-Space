import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username : {
            type: String,
            required : true,
        },
        email : {
            type: String,
            required : true,
            unique:true,
        },
        password : {
            type : String,
            required : true,
        }
        // password : String,
    },
    {
        timestamps:true,
    }
)

export const User = mongoose.model( "users", userSchema ); // ab iska route(get/post) banana in server file isko import karke // compiling model
// users name of the newly creating collection, kuch specify nhi kiya toh test database mai banega 