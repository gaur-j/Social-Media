import axios from "axios";
import cookie from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";
import { toast } from "react-toastify";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const { backendUrl, token } = useContext(AuthContext);

  const [allPosts, setAllPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const utoken = cookie.get("token");

  const fetchAllPosts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/get-posts`);
      if (data.success) {
        setAllPosts(data.posts);
        console.log("Fetched from backend:", data.posts);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchPostsofLoginUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/posts/user-posts`, {
        headers: {
          Authorization: `Bearer ${utoken}`,
        },
      });
      if (data.success) {
        setUserPosts(data.posts);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const likePosts = async (id) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/api/posts${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${utoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const postsComments = async (id, text) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/posts/${id}/comment`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${utoken}`,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createPost = async (text, image) => {
    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/posts/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${utoken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
        navigate("/posts");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(`${backendUrl}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${utoken}`,
        },
      });
      if (data.success) {
        toast.success(data.message);
        fetchAllPosts();
        fetchPostsofLoginUser();
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message || error.reponse?.data?.message);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllPosts();
      fetchPostsofLoginUser();
    }
  }, [token]);

  const values = {
    fetchAllPosts,
    fetchPostsofLoginUser,
    likePosts,
    postsComments,
    createPost,
    deletePost,
    allPosts,
    setAllPosts,
    userPosts,
  };

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>;
};

export default PostContextProvider;
