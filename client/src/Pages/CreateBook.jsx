import React, { useState } from 'react';
import axios from 'axios';

import  Structure  from '../Components/Structure'
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export default function CreateBook() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [ book , setBook] = useState({
    "title" :"",
    "author":"",
    "publishYear": ""
  })

  const navigate = useNavigate();


  const handleChange = (e)=>{
    // or const { name, value } = e.target; than direct name and value in square brackets
    setBook({... book , [e.target.name]: e.target.value  });
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const submitBook = {
      ...book,
      "publishYear" : parseInt(book.publishYear),
    }

    console.log(submitBook);
    
    await axios
      // always create endpoint routing link by backendurl/api/purpose
      .post("http://localhost:5555/books",submitBook)  // yaha badme mai jaha backend deploy kiya hai vaha ka address dalna
      // .post("https://shelf-space-backend.vercel.app/books",submitBook)  // yaha badme mai jaha backend deploy kiya hai vaha ka address dalna
      .then((respoonse)=>{
        console.log(respoonse);
        console.log("Succesfully Created");
        // window.alert("Succesfully Created")
        enqueueSnackbar('Book Successful Created ',{
          variant : 'success',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' }
        });
        navigate(-1);
      })
      .catch((error)=>{ 
        console.log(error.message);
      })
  }
  return (
    <div className='flex flex-col justify-start items-center p-6 md:p-12 w-screen h-screen gap-2 md:gap-5'>
      
      <Structure heading='Create Book' />

      <form className='w-fit flex flex-col justify-between items-center gap-4 md:gap-6 p-6 md:p-10 border border-sky-400' onSubmit={(e)=>handleSubmit(e)} >
          <h2>Enter Details of Book</h2>
          <div className="form flex flex-col justify-between items-center gap-2 md:gap-4">
          <input type='text' placeholder='Title of Book'  className='w-full px-2 py-1 text-left text-white border-white' name='title' onChange={(e)=>handleChange(e)}></input>
          <input type='text' placeholder='Author'  className='w-full px-2 py-1 text-left text-white border-white' name='author' onChange={(e)=>handleChange(e)}></input>
          <input type='Number' placeholder='Publish Year'  className='w-full px-2 py-1 text-left text-white border-white' name='publishYear' onChange={(e)=>handleChange(e)} ></input>
          </div>
          <input type="Submit"  
          className='bg-zinc-900 rounded-md hover:border hover:border-indigo-400 p-1 w-3/4 text-xl text-indigo-400'
          // onClick={()=>enqueueSnackbar('Book Successful Created ')}
          />
      </form>

    </div>
  )
}
