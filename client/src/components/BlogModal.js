import { useState } from "react";
import { useSelector } from "react-redux";

const BlogModal = ({ onClose, region, setBlogsData }) => {
    const user = useSelector((state) => state.user.user);
    const [title, setTitle] = useState("");
    const [intro, setIntro] = useState("");
    const [body, setBody] = useState("");
    const [conclusion, setConclusion] = useState("");
    const [coverImage, setCoverImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newBlog = {
            author: user._id,
            authorName: user.name,
            title: title,
            content: {
                intro: intro,
                body: body,
                conclusion: conclusion,
            },
            coverImage: coverImage,
            region: region,
            published: false,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API}blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem('blogAuthToken')}`,
                },
                body: JSON.stringify(newBlog),
            });

            const data = await response.json();

            if (response.ok) {
                setBlogsData((prevBlogs) => [...prevBlogs, data]);
                onClose(); // Close the modal
            } else {
                alert(data.message || "Failed to create the blog.");
            }
        } catch (error) {
            alert("An error occurred while creating the blog: " + error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Create a Blog</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Blog Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Introduction
                        </label>
                        <textarea
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Body
                        </label>
                        <textarea
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Conclusion
                        </label>
                        <textarea
                            value={conclusion}
                            onChange={(e) => setConclusion(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Cover Image URL
                        </label>
                        <input
                            type="text"
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="mr-4 px-4 py-2 bg-gray-500 text-white rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BlogModal;
