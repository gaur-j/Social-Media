import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import HoverCard from "@darenft/react-3d-hover-card";
import "@darenft/react-3d-hover-card/dist/style.css";
import G from "../assets/G.png";
import Gojo from "../assets/gojo.png";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";

const Landing = () => {
  const navigate = useNavigate();

  const { handleLogin } = useContext(AuthContext);

  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(userFormData.email, userFormData.password);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen text-white p-6">
      <div className="md:flex md:w-1/2 items-center justify-center">
        <HoverCard scaleFactor={1.4}>
          <h1>Socials</h1>
          <img
            src={G}
            alt="logo"
            className="max-w-2xl mt-6 rotate-3 border rounded-lg border-gray-700 transition-transform duration-500 ease-in-out transform hover:translate-x-2 shadow-xl shadow-black translate-y-2 hidden lg:block"
          />
        </HoverCard>
      </div>

      <div className=" flex-1 max-w-md mx-4 sm:mx-auto p-4 border border-gray-500 rounded-xl">
        <div className="rounded-lg p-6 shadow-lg">
          <img src={Gojo} alt="logo" className="w-full h-22" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={userFormData.email}
              name="email"
              onChange={handleChange}
              placeholder="Ph no., username, or email"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="password"
              value={userFormData.password}
              name="password"
              onChange={handleChange}
              placeholder="password"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
            >
              Log in
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-700" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-1 border-gray-700" />
          </div>
          <div className="py-3 rounded-lg flex flex-row items-center justify-evenly space-x-2">
            <FaFacebook className="text-3x1 cursor-pointer" />
            <FaGoogle className="text-3x1 cursor-pointer" />
            <FaApple className="text-3x1 cursor-pointer" />
          </div>
          <a
            href="#"
            className="block text-center text-sm text-gray-400 mt-4 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div className="mt-4 bg-[#251469e8] text-gray-400 rounded-lg p-4 text-center">
          Don&apos;t have an Account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Sign Up
          </span>
        </div>
        <div className="mt-6 text-center">
          <p>Get the App.</p>
          <div className="flex justify-center space-x-4 my-4">
            <img
              src={Google}
              alt="Google Play"
              className="w-28 md:w-32 h-10 cursor-pointer"
            />
            <img
              src={microsoft}
              alt="Microsoft"
              className="w-28 md:w-32 h-10 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
