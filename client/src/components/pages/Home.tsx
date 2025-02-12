import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Blog } from "../../types";
import { Button } from "../ui/button";

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#2b3137] p-6">
                <div className="w-full max-w-md bg-[#24292e] text-center p-8 rounded-xl shadow-lg border border-[#854442]">
                    <h1 className="text-4xl font-bold text-gray-200">Session Expired</h1>
                    <p className="text-lg text-gray-400 mt-2">Please login to continue</p>
                    <Button className="mt-6 px-6 py-3 bg-[#303a50] text-white rounded-lg hover:bg-[#2dba4e] transition">
                        <Link to="/login" className="text-xl">Login</Link>
                    </Button>
                </div>
            </div>
        );
    }

    const getBlogs = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/api/posts/api/blog/getblogs", {
                headers: { Authorization: `Bearer ${token}` },
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
        return <div className="text-center text-red-500 py-10">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-300">Blogs</h1>
                <Link to="/createblog" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                    + New Blog
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <div key={blog._id} className="p-5 shadow-md bg-green-500 hover:bg-green-600 rounded-lg border border-gray-200 hover:shadow-lg transition cursor-pointer"
                            onClick={() => navigate(`/blog/${blog._id}`)}
                        >
                            <h2 className="text-xl font-semibold text-white mb-2">{blog.title}</h2>
                            <p className="text-gray-100">{blog.brief}</p>
                            {blog.createdAt && (
                                <p className="text-sm text-gray-300 mt-2">{new Date(blog.createdAt).toLocaleDateString()}</p>
                            )}
                            <p className="text-sm font-medium text-gray-200 mt-1">By {blog.authorName}</p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-lg font-semibold text-gray-600">No posts available</div>
                )}
            </div>
        </div>
    );
};

export default Home;
