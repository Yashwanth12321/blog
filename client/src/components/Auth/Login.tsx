import { useState } from "react";
import { Link } from "react-router"; // Fixed import

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:4000/api/users/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('token', json.accessToken);
                window.location.href = '/home';
            } else {
                throw new Error((await response.json()).message || "Login failed");
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-[#C9D1D9]">
            <div className="bg-[#161B22] p-8 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 bg-[#0D1117] border border-[#30363D] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#238636]"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 bg-[#0D1117] border border-[#30363D] rounded text-white focus:outline-none focus:ring-2 focus:ring-[#238636]"
                        required
                    />
                    <button
                        type="submit"
                        className="p-2 bg-[#238636] text-white font-semibold rounded hover:bg-[#2EA043] transition"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="text-sm text-center mt-4">
                    Don't have an account? <Link to="/signup" className="text-[#58A6FF] hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
