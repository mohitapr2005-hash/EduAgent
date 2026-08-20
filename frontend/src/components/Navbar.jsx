import { getAnalytics } from "../services/analytics";
import { getAIUsage } from "../services/aiUsage";
import { logout } from "../services/auth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import ProfileSidebar from "./ProfileSidebar";
import { getProfile } from "../services/profile";



function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const [openProfile, setOpenProfile] = useState(false);
    const [labsOpen, setLabsOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [aiUsage, setAIUsage] = useState(null);
    

const user = auth.currentUser;


useEffect(() => {

    const loadProfile = async () => {

        if (!user) return;

        const data = await getProfile(user.uid);

        setProfile(data);

    };

    loadProfile();

}, [user]);


useEffect(() => {

    if (!user) return;

    const loadUsage = async () => {

        const data = await getAIUsage();

        setAIUsage(data);

    };

    loadUsage();

    window.addEventListener("ai-usage-updated", loadUsage);

    return () => {
        window.removeEventListener("ai-usage-updated", loadUsage);
    };

}, [user]);

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const links = [
        {
            name: "Dashboard",
            path: "/"
        },
        {
            name: "Courses",
            path: "/my-courses"
        },
        {
            name: "Planner",
            path: "/study-planner"
        },
        {
            name: "Interview",
            path: "/interview"
        },
        {
            name: "Coding",
            path: "/coding-interview"
        },

        {
            name: "Resume",
            path: "/resume-analyzer"
        }
        
    ];

    return (

        <div className="sticky top-4 z-50 px-6 pt-4">

            <nav
    className="
        max-w-7xl
        mx-auto
        rounded-2xl
        border
        border-white/10
        bg-slate-950/65
        backdrop-blur-2xl
        shadow-[0_8px_30px_rgb(0,0,0,0.35)]
        transition-all
        duration-300
    "
>

                <div className="flex justify-between items-center px-8 py-5">

                    {/* Logo */}

                    <div>

                        <h1 className="text-3xl font-black text-white">
                            ⚡ EduAgent AI
                        </h1>

                        <p className="text-slate-400 text-sm mt-1">
                            AI Powered Learning Platform
                        </p>

                    </div>

                    {/* Navigation */}

                    <div className="flex items-center gap-3">

                    {links.map((item) => (

    <Link
        key={item.path}
        to={item.path}
        className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
    location.pathname === item.path
        ? "bg-blue-600 text-white shadow-lg"
        : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white"
}`}
    >
        {item.name}
    </Link>

))}

<div className="relative">

    <button
        onClick={() => setLabsOpen(!labsOpen)}
        className="px-5 py-3 rounded-xl font-semibold bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white transition-all"
    >
        🧪 Labs ▾
    </button>

    {labsOpen && (

        <div className="absolute top-14 left-0 w-52 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden">

            <Link
                to="/virtual-lab"
                onClick={() => setLabsOpen(false)}
                className="block px-5 py-3 hover:bg-slate-800 text-white"
            >
                💻 Virtual Lab
            </Link>

        </div>

    )}

</div>

                    </div>
                    

<div className="flex items-center mr-4">

    <div className="relative w-16 h-16">

        <svg
            className="-rotate-90"
            width="64"
            height="64"
        >

            {/* Background Circle */}

            <circle
                cx="32"
                cy="32"
                r="26"
                stroke="#1e293b"
                strokeWidth="6"
                fill="none"
            />

            {/* Progress */}

            <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke={
                    (aiUsage?.remaining ?? 50) > 30
                        ? "#22c55e"
                        : (aiUsage?.remaining ?? 50) > 10
                        ? "#facc15"
                        : "#ef4444"
                }
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={163}
                strokeDashoffset={
                    163 -
                    (((aiUsage?.remaining ?? 50) /
                        (aiUsage?.limit ?? 50)) *
                        163)
                }
            />

        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className="text-xs text-cyan-400">
                🤖
            </span>

            <span className="text-[11px] font-bold text-white">
                {aiUsage?.remaining ?? 50}
            </span>

        </div>

    </div>

</div>
                    <div
    onClick={() => setOpenProfile(true)}
    className="cursor-pointer w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500"
>
    {profile?.photo_url ? (
        <img
            src={profile.photo_url}
            alt="Profile"
            className="w-full h-full object-cover"
        />
    ) : (
        <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-lg">
            {user?.email?.charAt(0).toUpperCase()}
        </div>
    )}
</div>

                </div>


            </nav>
                            <ProfileSidebar
    open={openProfile}
    setOpen={setOpenProfile}
/>

        </div>

    );

}

export default Navbar;