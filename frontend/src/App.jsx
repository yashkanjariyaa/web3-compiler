import React from 'react'
import './App.css'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Editor from './components/Editor';
import Home from './components/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/editor/:id' element={<Editor/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
