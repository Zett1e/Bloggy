import React from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Api/Api";
import { useEffect } from "react";
import { useState } from "react";

const BlogCard = ({ blog, write }) => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState([]);
  

  const deleteHandler = () => {
    api
      .delete(`/api/blogs/${blog.id}`)
      .then((res) => {
        console.log("Successfully Deleted");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    api
      .get("/api/users")
      .then((res) => setAuthor(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex items-center pb-5 border-b-[1px] mb-5">
      <div className="w-[70%]">
        <h1 onClick={()=>navigate('/detail',{state: {blog,author}})} className="text-2xl font-medium mb-2 cursor-pointer">
          {blog.title}
        </h1>
        <div className="flex gap-5">
          <span className="bg-gray-200 rounded-xl px-3">{blog.category}</span>
        </div>
        <p className="body mt-5 text-ellipsis overflow-hidden whitespace-nowrap w-[90%]">
          {blog.body}
        </p>
        {write ? (
          <div className="flex justify-end gap-5 mr-10 mt-5">
            <button
              onClick={() => navigate("/editblog", { state: { blog } })}
              className="bg-blue-400 px-5 rounded-sm"
            >
              Edit
            </button>
            <button
              onClick={deleteHandler}
              className="bg-red-400 px-5 rounded-sm"
            >
              Detele
            </button>
          </div>
        ) : null}
        <p className="text-right mr-10 mt-5 font-medium opacity-80"> created by {author.map((user)=> user.id === blog.user_id && user.name)} </p>
      </div>
      <div className="w-[30%]">
        {blog.image ? <img src={blog.image} alt="blog" /> : null}
      </div>
    </div>
  );
};

export default BlogCard;
