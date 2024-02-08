import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

import Spinner from '../Components/Spinner'

import { Link } from 'react-router-dom'
import { MdOutlineAddBox} from 'react-icons/md'

import Cards from '../Components/Cards';
import Tabular from '../Components/Tabular';


import AppContext from '../utils/AppContext';

export default function Home() {
  const [ books, setBooks] = useState([]);
  const [ loading, setLoading ] = useState(false);
  // const [ tabular , setTabular] = useState(true);
  const { tabular , setTabular } = useContext(AppContext);
    useEffect(()=>{
      setLoading(true);
      axios
        .get('http://localhost:5555/books')
        .then((response)=>{
          setBooks(response.data.data);
          console.log(books);
          setLoading(false);
        })
        .catch((error)=>{
          console.log(error);
          setLoading(false);
        })
    },[]);

    return (
      <div className='text-white  p-6 md:p-10 flex flex-col justify-start items-center gap-3 md:gap-6 w-screen h-screen overflow-scroll'>
        {/* <div className="btns flex justify-between items-center  gap-6 md:gap-10 ">
          <button className="bg-sky-600 text-white rounded-md border-none shadow-blue" onClick={()=>setTabular(true)} >Table</button>
          <button className="bg-sky-600 text-white rounded-md border-none shadow-blue" onClick={()=>setTabular(false)}>Card</button>
        </div> */}
        <div className="btns flex justify-between items-center  gap-6 md:gap-10 ">
          <button className='bg-zinc-900 rounded-md hover:border hover:border-blue-700 text-base ' onClick={()=>setTabular(true)} >Table</button>
          <button className='bg-zinc-900 rounded-md hover:border hover:border-blue-700 text-base' onClick={()=>setTabular(false)}>Card</button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className='font-medium text-2xl md:text-3xl  '>Books List</div>
          <Link to='/books/create'>
            <MdOutlineAddBox  size={30} className='text-sky-600 '/>
          </Link>
        </div>

        { loading ? ( <Spinner /> ) :(  tabular ? ( <Tabular books={books} />) : ( <Cards books={ books } />  ) ) }

      </div>
    )
}
