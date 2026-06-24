import { useState } from "react";
import { login, googleLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      await login(email, password);

      alert("Login Successful!");

      navigate("/");

    } catch (error) {

      alert(error.message);

    }

  };

  const handleGoogleLogin = async () => {

    try {

      await googleLogin();

      alert("Google Login Successful!");

      navigate("/");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-2xl w-[420px] shadow-xl">

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-lg text-white font-bold"
        >
          Login
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-600 hover:bg-red-700 p-3 rounded-lg text-white font-bold mt-4"
        >
          Continue with Google
        </button>

      </div>

    </div>

  );
}

export default Login;