import { MdMenuBook } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Operators from '../Components/Operators'

import { useContext } from 'react';
import AppContext from "../utils/AppContext";


export default function Card( { book } ) {
  const { showModal, setShowModal } = useContext(AppContext);
  return (
    <div className='border border-white p-2 md:p-3 flex flex-col justify-start items-start gap-2 md:gap-3 w-5/6 md:w-1/4'>
        <div className='flex justify-between items-center w-full '>
            <div className="id text-xs font-mono">{ book._id }</div>
            <div className=' bg-sky-500 px-2 ' >{ book.publishYear }</div>
        </div>
        <div className="title">
            <MdMenuBook className='inline-block text-sky-400'/> {" "}
            { book.title }
        </div>
        <div className="author">
            <CgProfile className='inline-block text-sky-400' /> {" "}
            { book.author } 
        </div>
        <Operators id={book._id}  />
    </div>
  )
}
