import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";


const auth = getAuth(app)
export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loader,setLoader] = useState(true)

    const createEmail = (email,password) =>{
    setLoader(true)
    return createUserWithEmailAndPassword(auth,email,password)
    
    }
    
    const login = (email,password) =>{
    setLoader(true)
    return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut = ()=>{
        setLoader(true)
        return signOut(auth)
       }

       const update = (fullname,image)=> {
        setLoader(false)
     return updateProfile(auth.currentUser,{
      
         displayName:fullname,
         photoURL:image
      
         
      })
   }

   const google = () =>{
    setLoader(true)
    return signInWithPopup(auth,googleProvider)
   }

     useEffect(()=>{
      const unSubscribe = onAuthStateChanged(auth,currentUser =>{
          console.log(currentUser)
          setUser(currentUser)
         
         
           setLoader(false)
      });
     
      return ()=>{
          unSubscribe()
        
      }
      
     },[])   

    const authInfo = {user,createEmail,login,logOut,update,google,loader}
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >
    
    );
};

export default AuthProvider;