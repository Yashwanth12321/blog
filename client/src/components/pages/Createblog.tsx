import { useState } from "react";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";

const CreateBlog = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [brief, setBrief] = useState("");


    

    const handlePost = async () => {
        if (!title.trim() || !brief.trim() || !content.trim()) {
            setMessage("⚠ Title, Brief and Content are required.");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            await createBlog(title, content);
            setMessage("🎉 Blog published successfully!");
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage("⚠ Failed to publish blog.");
        } finally {
            setLoading(false);
        }
    };

    async function createBlog(title: string, content: string) {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:8080/api/posts/api/blog/createblog", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                _id: uuidv4(),
                title,
                brief,
                content,
                createdAt: new Date(),
                authorId: '',
                authorName: 'Anonymous'
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create blog");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-gray-300 p-6">
            <div className="w-full max-w-3xl bg-[#1e1e1e] rounded-2xl shadow-lg border border-[#30363d] p-6 ">
                {message && <p className="text-center text-sm mb-4 text-gray-300">{message}</p>}

                <input
                    type="text"
                    placeholder="Enter title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-3xl font-bold bg-transparent border-none outline-none text-white placeholder-gray-500"
                />
                <br />
                <input
                    type="text"
                    placeholder="Enter brief..."
                    value={brief}
                    onChange={(e) => setBrief(e.target.value)}
                    className="w-full mt-4 text-lg bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 resize-none h-[300px]"
                />
                <br />
                <textarea
                    placeholder="Start writing your blog..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full mt-4 text-lg bg-transparent border-none outline-none text-gray-300 placeholder-gray-500 resize-none h-[300px]"
                    style={{ minHeight: "300px" }}
                />
                  <br />
                <div className="flex justify-between mt-6">
                    <Button type="button" onClick={() => navigate("/")} className="bg-gray-700 hover:bg-gray-600">
                        Cancel
                    </Button>
                    <Button type="button" onClick={handlePost} disabled={loading} className="bg-blue-500 hover:bg-blue-600">
                        {loading ? "Publishing..." : "Publish"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
