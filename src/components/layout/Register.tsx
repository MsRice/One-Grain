import React from 'react';
import { useState } from 'react';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { useNavigate } from 'react-router-dom';

const Register = () => {
        const [email , setEmail] = useState('')
        const [password , setPassword] = useState('')
        const [error, setError] = useState<string | null>(null);
    
        const {register} = useAuthentication()
        const navigate = useNavigate()
    
    
        async function handleForm(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
           try {
                const userData = { email , password }
                await register(userData)
                navigate('/')
            
           } catch (error:any) {
            setError(error.message)
           }
    }
    return (
        <div className="login-form--wrapper">
            <form className="login-form" onSubmit={handleForm}>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email"  value={email} onChange ={e => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password"  value={password} onChange ={e => setPassword(e.target.value)}/>

                <button type="submit">
                        Register
                </button>
            </form>
            {error && <p className="error">{error}</p>}
            <p className='login-privacy'>
                    By continuing, you agree to our 
                    Terms of Service and Privacy Policy.
                    Secure authentication powered by Firebase.
                </p>
        </div>
    );
}

export default Register;
