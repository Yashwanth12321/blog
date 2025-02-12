import { useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

const Createblog = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage(null);
        setErrorMessage(null);

        const form = e.target as HTMLFormElement;
        const title = (form.elements.namedItem("title") as HTMLInputElement).value;
        const brief = (form.elements.namedItem("brief") as HTMLInputElement)?.value || "No brief available";
        const content = (form.elements.namedItem("content") as HTMLTextAreaElement).value;

        try {
            const success = await createBlog(title, brief, content);
            if (success) {
                setSuccessMessage("Blog successfully published!");
                setTimeout(() => navigate('/home'), 2000); // Redirect after success
            }
        } catch (error) {
            setErrorMessage("Failed to publish blog. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    async function createBlog(title: string, brief: string, content: string) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/api/posts/api/blog/createblog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                _id: uuidv4(),
                title,
                brief,
                content,
                createdAt: new Date(),
                authorId: '1',
                authorName: 'Anonymous'
            })
        });

        if (!response.ok) {
            throw new Error("Failed to create blog");
        }

        return true;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-6">Create Blog</h1>
                {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Title</label>
                        <input name="title" type="text" required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Brief</label>
                        <input name="brief" type="text"
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Content</label>
                        <textarea name="content" required rows={5}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                        {loading ? "Posting..." : "Post"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Createblog;
