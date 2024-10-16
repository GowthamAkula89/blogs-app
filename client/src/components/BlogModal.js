import React, { useState, useEffect } from "react";

const BlogModal = ({ isOpen, onClose, onSave, blog, isEdit, geoData }) => {
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [body, setBody] = useState("");
    const [coverImage, setCoverImage] = useState("");

    useEffect(() => {
        if (isEdit && blog) {
            setTitle(blog.title);
            setIntro(blog.content.intro);
            setBody(blog.content.body);
            setCoverImage(blog.coverImage);
        } else {
            setTitle("");
            setIntro("");
            setBody("");
            setCoverImage("");
        }
    }, [isEdit, blog]);

    const handleSave = () => {
        const blogData = {
            title,
            content: {
                intro,
                body,
            },
            coverImage,
            region : `${geoData.location}`
        };
        onSave(blogData);
        onClose();
    };

    return isOpen ? (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
            <div className="bg-white p-6 m-4 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">{isEdit ? "Edit Blog" : "Create Blog"}</h2>
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Intro"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    placeholder="Cover Image or Video URL"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full mb-2 p-2 border border-gray-300 rounded"
                />

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 bg-gray-300 text-gray-800 p-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        {isEdit ? "Save" : "Create"}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

export default BlogModal;
