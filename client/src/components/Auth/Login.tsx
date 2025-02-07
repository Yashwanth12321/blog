import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            const request = new Request("http://localhost:5000/api/login",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
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
            setLoading(false);
        }
    }

    return(
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
    )
}

export default Login;