import React, { useMemo } from 'react';
import { useState } from 'react';
import { useAuthentication } from '../../contexts/auth/AuthenticationContect';
import { useNavigate } from 'react-router-dom';
import { LuEye, LuEyeClosed } from "react-icons/lu";

const Register = () => {
    
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null);
    const [type , setType] = useState('password')
    const [confType , setConfType] = useState('password')

    

    const {register , registerWithPasskey } = useAuthentication()
    const navigate = useNavigate()

    const passwordsMatch = useMemo(() => {
            if (!confirmPassword) return true;
            return password === confirmPassword;
        }, [password, confirmPassword]);


    async function handleForm(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();

        setError(null)
        if(!passwordsMatch) {
            setError('Passwords do not match!')
            return
        }

        try {

            const userData = { email , password }
            await register(userData)
            navigate('/')
        
        } catch (error: unknown) {
        if(error instanceof Error){

            setError(error.message)
        }else{
            setError('Something went wrong try again')
        }
        }
    }

    return (
        <div className='login--containter'>
                
            <div className="login-form--wrapper">
                <form className="login-form" onSubmit={handleForm}>
                    <div className="input-wrapper input-email">
                        <input type="text" name="email" placeholder='Email'  value={email} onChange ={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="input-wrapper input-pass">
                        <input type={type} name="password" placeholder='Password' value={password} onChange ={e => setPassword(e.target.value)}/>
                        <button 
                            type='button'
                            className='log-icon'
                            aria-label={type === 'password' ? 'Show Password' : 'Hide Password'}
                            onClick={() => setType(type === 'password' ? 'text' : 'password')}
                        >
                            { type === 'password' ? <LuEyeClosed /> :<LuEye />}
                        </button>
                    </div>
                    <div className="input-wrapper input-pass">
                        <input type={confType} name="password" placeholder='Confirm Password' value={confirmPassword} onChange ={e => setConfirmPassword(e.target.value)}/>
                        <button 
                            type='button'
                            className='log-icon'
                            aria-label={confType === 'password' ? 'Show Password' : 'Hide Password'}
                            onClick={() => setConfType(confType === 'password' ? 'text' : 'password')}
                        >
                            { confType === 'password' ? <LuEyeClosed /> :<LuEye />}
                        </button>
                    </div>

                    <button type="submit">
                            Register with Email
                    </button>
                    <button type='button' onClick={() => registerWithPasskey(email)}>
                        Register Face ID / Touch ID
                    </button>
                    
                </form>
                {error && <p className="error">{error}</p>}
                <p className='login-privacy'>
                        By continuing, you agree to our 
                        Terms of Service and Privacy Policy.
                        Secure authentication powered by Firebase.
                    </p>
            </div>
        </div>
    );
}

export default Register;
