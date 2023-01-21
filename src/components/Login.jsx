import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { useState } from "react";
import { api } from "../Api/Api";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const csrf = () => api.get("/sanctum/csrf-cookie");

  const loginHandler = async (e) => {
    e.preventDefault();
    await csrf();
    try {
      await api.post("/login", { email, password });
      navigate("/");
    } catch (e) {
      console.log(e);

      setError(e.response.data.errors);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-yellow-200">
      <form onSubmit={loginHandler} className="flex flex-col gap-4 w-[30%]">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            value={email}
            placeholder="name@flowbite.com"
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-red-500">{error.email && error.email[0]}</p>
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            minLength="8"
            placeholder="Enter Your Password"
            value={password}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500">{error.password && error.password[0]}</p>
        </div>

        <Button type="submit">Login</Button>
        <div className="mx-auto">
          <span>Don't Have Account?</span>{" "}
          <Link className="text-blue-500" to="/register">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
