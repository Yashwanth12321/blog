import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from 'uuid';

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
            const response = await fetch("http://localhost:4000/api/users/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id, name, email, password }),
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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <Card className="w-96 shadow-lg p-6">
                <CardContent>
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
                    {message && <p className="text-center text-red-500">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label>Name</label>
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label>Email</label>
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div>
                            <label>Password</label>
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <Button type="submit" className="w-full">Sign Up</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
