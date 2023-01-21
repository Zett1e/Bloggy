import React from "react";
import { useLocation } from "react-router-dom";

const BlogDetail = () => {
  const { blog,author } = useLocation().state;
  return (
    <div className="flex flex-col items-center justify-center my-5">
      <div className="w-[50%] ">
        <img className="w-full rounded " src={blog.image} alt="Blog" />
      <h1 className="text-3xl font-bold my-5"> {blog.title} </h1>
      <p> {blog.body} </p>
      <p className="text-right mt-5 font-medium opacity-80"> created by {author.map((user)=> user.id === blog.user_id && user.name)} </p>
      </div>
    </div>
  );
};

export default BlogDetail;
