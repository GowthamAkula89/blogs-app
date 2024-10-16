import { useState} from "react";
import { ClipLoader } from "react-spinners";
import BlogCard from "./blogCard";

const BlogsContainer = ({ blogsData, setBlogsData, geoData }) => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('blogAuthToken') !== null);
    const location = geoData?.location || "Unknown location";
    const country = geoData?.country || "Unknown country";
    const loading = geoData.loading;

    const handleDelete = async (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API}blog/${blogId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('blogAuthToken')}`
            },
            });
            if (response.ok) {
                alert("Blog deleted successfully!");
                setBlogsData(response.json())
            } else {
                alert("Error deleting the blog.");
            }
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
        }
    };

    return (
        <div className="container mx-auto my-8">
        <h1 className="text-2xl font-bold mb-6">
            {`All blogs near you in ${location}, ${country}`}
        </h1>
        {loading ? (
            <div className="flex justify-center items-center h-80">
            <ClipLoader color="#007bff" loading={loading} size={50} />
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {blogsData.length > 0 ? (
                blogsData.map((blog) => (
                <BlogCard key={blog._id} blog={blog} handleDelete={handleDelete} />
                ))
            ) : (
                <p>No blogs available in your region.</p>
            )}
            </div>
        )}
        {isLoggedIn && (
            <button
            className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
            >
            Create Blog
            </button>
        )}
        </div>
    );
};

export default BlogsContainer;
