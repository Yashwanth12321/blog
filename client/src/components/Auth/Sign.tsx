import { useState } from "react";
import { Link } from "react-router";
import { v4 as uuidv4 } from 'uuid';
const Sign=()=>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading,setloading] = useState(false);
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setloading(true);
        try{
            const request = new Request("http://localhost:5000/api/register",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    _id:uuidv4(),
                    name:name,
                    email:email,
                    password:password
                })
            })
            const response =await fetch(request);
            if(response.ok){
                const json = await response.json();
                localStorage.setItem('token',json.accessToken);
                window.location.href = '/home';
            }
            else{
                throw new Error(JSON.stringify(await response.json()));
            }
        }
        catch (err){
            setError(err);
        }
        finally{
            setloading(false);
        }
    }

    return (
        <div>
            <h1> Sign Up </h1>
            <form onSubmit={handleSubmit}>
                <input type="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    )
}

export default Sign;