import React, { useState, useEffect } from 'react';
import Spinner from '../Components/Spinner';
import Structure from '../Components/Structure'; 
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';


export default function ShowBook() {
  const { id } = useParams();
  const  [ book, setBook] = useState({});
  const [ loading, setLoading ] = useState(false);

  useEffect(()=>{
    setLoading(true);
    axios
      .get(`https://shelf-space-backend.vercel.app/books/${id}`)
      .then((response)=>{
        setBook(response.data);
        
        console.log(response.data);
        console.log(book);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      })
  },[])
  
  return (
    <div className='flex flex-col justify-start items-center p-6 md:p-12 w-screen h-screen gap-2 md:gap-5'>
      <Structure heading='Show Book' />
      { loading ? (<Spinner />):(
      <div className="details border border-sky-500 max-w-max p-4 md:p-8 flex flex-col gap-2">
        <div className="id"><b>Id:</b>{" "}{book._id}</div>
        <div className="title"><b>Title:</b>{" "}{book.title}</div>
        <div className="author"><b>Author:</b>{" "}{book.author}</div>
        <div className="year"><b>Publish Year:</b>{" "}{book.publishYear}</div>
        <div className="creation"><b>Create Time:</b>{" "}{new Date(book.createdAt).toString()}</div>
        <div className="updated"><b>Last Updated:</b>{" "}{new Date(book.updatedAt).toString()}</div>
      </div>      
      )}
      <Link to={`/books/edit/${ book._id }`} >
        <button>Edit Book</button>
      </Link>      
    </div> 
  )
}
