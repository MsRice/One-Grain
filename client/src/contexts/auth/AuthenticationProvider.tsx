import { useEffect, useState } from 'react';
import { AuthenticationContext } from './AuthenticationContect';
import type {AuthenticationProviderProps, Credentials } from '../../types';
import {  setDoc , serverTimestamp, doc, writeBatch, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import type { User as FirebaseUser} from 'firebase/auth';
import { auth , db} from '../../utils/firebase';
import { startAuthentication, startRegistration } from '@simplewebauthn/browser';


export default function AuthenticationProvider({children}: AuthenticationProviderProps) {
    const [user , setUser] = useState<FirebaseUser | null>(null)
    const API_BASE = import.meta.env.VITE_API_BASE_URL
    
  
    useEffect(() =>{
        onAuthStateChanged(auth , setUser)
    },[])

    const login = async (userData: Credentials) => {
        const cred = await signInWithEmailAndPassword(auth , userData.email ,userData.password)       
        setUser(cred.user)
        await setDoc(
            doc(db , 'users' , cred.user.uid),
            {
                email: cred.user.email,
                lastLoginAt: serverTimestamp()
            },
            { 
                merge: true 
            }
        )
        
    }    

    const loginWithPasskey = async (email: string): Promise<void> => {
        try{
            const startRes = await fetch(`${API_BASE}/webauthn/auth/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: email }), // TEMP: email as userId
            })

            if (!startRes.ok) {
                throw new Error('Failed to start passkey login')
            }

            const options = await startRes.json();

            const assertion = await startAuthentication(options)

            if (!assertion) {
                throw new Error('Passkey authentication cancelled')
            }

            const finishRes = await fetch(`${API_BASE}/webauthn/auth/finish`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: email,
                    response: assertion,
                }),
            })

            if (!finishRes.ok) {
                throw new Error('Failed to finish passkey login');
            }

            const { token } = await finishRes.json()
            const cred = await signInWithCustomToken(auth, token)
            setUser(cred.user)

        } catch (error) {
            console.error('Passkey login failed', error);
            throw error;
        }
    }

    async function finalizeNewUser(uid: string, email: string, provider: 'password' | 'passkey') {
        const batch = writeBatch(db);

        batch.set(doc(db, 'users', uid), {
            email,
            role: 'user',
            authProvider: provider,
            createdAt: serverTimestamp(),
        });

        batch.set(doc(collection(db, 'users', uid, 'areas')), {
            name: 'Task',
            color: '#00aaff',
            createdAt: serverTimestamp(),
        });

        await batch.commit();
    }
    
    const register = async (userData : Credentials) => {
      
        const cred = await createUserWithEmailAndPassword(auth , userData.email ,userData.password) 
        await finalizeNewUser(cred.user.uid , userData.email , 'password')
        setUser(cred.user)
    

    }


    const registerWithPasskey = async (email : string): Promise<void> =>{
        try{
        const startRes = await fetch(`${API_BASE}/webauthn/register/start`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: email,  
                email,
            }),
        })

        if (!startRes.ok) {
            throw new Error('Failed to start passkey registration');
        }

        const options = await startRes.json();

        const credential = await startRegistration(options)

        if (!credential) {
            throw new Error('Passkey creation cancelled');
        }

        const finishRes = await fetch(`${API_BASE}/webauthn/register/finish`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: email,
                response: credential,
            }),
        });

        if (!finishRes.ok) {
            throw new Error('Failed to finish passkey registration');
        }

        const { token } = await finishRes.json();

        const cred = await signInWithCustomToken(auth, token);
   
        setUser(cred.user)

        } catch (error) {

        console.error('Passkey registration failed', error)
        throw error

    }

    }
    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }    


    return (
        <AuthenticationContext.Provider value={{user , login , loginWithPasskey ,register , registerWithPasskey, logout}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

