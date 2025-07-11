import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import G from "../assets/G.png";
import Gojo from "../assets/gojo.png";
import HoverCard from "@darenft/react-3d-hover-card";
import "@darenft/react-3d-hover-card/dist/style.css";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import Google from "../assets/google.png";
import microsoft from "../assets/microsoft.png";

const Register = () => {
  const navigate = useNavigate();

  const { handleRegister } = useContext(AuthContext);

  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!avatar) return alert("Please upload an avatar");
    await handleRegister(
      userFormData.username,
      userFormData.email,
      userFormData.password,
      avatar
    );
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
              value={userFormData.username}
              name="username"
              onChange={handleChange}
              placeholder="username"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="email"
              value={userFormData.email}
              name="email"
              onChange={handleChange}
              placeholder="email"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={userFormData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <label
              htmlFor="avatarUpload"
              className="relative w-24 h-24 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center text-gray-400 cursor-pointer hover:border-blue-500 transition"
            >
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-sm text-center">Upload Avatar</span>
              )}
              <input
                id="avatarUpload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute w-full h-full opacity-0 cursor-pointer"
              />
            </label>
            {avatar && (
              <button
                onClick={() => setAvatar(null)}
                type="button"
                className="text-xs text-red-500 hover:underline"
              >
                Remove
              </button>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
            >
              Sign Up
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
        </div>
        <div className="mt-4 bg-[#251469e8] text-gray-400 rounded-lg p-4 text-center">
          I have an Account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            Log In
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

export default Register;
