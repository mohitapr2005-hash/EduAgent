import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  deleteUser,
  updatePassword
} from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase";

const provider = new GoogleAuthProvider();
const BACKEND_URL = "https://eduagent-ugdl.onrender.com";

async function syncUserToBackend(user) {
  const response = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firebase_uid: user.uid,
      email: user.email,
      name: user.displayName || "",
    }),
  });

  if (!response.ok) throw new Error("Failed to sync user with backend");
  return response.json();
}

export const googleLogin = async () => {
  const result = await signInWithPopup(auth, provider);
  await syncUserToBackend(result.user);
  return result;
};

export const startGoogleLogin = async () => {
  await signInWithRedirect(auth, provider);
};

export const completeGoogleLogin = async () => {
  const result = await getRedirectResult(auth);
  if (!result?.user) return null;
  await syncUserToBackend(result.user);
  return result;
};

export const signup = async (name, email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  await result.user.reload();
  await syncUserToBackend(auth.currentUser);
  return result;
};

export const login = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  await syncUserToBackend(result.user);
  return result;
};

export const logout = () => signOut(auth);

export const changePassword = async (newPassword) => {
  if (!auth.currentUser) throw new Error("No user logged in");
  await updatePassword(auth.currentUser, newPassword);
};

import { deleteAccountAPI } from "./api";

export const deleteAccount = async () => {
  await deleteAccountAPI();
  await deleteUser(auth.currentUser);
};