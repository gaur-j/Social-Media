import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./context/AuthContext.jsx";
import NavBar from "./components/NavBar.jsx";
import { Navigate, Route, Routes } from "react-router-dom";
import PostsPage from "./pages/PostsPage.jsx";
import AddPost from "./components/AddPost.jsx";
import Landing from "./pages/Landing.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="h-screen">
      <ToastContainer />
      {token ? (
        <>
          <NavBar />
          <Routes>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/" element={<Navigate to="/posts" />} />
            <Route path="/create-post" element={<AddPost />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
