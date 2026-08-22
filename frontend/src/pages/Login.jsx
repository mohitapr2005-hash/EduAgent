import { useEffect, useState } from "react";
import { login, googleLogin } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { auth } from "../firebase/firebase";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    useEffect(() => {
        if (auth.currentUser) {
            navigate("/", { replace: true });
            return;
        }

        let cancelled = false;

        const autoGoogleLogin = async () => {
            if (cancelled) return;
            setGoogleLoading(true);
            try {
                await googleLogin();
                if (!cancelled) {
                    toast.success("Google Login Successful 🎉");
                    navigate("/", { replace: true });
                }
            } catch (error) {
                // User closing/cancelling the Google popup is not an app error.
                if (!cancelled && error?.code !== "auth/popup-closed-by-user" && error?.code !== "auth/cancelled-popup-request") {
                    console.error("Google auto-login:", error);
                }
            } finally {
                if (!cancelled) setGoogleLoading(false);
            }
        };

        autoGoogleLogin();
        return () => { cancelled = true; };
    }, [navigate]);

    const handleLogin = async () => {
        setLoading(true);
        try {
            await login(email, password);
            toast.success(`Welcome back ${email.split("@")[0]} 👋`);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setGoogleLoading(true);
            await googleLogin();
            toast.success("Google Login Successful 🎉");
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
            <div className="max-w-7xl mx-auto min-h-screen grid lg:grid-cols-2 items-center px-8">
                <div className="hidden lg:flex flex-col justify-center">
                    <h1 className="text-6xl font-black leading-tight">🚀 EduAgent AI</h1>
                    <p className="text-slate-400 text-xl mt-6 max-w-lg">
                        Your AI-powered learning platform. Generate complete courses, solve doubts,
                        prepare for interviews, analyze resumes, practice coding and learn faster.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-10">
                        <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer">📚 AI Generated Courses</div>
                        <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer">🤖 Personal AI Tutor</div>
                        <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer">💻 Coding Interview Prep</div>
                        <div className="bg-slate-800 rounded-2xl p-5 hover:bg-slate-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer">📄 ATS Resume Analyzer</div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl shadow-[0_0_40px_rgba(59,130,246,0.18)] p-10">
                        <h2 className="text-4xl font-bold text-center">Welcome Back 👋</h2>
                        <p className="text-slate-400 text-center mt-3 mb-8">Login to continue learning</p>

                        {googleLoading && (
                            <div className="mb-5 rounded-xl bg-blue-500/10 border border-blue-500/20 p-3 text-center text-sm text-blue-300">
                                Opening Google Sign-In…
                            </div>
                        )}

                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 mb-5 outline-none focus:border-blue-500" />
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 mb-6 outline-none focus:border-blue-500" />

                        <button onClick={handleLogin} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 rounded-xl py-4 font-bold">
                            {loading ? "⏳ Logging in..." : "Login"}
                        </button>

                        <button onClick={handleGoogleLogin} disabled={googleLoading} className="w-full mt-4 bg-white text-black hover:bg-gray-200 disabled:opacity-60 transition-all duration-300 rounded-xl py-4 font-bold flex items-center justify-center gap-3">
                            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
                            {googleLoading ? "Connecting to Google..." : "Continue with Google"}
                        </button>

                        <p className="text-center text-slate-400 mt-8">
                            Don't have an account?
                            <Link to="/signup" className="text-blue-400 ml-2 hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;