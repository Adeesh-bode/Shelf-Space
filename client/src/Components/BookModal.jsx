import React , { useContext , useEffect  , useState }from 'react'
import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useParams } from 'react-router-dom';

import axios from 'axios';
//////// Utilise card component to give rise to modal ( just desriptn he toh banana hai)

import AppContext from '../utils/AppContext';

export default function BookModal({ id ,set }) {
//   const { id } = useParams();
//   const [ loading, setLoading ] = useState(false);
  const [book, setBook] = useState({ 
    // title:"",
    // _id:0,
    // author:"",
    // publishYear:0,
  });

  console.log(id);
  const { setShowModal } = useContext(AppContext);

  useEffect(()=>{
    // setLoading(true);
    axios
      .get(`https://shelf-space-backend.vercel.app/books/${id}`)
      .then((response)=>{
        setBook(response.data);
        // console.log(book);
        // setLoading(false);

        console.log(book);
        
      })
      .catch((error)=>{
        console.log(error);
        // setLoading(false);
      })
  },[]);

  return (
    <div className='h-screen w-screen bg-zinc-300  bg-opacity-30 fixed z-100 left-0 top-0 flex justify-center items-center  '
        onClick={(event)=> event.stopPropagation()}>
        <div className='text-xl rounded-md bg-zinc-800 border border-sky-500 p-2 md:p-3 flex flex-col justify-start items-start gap-2 md:gap-3 w-5/6 md:w-1/3'>
        <div className='flex justify-between items-center w-full '>
            <div className=' bg-sky-500 px-2 ' >{ book.publishYear }</div>
            <IoMdClose className='text-sky-400' onClick={()=>set(false)} />
        </div>
        <div className="id text-xs font-mono">{ book._id }</div>
        <div className="title">
            <MdMenuBook className='inline-block text-sky-400'/> {" "}
            { book.title }
        </div>
        <div className="author">
            <CgProfile className='inline-block text-sky-400' /> {" "}
            { book.author } 
        </div>
        <div>Description of Book</div>
        <p className='text-left'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis corporis quae tenetur fuga vitae facere obcaecati odit tempore debitis ratione quia, recusandae iste fugiat aliquam adipisci voluptates. Eum, minima nisi!
        </p>
    </div>
    </div>
  )
}
