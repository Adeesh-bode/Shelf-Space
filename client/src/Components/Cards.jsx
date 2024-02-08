import React from 'react'
import Card from '../Components/Card';


export default function Cards({ books }) {
    console.log(books);
  return (
    <div className="w-screen p-5 md:p-6 flex justify-center items-center flex-wrap gap-2 md:gap-5">
          {
            books.map((data, index)=>(
              <Card book={ data } key={ index } />
            ))
          }
    </div>
  )
}
