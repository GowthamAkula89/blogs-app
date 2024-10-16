import React from "react";
import { MdDelete, MdEdit } from "react-icons/md"; 
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog, handleDelete }) => {

    const navigate = useNavigate();

    const getSummary = () => {
        if (!blog.content || !blog.content.blocks) return "";
            const paragraphs = blog.content.blocks.filter(
            (block) => block.type === "paragraph");
        if (paragraphs.length > 0) {
            const text = paragraphs.map((paragraph) => paragraph.data.text).join(" ");
            return (
                text.split(".").slice(0, 2).join(".") +
                (text.split(".").length > 2 ? "..." : "")
            );
        }
        return "";
    };

    const handleCardClick = () => {
        navigate("/view", { state: blog });
    };

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
        onClick={handleCardClick}
        >
        {blog.coverImage && (
            <img
            src={blog.coverImage}
            alt={blog.title}
            className="w-full h-48 object-cover"
            />
        )}
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
            <div className="text-gray-700 line-clamp-2">{getSummary()}</div>
        </div>
        <div className="p-4 flex justify-between items-center">
            <span className="text-gray-500 text-sm">By {blog.authorName}</span>
            
            <div className="flex space-x-2">
            <button
                onClick={(e) => {
                e.stopPropagation();
                navigate("/create");
                }}
                className="text-blue-500 hover:text-blue-700"
            >
                <MdEdit size={20} /> 
            </button>
            <button
                onClick={(e) => {
                e.stopPropagation();
                handleDelete(blog._id);
                }}
                className="text-red-500 hover:text-red-700"
            >
                <MdDelete size={20} /> 
            </button>
            </div>
            
        </div>
        </div>
    );
};

export default BlogCard;
