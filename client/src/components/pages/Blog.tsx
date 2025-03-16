import type { Blog } from "../../types";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../ui/button";

const BlogPage = () => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-gray-300">
                <div className="bg-[#1e1e1e] text-center p-8 rounded-lg shadow-lg border border-[#30363d]">
                    <h1 className="text-3xl font-semibold text-white">Session Expired</h1>
                    <p className="text-gray-400 mt-2">Please log in to continue.</p>
                    <Button onClick={() => navigate("/login")} className="mt-4 bg-blue-500 hover:bg-blue-600">
                        Login
                    </Button>
                </div>
            </div>
        );
    }

    useEffect(() => {
        const fetchBlog = async () => {
            if (!id) {
                setError("No blog ID provided.");
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/blog/getblog/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch blog");
                }

                const data = await response.json();
                setBlog(data);
            } catch (err) {
                setError("Error fetching blog.");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) return <div className="text-center py-10 text-lg font-semibold text-gray-300">Loading...</div>;
    if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
    if (!blog) return <div className="text-center text-gray-400 py-10">No blog found</div>;

    return (
        <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-[#1e1e1e] rounded-xl shadow-lg border border-[#30363d] p-8 transition-transform transform hover:scale-[1.02]">
                <h1 className="text-4xl font-bold text-gray-100 leading-tight">{blog.title}</h1>

                <div className="mt-4 flex justify-between items-center text-gray-400 text-sm">
                    <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown Date"}</span>
                    <span className="font-medium">By {blog.authorName}</span>
                </div>

                <div className="mt-6 border-t border-[#30363d] break-words whitespace-pre-line pt-4 text-gray-300 leading-7 text-lg">
                    {blog.content}
                </div>

                <div className="mt-6 flex justify-between">
                    <Button onClick={() => navigate("/home")} className="bg-gray-700 hover:bg-gray-600">
                        ← Back to Home
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
