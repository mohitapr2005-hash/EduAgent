import { auth } from "../firebase/firebase";
import { logout } from "../services/auth";
import SecurityModal from "./SecurityModal";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getProfile,
    uploadProfilePhoto,
    saveProfile
} from "../services/profile";               


function ProfileSidebar({ open, setOpen }) {

    const navigate = useNavigate();

    const user = auth.currentUser;

    const [profile, setProfile] = useState(null);
    const [securityOpen, setSecurityOpen] = useState(false);

useEffect(() => {

    const loadProfile = async () => {

        if (!user) return;

        const data = await getProfile(user.uid);

        setProfile(data);

    };

    loadProfile();

}, [user]);
    
const handlePhotoChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

        const upload = await uploadProfilePhoto(file);

        await saveProfile(
            user.uid,
            {
                photo_url: upload.photo_url
            }
        );

        const updated = await getProfile(user.uid);

        setProfile(updated);

        alert("Photo Updated");

    }

    catch(err){

        console.log(err);

        alert("Upload Failed");

    }

};
    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    return (

        <>
    {open && (
        <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
    )}

<div
    className={`fixed top-0 right-0 h-screen w-[390px]
    overflow-y-auto
    bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950
    border-l border-cyan-500/20
    shadow-2xl
    z-50
    transition-transform duration-500
    ${open ? "translate-x-0" : "translate-x-full"}`}
>

        <div className="p-8">

            <div className="flex justify-end">

                <button
                    onClick={() => setOpen(false)}
                    className="w-10 h-10 rounded-full bg-slate-800 hover:bg-red-500 transition-all duration-300 text-xl"
                >
                    ✕
                </button>

            </div>

            <div className="flex flex-col items-center mt-4">

                <div className="relative">

                    {profile?.photo_url ? (

    <img
        src={profile.photo_url}
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-cyan-300 object-cover shadow-[0_0_35px_rgba(34,211,238,0.35)]"
    />

) : (

    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-5xl font-bold border-4 border-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.35)]">

        {user?.email?.charAt(0).toUpperCase()}

    </div>

)}

                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 border-slate-900"></div>

                </div>

                <h2 className="mt-6 text-3xl font-extrabold text-white">

                    {user?.displayName || user?.email?.split("@")[0]}

                </h2>

                <p className="text-cyan-400 mt-2 text-sm">

                    AI Learner 🚀

                </p>

                <p className="text-slate-400 mt-2 break-all text-center">

                    {user?.email}

                </p>

            </div>
            {/* Stats Cards */}

<div className="mt-8 grid grid-cols-2 gap-4">

    <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 hover:scale-105 transition-all duration-300">

        <p className="text-slate-400 text-sm">🔥 Streak</p>

        <h2 className="text-2xl font-bold text-white mt-2">
            18
        </h2>

        <p className="text-cyan-400 text-sm">
            Days
        </p>

    </div>

    <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 hover:scale-105 transition-all duration-300">

        <p className="text-slate-400 text-sm">🏆 XP</p>

        <h2 className="text-2xl font-bold text-white mt-2">
            820
        </h2>

        <p className="text-cyan-400 text-sm">
            Total XP
        </p>

    </div>

    <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 hover:scale-105 transition-all duration-300">

        <p className="text-slate-400 text-sm">🪙 Coins</p>

        <h2 className="text-2xl font-bold text-white mt-2">
            250
        </h2>

        <p className="text-cyan-400 text-sm">
            Earned
        </p>

    </div>

    <div className="rounded-2xl bg-slate-800/60 border border-slate-700 p-4 hover:scale-105 transition-all duration-300">

        <p className="text-slate-400 text-sm">📚 Courses</p>

        <h2 className="text-2xl font-bold text-white mt-2">
            12
        </h2>

        <p className="text-cyan-400 text-sm">
            Completed
        </p>

    </div>

</div>

{/* Quick Overview */}

<div className="mt-8 rounded-2xl bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-5">

    <h3 className="text-white font-bold text-lg">
        🚀 Quick Overview
    </h3>

    <div className="mt-4 space-y-3">

        <div className="flex justify-between">
            <span className="text-slate-300">
                Coding Problems
            </span>

            <span className="font-semibold text-white">
                85
            </span>
        </div>

        <div className="flex justify-between">
            <span className="text-slate-300">
                Interviews
            </span>

            <span className="font-semibold text-white">
                9
            </span>
        </div>

        <div className="flex justify-between">
            <span className="text-slate-300">
                Notes Generated
            </span>

            <span className="font-semibold text-white">
                34
            </span>
        </div>

        <div className="flex justify-between">
            <span className="text-slate-300">
                AI Usage
            </span>

            <span className="font-semibold text-green-400">
                Active
            </span>
        </div>
    </div>
</div>
{/* Menu */}

<div className="mt-8 space-y-3">

    <button
        onClick={() => {
            navigate("/profile");
            setOpen(false);
        }}
        className="w-full flex items-center justify-between rounded-2xl bg-slate-800/60 border border-slate-700 px-5 py-4 hover:bg-cyan-600/20 hover:border-cyan-400 transition-all duration-300"
    >
        <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <span className="font-semibold text-white">My Profile</span>
        </div>

        <span className="text-slate-400">›</span>
    </button>

<label
    className="w-full flex items-center justify-between rounded-2xl bg-slate-800/60 border border-slate-700 px-5 py-4 hover:bg-cyan-600/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer"
>

    <div className="flex items-center gap-3">

        <span className="text-2xl">
            📷
        </span>

        <span className="font-semibold text-white">
            Change Photo
        </span>

    </div>

    <span className="text-slate-400">
        ›
    </span>

    <input
        type="file"
        hidden
        accept="image/*"
        onChange={handlePhotoChange}
    />

</label>

    <button
    onClick={() => setSecurityOpen(true)}
    className="w-full flex items-center justify-between rounded-2xl bg-slate-800/60 border border-slate-700 px-5 py-4 hover:bg-cyan-600/20 hover:border-cyan-400 transition-all duration-300"
>
        <div className="flex items-center gap-3">
            <span className="text-2xl">🔒</span>
            <span className="font-semibold text-white">Security</span>
        </div>

        <span className="text-slate-400">›</span>
    </button>

<button
    onClick={() => {
        navigate("/analytics");
        setOpen(false);
    }}
    className="w-full flex items-center justify-between rounded-2xl bg-slate-800/60 border border-slate-700 px-5 py-4 hover:bg-cyan-600/20 hover:border-cyan-400 transition-all duration-300"
>
    <div className="flex items-center gap-3">
        <span className="text-2xl">📊</span>
        <span className="font-semibold text-white">
            Analytics
        </span>
    </div>

    <span className="text-slate-400">›</span>
</button>

</div>

{/* Logout */}

<div className="mt-10">

    <button
        onClick={handleLogout}
        className="w-full rounded-2xl border border-red-500 bg-red-500/10 py-4 text-lg font-bold text-red-400 transition-all duration-300 hover:bg-red-600 hover:text-white"
    >
        🚪 Logout
    </button>

</div>

{/* Footer */}

{/* Footer */}

<div className="mt-8 text-center text-xs text-slate-500">
    EduAgent AI v1.0 🚀
</div>

        </div>

    </div>

    <SecurityModal
    open={securityOpen}
    setOpen={setSecurityOpen}
/>

</>

    );

}


export default ProfileSidebar;