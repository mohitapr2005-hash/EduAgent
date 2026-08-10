import { useState } from "react";
import { signup } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

const handleSignup = async () => {

    setLoading(true);

    try {

        await signup(name, email, password);

        toast.success("🎉 Account Created Successfully!");

        navigate("/");

    } catch (error) {

        toast.error(error.message);

    } finally {

        setLoading(false);

    }

};

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center">

            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 w-[430px] shadow-2xl">

                <h1 className="text-4xl font-black text-white text-center mb-2">
                    Create Account
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Join EduAgent AI
                </p>
                <input
    type="text"
    placeholder="Full Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white mb-5 outline-none focus:border-blue-500"
/>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white mb-5 outline-none focus:border-blue-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 text-white mb-6 outline-none focus:border-blue-500"
                />

                <button
    onClick={handleSignup}
    disabled={loading}
    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed py-4 rounded-xl font-bold text-white transition"
>
    {loading ? "⏳ Creating Account..." : "Create Account"}
</button>

                <p className="text-center text-slate-400 mt-8">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-400 ml-2 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>

    );

}

export default Signup;