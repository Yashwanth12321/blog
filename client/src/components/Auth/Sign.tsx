import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Blog } from "../../types";

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#2b3137]">
                <div className="h-[70vh] w-[40vw] bg-[#24292e] flex flex-col items-center justify-center rounded-xl shadow-lg border border-[#854442] p-6">
                    <p className="text-2xl font-semibold mb-2 text-gray-200">Session Expired</p>
                    <h1 className="text-4xl font-bold mb-4 text-gray-200">Please login to continue</h1>
                    <Link
                        to="/login"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    const getBlogs = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/blog/getblogs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await response.json();
            if (response.ok) {
                setBlogs(json);
            } else {
                throw new Error(json.message);
            }
        } catch (err) {
            setError("Failed to fetch blogs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-lg font-semibold animate-pulse">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 py-10 font-semibold">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
                <Link
                    to="/createblog"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                    + New Blog
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="bg-white shadow-lg rounded-lg p-5 cursor-pointer hover:shadow-xl transition-transform transform hover:-translate-y-1 border border-gray-200"
                            onClick={() => navigate(`/blog/${blog._id}`)}
                        >
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{blog.title}</h2>
                            <p className="text-gray-600 mb-2">{blog.brief}</p>
                            {blog.createdAt && (
                                <p className="text-sm text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</p>
                            )}
                            <p className="text-sm font-medium text-gray-700">By {blog.authorName}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-lg font-semibold text-gray-600">
                        No posts available
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
