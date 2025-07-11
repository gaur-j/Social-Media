import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { PostContext } from "../context/PostContext.jsx";
import SideBar from "../components/SideBar.jsx";
import { FaThumbsUp, FaCommentDots, FaTrash } from "react-icons/fa";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import Profile from "../components/Profile.jsx";

const PostsPage = () => {
  const { user } = useContext(AuthContext);
  const { allPosts, likePosts, postsComments, deletePost } =
    useContext(PostContext);

  const [comments, setComments] = useState({
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComments((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, id) => {
    e.preventDefault();
    if (comments.text.trim()) {
      postsComments(id, comments.text);
      setComments({ text: "" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row overflow-auto">
      <div className="hidden md:block p-3">
        <SideBar />
      </div>

      <div className="flex-1 p-4">
        <div className="container text-white h-[87vh] mx-auto max-w-screen-sm space-y-6 overflow-auto">
          {allPosts
            .slice()
            .reverse()
            .map((post, index) => {
              console.log("allPosts:", allPosts);
              return (
                <div
                  key={index}
                  className="bg-gradient-to-r from=[#14131e] to-[#1f1a3d] rounded-lg shadow p-4 space-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 justify-center items-center text-lg font-bold text-gray-600">
                      <img
                        src={post.user.avatar}
                        alt="User Avatar"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">
                        {post.user.username}
                      </h4>
                    </div>
                  </div>

                  <p className="text-white">{post.text}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full rounded-lg object-cover"
                    />
                  )}
                  <div
                    onClick={() => likePosts(post._id)}
                    className="flex justify-start gap-4 text-white text-sm items-center"
                  >
                    <div className="flex items-center gap-1">
                      <FaThumbsUp className="text-xl hover:text-blue-500 cursor-pointer" />
                      <span>{post.likes.length}Likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCommentDots className="text-xl" />
                      <span>{post.comments.length}Comments</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-white">Comments:</p>
                    <div className="max-h-20 overflow-y-scroll space-y-1">
                      {post.comments.slice(0, 3).map((comment, index) => (
                        <p
                          key={index}
                          className="text-white rounded p-2 flex flex-row justify-start items-center gap-2"
                        >
                          {comment.text}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="font-bold text-white">Delete</p>
                    <div className="max-h-20 overflow-y-scroll space-y-1">
                      <button
                        onClick={() => {
                          if (confirm("Delete this post?"))
                            deletePost(post._id);
                        }}
                        className="text-red-500 text-lg hover:text-red-700 rounded p-2 flex flex-row justify-start items-center gap-2"
                        title="Delete post"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  <form
                    onSubmit={(e) => handleSubmit(e, post._id)}
                    className="flex text-black items-center space-x-2 mt-4"
                  >
                    <div className="w-8 h-8 hidden md:block rounded-full bg-gray-200 overflow-hidden">
                      <img
                        src={user.avatar}
                        about="User Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input
                      type="text"
                      value={comments.text}
                      name="text"
                      onChange={handleChange}
                      className="flex-1 bordder border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-blue-300"
                      placeholder="write your comment.."
                    />
                    <div className="flex space-x-2">
                      <input
                        type="file"
                        id={`comment-attach-${post._id}`}
                        className="hidden"
                      />
                      <label
                        htmlFor={`comment-attach-${post._id}`}
                        className="cursor-pointer p-2 text-2xl rounded-full text-white"
                      >
                        <IoIosAttach />
                      </label>

                      <button
                        type="submit"
                        className="p-2 text-2xl rounded-full hover:bg-[#13072e] text-white"
                        title="Post comment File"
                      >
                        <IoSend />
                      </button>
                    </div>
                  </form>
                </div>
              );
            })}
        </div>
      </div>
      <div className="w-1/3">
        <Profile />
      </div>
    </div>
  );
};

export default PostsPage;
