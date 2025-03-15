import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Link } from "react-router";


export default function SignupPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setMessage("");
        const _id = uuidv4();
        try {
            const response = await fetch("http://localhost:8080/api/users/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({"_id": _id, "name": name, "email": email, "password": password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage("User registered successfully!");
                console.log("Response:", data);
            } else {
                setMessage(data || "Registration failed");
            }
        } catch (error) {
            setMessage("Registration failed");
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-black dark:bg-black border border-white">
          <h2 className="font-bold text-3xl text-white dark:text-neutral-200">
            Register
          </h2>
          {message && <p className="text-red-500">{message}</p>}

     
          <form className="my-8" onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" placeholder="Yashwanth" type="text" onChange={(e) => setName(e.target.value)} />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" placeholder="Napa" type="text" />
              </LabelInputContainer>
            </div>
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
              Sign up &rarr;
              <BottomGradient />
            </button>
            <p className="text-sm text-white dark:text-neutral-200 mt-4">
              Already have an account? <Link to="/login" className="text-white dark:text-neutral-200 hover:underline">Login</Link>
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