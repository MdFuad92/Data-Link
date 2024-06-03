import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../Hook/useAxiosPublic";


const auth = getAuth(app)
export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic()
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)

    const createEmail = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const login = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        setLoader(true)
        return signOut(auth)
    }

    const update = (fullname, image) => {
        setLoader(false)
        return updateProfile(auth.currentUser, {

            displayName: fullname,
            photoURL: image


        })
    }

    const google = () => {
        setLoader(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser)
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token',res.data.token)
                            setLoader(false)
                        }
                    })
            }

            else {
                localStorage.removeItem('access-token')
                setLoader(false)
            }

        });

        return () => {
            unSubscribe()

        }

    }, [])

    const authInfo = { user, createEmail, login, logOut, update, google, loader }
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider >

    );
};

export default AuthProvider;