import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Blog } from "../../types";

const Home = () => {

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

        if(!token){
            console.log("suckmawaling");
            return(
            <div>Please login to continue
                <Link to="/login">Login</Link>
            </div>
            )
        }
    const getBlogs = async () => {
        setLoading(true);
        console.log(token);
        try{
            const response = await fetch("http://localhost:5000/api/blog/getblogs",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await response.json();
            console.log(json);
            if(response.ok){
                setBlogs(json);
            }
            else{
                throw new Error(json.message);
            }
        }
        catch (err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }


    }

    useEffect(()=>{ 
        getBlogs();
    },[])

    if(loading){
        return <div>Loading...</div>;
    }

    if(error){
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="home-container">
                <div className="home-content">
                    <h1> Blogs posted</h1>

                    <Link to="/createblog">New Blog</Link>
                </div>
                <div className="my-blogs">
                    <h1> My Blogs</h1>
                    <Link to="/myblogs">My Blogs</Link>
                </div>
                <div className="home-posts">
                    <h1> Posts</h1>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog._id}>
                                <h1>{blog.title}</h1>
                                <p>{blog.brief}</p>
                                <p>{blog.content}</p>
                                {blog.createdAt && (
                                    <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
                                )}
                                <p>{blog.authorName}</p>

                            </div>
                        ))
                    ) : (
                        <div>
                            <h1>No posts</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home;