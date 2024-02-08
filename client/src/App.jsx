import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Home from './Pages/Home.jsx'
import CreateBook from './Pages/CreateBook.jsx'
import DeleteBook from './Pages/DeleteBook.jsx'
import EditBook from './Pages/EditBook.jsx'
import ShowBook from './Pages/ShowBook.jsx'

import { AppProvider }from './utils/AppContext.jsx';
import { SnackbarProvider} from 'notistack';


export default function App() {
  return (
    <AppProvider>
    <SnackbarProvider className='anchorOriginTopCenter	'>
    <Routes>
      <Route path='/' element={<Home />} exact ></Route>
      <Route path='/books/create' element={< CreateBook />} exact ></Route>
      <Route path='/books/details/:id' element={<ShowBook />} exact ></Route>
      <Route path='/books/edit/:id' element={<EditBook />} exact ></Route>
      <Route path='/books/delete/:id' element={<DeleteBook />} exact ></Route> 
    </Routes>
    </SnackbarProvider>
    </AppProvider>
  )
}
