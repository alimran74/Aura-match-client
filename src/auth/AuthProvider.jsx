import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import AuthContext from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext"; // ✅ import your loading context

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading(); // ✅ use loading functions

  // Create new user
  const createUser = (email, password) => {
    showLoading();
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => hideLoading());
  };

  // Update profile
  const updateUserProfile = (profile) => {
    showLoading();
    if (auth.currentUser) {
      return updateProfile(auth.currentUser, profile)
        .finally(() => hideLoading());
    }
    hideLoading();
    return Promise.reject("No user is logged in");
  };

  // Email login
  const loginUser = (email, password) => {
    showLoading();
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => hideLoading());
  };

  // Google sign-in
  const signInWithGoogle = () => {
    showLoading();
    return signInWithPopup(auth, googleProvider)
      .finally(() => hideLoading());
  };

  // Logout
  const logOut = () => {
    showLoading();
    return signOut(auth)
      .finally(() => hideLoading());
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); 
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    loginUser,
    signInWithGoogle,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
