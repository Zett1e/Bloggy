import React from "react";
import { useEffect } from "react";
import { api } from "../Api/Api";
import { useState } from "react";
import BlogCard from "./BlogCard";
import { setUser } from "../app/features/userSlice";
import {  useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);

  const getBlogs = ()=>{
    api
    .get(`/api/blogs`)
    .then((res) => setBlogs(res.data))
    .catch((err) => console.log(err));
  }

   const getUser = async () => {
    try {
      const user = await api.get("/api/user");
      dispatch(setUser(user.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogs()
    getUser()
  },[]);

  return (
    <div className="py-20 px-36">
     
      <div>
        {
          blogs.map((blog,index)=><BlogCard key={index} blog={blog} write={false}/>).reverse()
        }
      </div>
    </div>
  );
};

export default Home;
