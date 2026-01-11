import React from 'react';
import { useState } from 'react';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { Link } from 'react-router-dom';
import { LuEyeClosed , LuEye } from "react-icons/lu";
import { PiFingerprintDuotone } from "react-icons/pi";



const Login = () => {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [type , setType] = useState('password')

    const {login , loginWithPasskey} = useAuthentication()


    function handleForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const userData = { email , password }
        login(userData)
    }

    function togglePass(){
        setType(
            type === 'password' ? 'text' : 'password'
        ) 
    }

    return (
        <div className='login--containter'>
            <div className="login-form--wrapper">
                <form className="login-form" onSubmit={handleForm}>
                    <div className="input-wrapper input-email">
                        <input type="text" name="email" placeholder='Email:' value={email} onChange ={e => setEmail(e.target.value)}/>
                        <button
                            type="button"
                            className="passkey-btn"
                            disabled={!email}
                            aria-label="Sign in with Face ID or Touch ID"
                            onClick={() => loginWithPasskey(email)}
                            >
                            <PiFingerprintDuotone />
                        </button>
                    </div>

                    <div className="input-wrapper input-pass">
                        <input type={type} name="password" placeholder='Password:' value={password} onChange ={e => setPassword(e.target.value)}/>
                        <button 
                            type="button"
                            aria-label={type === 'password' ? 'Show password' : 'Hide password'} 
                            onClick={togglePass}>
                                {type === 'password' ? <LuEyeClosed /> :<LuEye /> }
                        </button>
                    </div>

                    <button type="submit" className='btn'>Log In</button>
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
        </div>
    );
}

export default Login;
