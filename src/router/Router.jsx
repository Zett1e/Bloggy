import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddBlog from '../components/AddBlog'
import BlogDetail from '../components/BlogDetail'
import EditBlog from '../components/EditBlog'
import Home from '../components/Home'
import Login from '../components/Login'
import MyBlogs from '../components/MyBlogs'
import Navbar from '../components/Navbar'
import Register from '../components/Register'

const Router = () => {
  return (
    <div>
    <Navbar />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/myblogs' element={<MyBlogs/>} />
            <Route path='/addblog' element={<AddBlog/>} />
            <Route path='/editblog' element={<EditBlog/>} />
            <Route path='/detail' element={<BlogDetail/>} />
        </Routes>
    </div>
  )
}

export default Router