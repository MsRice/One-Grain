import { useEffect, useState } from 'react';
import { AuthenticationContext } from './AuthenticationContect';
import type {AuthenticationProviderProps, Credentials } from '../../types';
import {  setDoc , serverTimestamp, doc, writeBatch, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import type { User as FirebaseUser} from 'firebase/auth';
import { auth , db} from '../../utils/firebase';


export default function AuthenticationProvider({children}: AuthenticationProviderProps) {
    const [user , setUser] = useState<FirebaseUser | null>(null)

    
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
    
    const register = async (userData : Credentials) => {
        try{

            const cred = await createUserWithEmailAndPassword(auth , userData.email ,userData.password) 
            
            const batch = writeBatch(db)
            
            const userDocRef = doc(db, "users", cred.user.uid)
            batch.set(userDocRef, 
                {
                    email: cred.user.email,
                    role: "user",
                    createdAt: serverTimestamp(),
                    
                }
            )
            const areaDocRef = doc(collection(db, "users", cred.user.uid , "areas"))
            
            batch.set(areaDocRef, 
                {
                    name: 'Task',
                    color: "#00aaff" ,
                    createdAt: serverTimestamp()  
                }
            )
            
            await batch.commit()
            setUser(cred.user)
        } catch (error) {
            console.error('Registration Failed ' , error)
            throw error
            
        }

    }
    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }    



    return (
        <AuthenticationContext.Provider value={{user , login , register , logout}}>
            {children}
        </AuthenticationContext.Provider>
    );
}

