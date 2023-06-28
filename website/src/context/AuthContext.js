import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword ,
    signInWithEmailAndPassword ,
    signInWithPopup ,
    GoogleAuthProvider,
    signOut ,
    onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebase'
const UserContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [user,setUser] = useState({});
    const [meetTitle , setMeetTitle ] = useState('');
    const [meetDate , setMeetDate] = useState('Date will appear here')
    const [username , setUsername] = useState('')

    const createUser = (email,password)=>{
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const signInUser = (email,password)=>{
        return signInWithEmailAndPassword(auth , email , password)
    }
    // const signInPopup = (email,password)=>{
    //     return signInWithEmailAndPassword(auth , email , password)
    // }
    const getUserName = (username)=>{
        setUsername(username);
    }
    const signUpPopup=(provider)=>{
        return signInWithPopup(auth, provider)
    }
    const logout = ()=>{
        return signOut(auth);
    }

    const getTitle=(title)=>{
        setMeetTitle(title);
    }
    const getDate=(date)=>{
        setMeetDate(date)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth , (currentUser)=>{
            console.log('userDetails',currentUser);
            setUser(currentUser)
        })
        // useEffect's cleanup code
        return ()=>{
            unsubscribe();
        }
    },[])




    return (
        <UserContext.Provider value={{createUser, signInUser , user , logout , getUserName , username ,signUpPopup , getTitle,getDate,meetTitle,meetDate}}> { children } </UserContext.Provider>
    )
}

// global context
export const UserAuth = ()=>{
    return useContext(UserContext)
}

