import { Link } from "react-router";
import { Blog } from "../../types";
import { useEffect, useState } from "react";

const MyBlogs = () => {
    const token = localStorage.getItem('token');
    if(!token){
        return(
            <div>Please login to continue
                <Link to="/login">Login</Link>
            </div>
        )
    }
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);

    const getBlogs = async () => {
        setLoading(true);
        try{
            const response = await fetch("http://localhost:5000/api/blog/userblogs",{
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                },


            })
            const json = await response.json();
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
    useEffect(() => {
        getBlogs();
    }, [token]); // Dependency on token, it will run if token is available
    return (
        <div>
            <h1> My Blogs </h1>
            <p> This is where you can find your own blogs </p>
            <p> If you dont have any blogs, you can create one </p>
            <Link to="/createblog"> Create Blog </Link>
            {
                loading ? (
                    <p> Loading... </p>
                ) : (
                    <div>
                        {
                            blogs.map((blog:Blog) => (
                                <div key={blog._id}>
                                    <h2> {blog.title} </h2>
                                    <p> {blog.brief} </p>
                                    <p> {blog.content} </p>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MyBlogs;