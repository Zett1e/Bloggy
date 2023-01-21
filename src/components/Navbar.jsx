import { Dropdown } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../Api/Api";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../app/features/userSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    api
      .post("/logout")
      .then((res) => dispatch(setUser(null)))
      .catch((err) => console.log(err));
  };


  return (
    <header className="flex justify-between items-center px-10 py-5 bg-yellow-200">
      <div>
        <Link to="/" className="text-4xl font-bold">
          Bloggy
        </Link>
      </div>
      {user ? (
        <nav className="flex gap-10">
          <Link className="font-medium" to="addblog">
            New Blog
          </Link>
          <div className="font-medium">
            <Dropdown label={user.name} inline={true}>
              <Dropdown.Item
                onClick={() => {
                  navigate("myblogs");
                }}
              >
                My Blogs
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler}>Log out</Dropdown.Item>
            </Dropdown>
          </div>
        </nav>
      ) : (
        <nav className="flex gap-10">
          <Link className="font-medium" to="/login">
            Login
          </Link>
          <Link className="font-medium" to="/register">
            Register
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
