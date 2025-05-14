import { Link, useNavigate } from "react-router-dom";
import { type SignupType } from "@jeet-dot-dev/medium-common";
import { useState, type ChangeEvent } from "react";
import axios from "axios";

const Form = () => {
  const [isSignup, setIsSignup] = useState(true);
  const url = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  // Initialize with all possible fields
  const [data, setData] = useState<SignupType>({
    email: "",
    password: "",
    name: "",
  });

  // onChange handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  // onClick handler
  const handleSubmit = async () => {
    try {
      if (isSignup) {
        // Use as SignupType
        console.log("Signing up:", data);

        const res = await axios.post(`${url}/api/v1/signup`, data);
        console.log(res);
        // setting the token
        const jwt = res.data.token;
        localStorage.setItem("Token", jwt);
        alert("welcome to medium");
        navigate("/blogs");
      } else {
        // Use as SigninType - omit name field
        const { email, password } = data;
        console.log("Signing in:", { email, password });
        // API call would go here
        const res = await axios.post(`${url}/api/v1/signin`, {
          email,
          password,
        });
        console.log(res);
        const jwt = res.data.token;
        localStorage.setItem("Token", jwt);
        alert("welcome to medium");
        navigate("/blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-center mb-2">
            {isSignup ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-gray-500 text-center mb-6">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <Link
              to={isSignup ? "/signin" : "/signup"}
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(!isSignup);
              }}
              className="text-black underline"
            >
              {isSignup ? "Login" : "Sign up"}
            </Link>
          </p>
        </div>
        <div className="space-y-4">
          {isSignup && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Username
              </label>
              <input
                id="name"
                type="text"
                value={data.name || ""}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="m@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-2 px-4 bg-[#18181a] cursor-pointer text-white rounded-md hover:bg-black transition-colors"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
