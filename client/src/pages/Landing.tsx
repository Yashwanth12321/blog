import { useNavigate } from "react-router";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      {/* Navigation Bar */}
      <nav className="w-full bg-black shadow-md p-4 flex justify-end space-x-4">
        <button onClick={() => navigate("/signup")} className="text-blue-500 hover:underline">Sign In</button>
        <button onClick={() => navigate("/login")} className="text-blue-500 hover:underline">Login</button>
        <button onClick={() => navigate("/home")} className="text-blue-500 hover:underline">Dashboard</button>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to the Blog</h1>
        <p className="text-lg text-white max-w-lg mb-6">
          Share your perspective
        </p>
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Get Started
        </button>
      </div>

    </div>
  );
};

export default Landing;
