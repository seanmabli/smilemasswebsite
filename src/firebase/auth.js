import { useContext, useState, useEffect, createContext } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword,
} from "firebase/auth";
import { auth } from "./firebase";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email).catch((error) => {
      console.log(error);
    });
  }

  function updateEmail_(email) {
    return updateEmail(auth.currentUser, email);
  }

  function updatePassword_(password) {
    return updatePassword(auth.currentUser, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    resetPassword,
    updateEmail_,
    updatePassword_,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function AuthRoute(props) {
  const { currentUser } = useAuth();
  if (currentUser) {
    return props.page;
  } else {
    return <Navigate to="/admin" />;
  }
}

export function AuthSkipLogin(props) {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/admin/dashboard" />;
  } else {
    return props.page;
  }
}
