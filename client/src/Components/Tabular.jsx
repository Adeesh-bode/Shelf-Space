import React , { useContext } from 'react'
import Operators from './Operators'
import BookModal from "./BookModal";
import AppContext from "../utils/AppContext";



export default function Tabular({ books }) {
  const { showModal, setShowModal } = useContext(AppContext);
  return (
    <table className='w-full border-separate border-spacing-2 ' >
          <thead>
            <tr>
              <th className='border border-gray-300 rounded-md '>No</th>
              <th className='border border-gray-300 rounded-md '>Title</th>
              <th className='border border-gray-300 rounded-md max-md:hidden'>Author</th>
              <th className='border border-gray-300 rounded-md max-md:hidden'>Publish Year</th>
              <th className='border border-gray-300 rounded-md '>Operations</th>
            </tr>
          </thead>
          <tbody>
            { 
              books.map((book,index)=>(
                <tr className='' key={index}>
                  { showModal && <BookModal id={book._id}  /> }
                  <td className='border border-gray-300 rounded-md text-center '>{ index + 1 }</td>
                  <td className='border border-gray-300 rounded-md text-center'>{ book.title }</td>
                  <td className='border border-gray-300 rounded-md max-md:hidden text-center'>{ book.author }</td>
                  <td className='border border-gray-300 rounded-md max-md:hidden text-center '>{ book.publishYear }</td>
                  <td className='border border-gray-300 rounded-md text-center  p-1'>
                    <Operators id={ book._id} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
  )
}
