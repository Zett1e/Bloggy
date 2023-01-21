import React from "react";
import { Button, Label, TextInput,Textarea } from "flowbite-react";
import { useState } from "react";
import { api } from "../Api/Api";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import { useLocation } from "react-router-dom";

const EditBlog = () => {
    const {blog} = useLocation().state
    const [title, setTitle] = useState(blog.title);
    const [body, setBody] = useState(blog.body);
    const [image, setImage] = useState(blog.image);
    const [category, setCategory] = useState(blog.category);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const userid = user ? user.id : null;
  
    const submitHandler = (e) => {
      e.preventDefault()
      api
        .put(`/api/blogs/${blog.id}`, {
          title,
          body,
          image,
          user_id: userid,
          category,
        })
        .then((res) => {
          navigate("/myblogs");
        })
        .catch((err) => console.log(err));
    };
  return (
    <div className="h-screen flex flex-col items-center mt-10 ">
    <h1 className="text-3xl font-medium mb-5">Edit Blog</h1>
      <form onSubmit={submitHandler} className="flex flex-col gap-4 w-[30%]">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" />
          </div>
          <TextInput
            id="title"
            type="text"
            value={title}
            required={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="body" value="Body" />
          </div>
          <Textarea
            id="body"
            required={true}
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="image" value="Image Url (optional)" />
          </div>
          <TextInput
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="category" value="Category" />
          </div>
          <TextInput
            id="category"
            type="text"
            value={category}
            required={true}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <Button type="submit">Post</Button>
      </form>
    </div>
  )
}

export default EditBlog