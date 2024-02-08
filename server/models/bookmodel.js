import mongoose from "mongoose";
// export const book = mongoose.model("book",{ name:String , author:String , pages: Number }); // better to use schema
const bookSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required: true,
        },
        publishYear:{
            type:Number,
            required:true,
        }
    },
    {
        timestamps:true,
    }

)

// module.exports = mongoose.model("book", )

export const Book = mongoose.model("book", bookSchema);   // cat will become the name of  collection in test database
// ab iska route(get/post) banana in server file isko import karke..

