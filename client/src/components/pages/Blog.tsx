import type { Blog } from "../../types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BlogPage = () => {
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();

    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0d1117] text-gray-300">
                <div className="bg-[#161b22] text-center p-6 rounded-lg shadow-lg border border-[#30363d]">
                    <h1 className="text-3xl font-semibold">Session Expired</h1>
                    <p className="text-gray-400 mt-2">Please log in to continue.</p>
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
                const response = await fetch(`http://localhost:4000/api/posts/api/blog/getblog/${id}`, {
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
        <div className="min-h-screen bg-[#0d1117] text-gray-300 flex items-center justify-center p-6">
            <div className="max-w-3xl w-full bg-[#161b22] rounded-lg shadow-lg border border-[#30363d] p-8 transition-transform transform hover:scale-[1.02]">
                <h1 className="text-4xl font-bold text-gray-100">{blog.title}</h1>
                <p className="text-gray-400 mt-2 italic">{blog.brief}</p>
                <div className="mt-4 border-t border-[#30363d] pt-4 text-gray-300 leading-7">
                    {blog.content}
                </div>
                <div className="mt-6 border-t border-[#30363d] pt-4 flex justify-between items-center text-gray-400 text-sm">
                    <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown Date"}</span>
                    <span className="font-medium">By {blog.authorName}</span>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
