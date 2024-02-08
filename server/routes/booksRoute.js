import express from "express";
import { Book } from "../models/bookmodel.js";

// const app = express();
// app.use(express.json());
const router  = express.Router();

/// now create its middleware in sever file  and specify default routing prefix  to "/books" and remove /books from here belows...

//route to save a new 
router.post('/',async(req,res)=>{
    try {
        if( !req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).send({ message: "Send all requiredfields : title, author, publishYear"})
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear : req.body.publishYear,
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
})

// route to get all books from database
router.get("/",async(req,res)=>{
    try {      
        const books = await Book.find();           //{title: "gods"});
        return res.status(201).send({
            count: books.length,
            data : books,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

// route to get all books from database by id
// to include parameter in route we use :
router.get("/:id",async(req,res)=>{ 
    try {      

        const { id } = req.params;

        const book = await Book.findById(id);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})

router.put("/:id", async(req,res)=>{
    try {
        // pehle validation
        if( !req.body.title || !req.body.author || !req.body.publishYear ){
            return res.status(400).send({ message:"Send all required fields : title, author, publishYear "})
        }

        // else
        const { id } = req.params;
        // const book = await Book.updateOne({ _id : id} , { });
        const result = await Book.findByIdAndUpdate( id, req.body);

        if(!result){ 
            // if return if false
            return res.status(404).json({message:"Book Not Found "});
        }

        return res.status(200).send({messgae:"Book Updated Successfully"})

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: error.message});
    }
})

// route for delete a book
router.delete("/:id", async (req, res)=>{
    try {
        const {id} = req.params;

        const result = await Book.deleteOne({_id: id });
        if(!result){
            return res.status(300).send({message:"Book Not found"});
        }
        return res.status(200).send({message:"Book Deleted Successfully"})

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}) 

// paractice by title ---------- nhi jama badme dekhna

router.get("/title/:title",async(req,res)=>{ 
    try {      
        const { title } = req.params;
        const book = await Book.find({title : title });
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
})


export default router;