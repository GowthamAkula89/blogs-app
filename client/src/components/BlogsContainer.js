import { useState } from "react";
import { ClipLoader } from "react-spinners";
import BlogCard from "./blogCard";
import BlogModal from "./BlogModal";
import { useNavigate } from "react-router-dom";
import { deleteBlog, updateBlog, createBlog } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setBlogsData } from "../redux/Reducers/blogsSlice";

const BlogsContainer = ({ geoData }) => {

    const blogsData = useSelector((state) => state.blogs.data || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = geoData?.location || "Unknown location";
  const country = geoData?.country || "Unknown country";
  const loading = geoData?.loading || false;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await deleteBlog(process.env.REACT_APP_API, id, localStorage.getItem("blogAuthToken"));
        const filterData = blogsData.filter((blog) => blog._id !== id);
        dispatch(setBlogsData(filterData));
        alert("Blog deleted successfully.");
      } catch (error) {
        alert("An error occurred while deleting the blog: " + error.message);
      }
    }
  };

const handleSaveBlog = async (newBlog) => {
    try {
        if (isEdit) {
            const updatedBlog = await updateBlog(
                process.env.REACT_APP_API,
                selectedBlog._id,
                newBlog,
                localStorage.getItem("blogAuthToken")
            );
            const updatedData = Array.isArray(blogsData) ? blogsData.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog)) : []
            dispatch(setBlogsData(updatedData));
            alert("Blog updated successfully.");
        } else {
            const createdBlog = await createBlog(
                process.env.REACT_APP_API,
                newBlog,
                localStorage.getItem("blogAuthToken")
            );
            const updatedData = Array.isArray(blogsData) ? [createdBlog.blog, ...blogsData] : [createdBlog.blog]
            dispatch(setBlogsData(updatedData));
            alert("Blog created successfully.");
        }
    } catch (error) {
        alert("An error occurred while saving the blog: " + error.message);
    }
};


  const openCreateModal = () => {
    setIsEdit(false);
    setSelectedBlog(null);
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setIsEdit(true);
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-5 my-8">
      <h1 className="text-2xl font-bold mb-6">{`All blogs near you in ${location}, ${country}`}</h1>
      {loading ? (
        <div className="flex justify-center items-center h-80">
          <ClipLoader color="#007bff" loading={loading} size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {blogsData.length > 0 ? (
            blogsData.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                handleDelete={handleDelete}
                openEditModal={openEditModal}
              />
            ))
          ) : (
            <p>No blogs available in your region.</p>
          )}
        </div>
      )}
      <button
        onClick={openCreateModal}
        className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
      >
        Create Blog
      </button>
      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBlog}
        blog={selectedBlog}
        isEdit={isEdit}
        geoData={geoData}
      />
    </div>
  );
};

export default BlogsContainer;
