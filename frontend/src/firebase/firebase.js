import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtOSUcj9ti5EKRQMgUs9hL0iqdNyc4EDw",
  authDomain: "eduagent-ai-d3c99.firebaseapp.com",
  projectId: "eduagent-ai-d3c99",
  storageBucket: "eduagent-ai-d3c99.firebasestorage.app",
  messagingSenderId: "867901130573",
  appId: "1:867901130573:web:4f9c3ee3f3a429e9aa1904"
};

const app = initializeApp(firebaseConfig);

// ✅ Export Authentication
export const auth = getAuth(app);

// (We'll use this later for Firestore)
export default app;