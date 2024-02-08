import React , { useState , useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'
// import AppContext from "../utils/AppContext";
import { BiShow } from 'react-icons/bi';
import BookModal from "./BookModal";

export default function Operators({ id }) {
  // const { showModal, setShowModal } = useContext(AppContext);
  const [ showModal, setShowModal ] = useState(false);
  // console.log(id);
  return (
    <div className='flex justify-center items-center gap-2 md:gap-4 text-2xl w-full'>
        <BiShow className='text-sky-300' onClick={()=>setShowModal(true)}/>
        { showModal && <BookModal id={ id } set={setShowModal} /> }
        <Link to={`/books/details/${id}`}>
            <BsInfoCircle  className='text-sky-300'/>
        </Link>
        <Link to={`/books/edit/${id}`}>
            <AiOutlineEdit className='text-yellow-300'/>                    
        </Link>
        <Link to={`books/delete/${id}`}>
            <MdOutlineDelete className='text-red-300'/>
        </Link>
    </div>
  )
}
