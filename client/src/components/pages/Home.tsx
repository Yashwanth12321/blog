import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Blog } from "../../types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const Home = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const name = "Anoymous";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

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
            const response = await fetch("http://localhost:8080/api/posts/api/blog/getblogs", {
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
        <div className="flex flex-col items-center justify-center p-6">
  

                <div className="flex justify-between items-center w-full max-w-4xl mb-6">
                <h1 className="text-3xl font-bold text-blue-300">Blogs</h1>
                <Link to="/createblog" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow-md">
                    + New Blog
                </Link>
                <Button onClick={handleLogout} className="bg-gray-700 hover:bg-gray-600">
                Logout
            </Button>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div 
                        key={blog._id} 
                        onClick={() => navigate(`/blog/${blog._id}`)} 
                        className="w-full group/card border border-gray-200 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
                    >
                        <div className="relative h-96 p-4 flex flex-col justify-between bg-gray-900 text-white">
                            <div className="absolute inset-0 bg-black opacity-40 group-hover/card:opacity-60 transition"></div>
    
                            <div className="z-10">
                                <p className="font-semibold text-lg break-words whitespace-normal">{blog.title}</p>
                                <p className="text-sm text-gray-400 break-words whitespace-normal">3 min read</p>
                                <br /><br />
                                <p className="z-10 text-lg text-gray-400 break-words whitespace-normal mt-2">
                                        {blog.brief}
                                </p>
                            </div>
    
                            <div className="z-10">
                                <p className="text-sm text-gray-400 break-words whitespace-normal">By {blog.authorName}</p>
                                <p className="text-sm text-gray-400 break-words whitespace-normal">{new Date(blog.createdAt!).toLocaleDateString()}</p>
                            </div>
                        </div>
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


