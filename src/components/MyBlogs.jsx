import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { api } from "../Api/Api";
import { useSelector } from "react-redux";
import BlogCard from "./BlogCard";

const MyBlogs = () => {
  const [myBlog, setMyBlog] = useState([]);
  const { user } = useSelector((state) => state.user);
  const userid = user ? user.id : null;

  useEffect(() => {
    api
      .get(`/api/users/${userid}`)
      .then((res) => setMyBlog(res.data.blog))
      .catch((err) => console.log(err));
  }, [myBlog]);

  return (
    <div className="py-20 px-36">
      <h1 className="text-3xl font-semibold mb-10">My Blogs</h1>
      <div>
        {
          myBlog.map((blog,index)=><BlogCard key={index} blog={blog} write={true}/>)
        }
      </div>
    </div>
  );
};

export default MyBlogs;
