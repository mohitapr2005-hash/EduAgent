import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const provider = new GoogleAuthProvider();

export const googleLogin = () => {
  return signInWithPopup(auth, provider);
};

export const signup = (email, password) => {
  return createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const login = (email, password) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const logout = () => {
  return signOut(auth);
};