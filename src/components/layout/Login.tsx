import React from 'react';
import { useState } from 'react';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')

    const {login} = useAuthentication()


    function handleForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const userData = { email , password }
        login(userData)
    }

    return (
        <div className="login-form--wrapper">
            <form className="login-form" onSubmit={handleForm}>
                <label htmlFor="email">Email:</label>
                <input type="text" name="email"  value={email} onChange ={e => setEmail(e.target.value)}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password"  value={password} onChange ={e => setPassword(e.target.value)}/>

                <button type="submit">Log In</button>
            </form>
            <div className='login-privacy--wrapper'>
                <p className='login-privacy'>
                    By continuing, you agree to our 
                    Terms of Service and Privacy Policy.
                    Secure authentication powered by Firebase.
                </p>

            <div className='login-register'>New to One Grain? <Link to={'login/:register'}> Create an Account</Link> </div>
            </div>
        </div>
    );
}

export default Login;
