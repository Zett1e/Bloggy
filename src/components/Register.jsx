import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { api } from "../Api/Api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const csrf = ()=> api.get('/sanctum/csrf-cookie')

  const registerHandler = async (e) => {
    e.preventDefault();
    await csrf()
    try {
      await api.post("/register", { name, email, password, password_confirmation });
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(e.response.data?.errors)
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-yellow-200">
    <h1 className="text-3xl font-medium mb-5">Register</h1>
      <form onSubmit={registerHandler} className="flex flex-col gap-4 w-[30%]">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Name" />
          </div>
          <TextInput
            id="name"
            type="text"
            value={name}
            placeholder="Enter Your Name"
            required={true}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            minLength="8"
            value={password}
            placeholder="Enter Your Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-red-500">{error.password && error.password[0]}</p>
        </div>
        <div className="mb-4">
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm Password" />
          </div>
          <TextInput
            id="password2"
            type="password"
            minLength="8"
            value={password_confirmation}
            placeholder="Confirm Your Password"
            required={true}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <p className="text-red-500">{error.password && error.password[0]}</p>
        </div>

        <Button type="submit">Register</Button>
        <div className="mx-auto">
          <span>Already Have an Account?</span>{" "}
          <Link className="text-blue-500" to="/register">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
