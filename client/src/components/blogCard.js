import React, { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md"; 

const BlogCard = ({ blog, handleDelete, openEditModal }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getSummary = () => {
        if (!blog.content) return "";
        const { intro, body } = blog.content;
        const fullText = `${intro} ${body}`;
        return isExpanded ? fullText : fullText.split(".").slice(0, 2).join(".") + "...";
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="bg-gray-200 shadow-md rounded-lg overflow-hidden cursor-pointer transform hover:translate-x-2 ease-in-out p-2">
            <div className="flex space-x-2 justify-end px-2">
                <button onClick={() => openEditModal(blog)} className="text-blue-500 hover:text-blue-700">
                    <MdEdit size={20} />
                </button>
                <button onClick={() => handleDelete(blog._id)} className="text-red-500 hover:text-red-700">
                    <MdDelete size={20} />
                </button>
            </div>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <div className="text-gray-700">
                    {getSummary()}
                    <span className="text-blue-500 cursor-pointer ml-1" onClick={toggleReadMore}>
                        {isExpanded ? "Show less" : "Read more"}
                    </span>
                </div>
            </div>
            <div className="p-4 flex justify-between items-center">
                <span className="text-gray-500 text-sm">By {blog.authorName}</span>
            </div>
        </div>
    );
};

export default BlogCard;
