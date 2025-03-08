import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/firebase.config";
// import auth from "../Firebase/firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true);
    // Saving the last route visit by user before login
    const [lastRouteVisited, setLastRouteVisited] = useState('/')
    // console.log(lastRouteVisited);

    // Initialize Google Auth Provider
    const googleProvider = new GoogleAuthProvider();

    // sign in with google
    const handleSigninWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }

    // handle signout
    const handleSignOut = () =>{
        signOut(auth)
        .then(()=>{
            console.log('signout successful');
            setUser(null)
        })
        .catch(error=> console.log(error))
    }

    // create user with email and password and also name & image url
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // update user
    const updateUser = (  name, imageUrl) => {
        const currentUser = auth.currentUser;
        return updateProfile(currentUser, {
            displayName: name,
            photoURL: imageUrl,
        })
    }

    // sign in / login with email and pass
    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    
    // Observer for users activity
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log("Currently signed user from observer:", currentUser);
            setUser(currentUser);
            setUserLoading(false);
        })

        return ()=> {
            unSubscribe();
        }

    },[])

    const authInfo = {
        user,
        setUser,
        userLoading,
        handleSigninWithGoogle,
        handleSignOut,
        createUser,
        updateUser,
        signInUser,
        lastRouteVisited,
        setLastRouteVisited,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;