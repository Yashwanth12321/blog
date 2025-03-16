import { Link } from "react-router";
import { Blog } from "../../types";
import { useEffect, useState } from "react";

const MyBlogs = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 border border-gray-200 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800">Session Expired</h2>
                    <p className="text-gray-600 mt-2">Please login to continue</p>
                    <Link to="/login"
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md inline-block">
                        Login
                    </Link>
                </div>
            </div>
        );
    }

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getBlogs = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:5000/api/blog/userblogs", {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
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
    }, [token]); // Dependency on token, will re-run if token changes

    return (
        <div className="container mx-auto p-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
                <p className="text-gray-600">Here you can find and manage your own blogs.</p>
                <Link to="/createblog"
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md inline-block">
                    + Create Blog
                </Link>
            </div>

            {loading ? (
                <p className="text-center text-lg font-semibold animate-pulse">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog: Blog) => (
                        <div key={blog._id} className="p-5 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition">
                            <h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
                            <p className="text-gray-600">{blog.brief}</p>
                            <p className="text-sm text-gray-500 mt-2">{blog.content.substring(0, 100)}...</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-600 text-lg">No blogs available. Start by creating one!</p>
            )}
        </div>
    );
};

export default MyBlogs;
