import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const Createblog = () => {
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement;
        const title = form.elements.namedItem("title") as HTMLInputElement;
        const brief = form.elements.namedItem("brief") as HTMLInputElement;
        const content = form.elements.namedItem("content") as HTMLInputElement;
        createBlog(title.value,brief.value ? brief.value : 'no brief available',content.value);
        navigate('/home');
    }

    // post the blog to localhost:5000/api/blog/createblog
    async function createBlog(title:string,brief:string,content:string){
        const token = localStorage.getItem('token');
        const request = new Request('http://localhost:5000/api/blog/createblog', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${token}`
            },
            body:JSON.stringify({
                _id:uuidv4(),
                title:title,
                brief:brief,
                content:content,
                createdAt: new Date(),
                authorId:'1',
                authorName:'Anonymous'
            })
        })
        const response = await fetch(request);
        const json = await response.json();
        if(response.ok){
            return <>
                <h1> Blog Published</h1>
                <p> {json.message} </p>
            </>
        }
    }


    return (
        <div>
            <h1> Create Blog</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input name="title" type="text" required />
                </label>
                <label>
                    Brief
                    <input name="brief" type="text" />
                </label>
                <label>
                    Content
                    <textarea name="content" required />
                </label>
                <button type="submit" >Post</button>
            </form>
        </div>
    )
}

export default Createblog;