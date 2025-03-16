import { useState } from "react";
import { Link } from "react-router"; // Fixed import
import { Label } from "../ui/label";
import { Input } from "../ui/input";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        console.log("trying to login")
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"email": email, "password": password })
            });
            console.log(response)

            if (response.ok) {
                const json = await response.json();
                localStorage.setItem('token', json.accessToken);
                console.log(json)
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
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black border border-white">
          <h2 className="font-bold text-3xl text-white dark:text-neutral-200">
            Login
          </h2>
          {error && <p className="text-red-500">{error}</p>}

     
          <form className="my-8" onSubmit={handleSubmit}>

            <LabelInputContainer >
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" placeholder="noobg4888@gmail.com" type="email" onChange={(e) => setEmail(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer >
              <Label htmlFor="password">Password</Label>
              <Input id="password" placeholder="••••••••" type="password" onChange={(e) => setPassword(e.target.value)} />
            </LabelInputContainer>
     
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Login &rarr;
              <BottomGradient />
            </button>
            {loading && <p className="text-white dark:text-neutral-200 mt-4">Loading...</p>}
            <p className="text-sm text-white dark:text-neutral-200 mt-4">
              Don't have an account? <Link to="/signup" className="text-white dark:text-neutral-200 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      );
    }
     
    const BottomGradient = () => {
      return (
        <>
          <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
      );
    };
     
    const LabelInputContainer = ({
      children,
    }: {
      children: React.ReactNode;
    }) => {
      return (
        <div className="flex flex-col space-y-2 w-full">
          {children}
        </div>
      );
    };

export default Login;
