import React, { useState, useEffect } from 'react';
import Structure from '../Components/Structure'
import { useParams , useNavigate  } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import axios from 'axios';
import Spinner from '../Components/Spinner';
import { BACKEND_URL } from '../../lib/constants/config';

export default function EditBook() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const [ status , setStatus ] = useState(false);
  const  { id } = useParams();
  const [book, setBook] = useState({ 
    // title:"",
    // _id:0,
    // author:"",
    // publishYear:0,
  });
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e)=>{
    // or const { name, value } = e.target; than direct name and value in square brackets
    setBook({... book , [e.target.name]: e.target.value  });
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    const editBook = {
      ...book,
      "publishYear" : parseInt(book.publishYear),
    }

    console.log(editBook);
    const url = BACKEND_URL + '/books/'+ id;
    console.log(url);
    await axios
      .put(url,editBook)
      .then((respoonse)=>{
        console.log(respoonse);
        console.log("Success");
        navigate(-1);
        enqueueSnackbar('Book Successful Edited ',{
          variant : 'success',
          autoHideDuration: 3000,
          anchorOrigin:{ horizontal: 'center' , vertical: 'top' },
          // dense:true, 
          // persist: Snackbar stays on the screen, unless it is dismissed (programmatically or through user interaction).Type: booleanDefault: false
        });
      })
      .catch((error)=>{ 
        console.log(error.message);
      })
  }

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`https://shelf-space-backend.vercel.app/books/${id}`)
      .then((response)=>{
        setBook(response.data);
        // console.log(book);
        setLoading(false);
        
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      })
  },[]);

  return (
    <div className='flex flex-col justify-start items-center p-6 md:p-12 w-screen h-screen gap-2 md:gap-5'>
      <Structure heading='Edit Book' />
      { loading ? (<Spinner /> ): (
        <form className='w-fit  flex flex-col justify-between items-center gap-4 md:gap-6 p-6 md:p-10 border border-sky-400' onSubmit={(e)=>handleSubmit(e)} >
          <h2>Enter Details of Book</h2>
          <div className="form flex flex-col justify-between items-center gap-2 md:gap-4">
            <input type='text' placeholder='Title of Book'  className='w-full px-2 py-1 text-left text-white border-white' name='title' value={book.title} onChange={(e)=>handleChange(e)}></input>
            <input type='text' placeholder='Author'  className='w-full px-2 py-1 text-left text-white border-white' name='author' value={book.author} onChange={(e)=>handleChange(e)}></input>
            <input type='Number' placeholder='Publish Year'  className='w-full px-2 py-1 text-left text-white border-white' name='publishYear'  value={book.publishYear} onChange={(e)=>handleChange(e)} ></input>
          </div>
          <input type="Submit"  className='bg-zinc-900 rounded-md hover:border hover:border-indigo-400 p-1 w-3/4 text-xl text-indigo-400' />
      </form>
      )}

    </div>
  )
}
