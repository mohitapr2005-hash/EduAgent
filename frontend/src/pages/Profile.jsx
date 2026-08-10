import Navbar from "../components/Navbar";
import { auth } from "../firebase/firebase";
import EditProfileModal from "../components/EditProfileModal";

import { useState, useEffect } from "react";
import { getProfile } from "../services/profile";
import { getStats } from "../services/stats";
import { deleteAccount } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/auth";

function Profile() {

    const user = auth.currentUser;
    const [editOpen, setEditOpen] = useState(false);
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

    const loadProfile = async () => {

        if (!user) return;

        const data = await getProfile(user.uid);

        setProfile(data);

        const statData = await getStats(user.uid);

setStats(statData);

    };

    loadProfile();

}, [user]);
     

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-12">

                {/* Header */}

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col md:flex-row items-center gap-8">

                    <div className="w-40 h-40 rounded-full overflow-hidden bg-slate-800 border-4 border-cyan-500">

    {profile?.photo_url ? (

        <img
            src={profile.photo_url}
            alt="Profile"
            className="w-full h-full object-cover"
        />

    ) : (

        <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center text-6xl font-black">

            {user?.email?.charAt(0).toUpperCase()}

        </div>

    )}

</div>

                    <div className="flex-1">

                        <h1 className="text-5xl font-black">

                            {user?.displayName || "EduAgent User"}

                        </h1>

                        <p className="text-slate-400 text-xl mt-3">

                            {user?.email}

                        </p>

                        <button
    onClick={()=>setEditOpen(true)}
    className="mt-8 bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3 rounded-2xl font-bold hover:scale-105 transition"
>
    ✏ Edit Profile
</button>

                    </div>

                </div>

                {/* Cards */}

                <div className="grid lg:grid-cols-2 gap-8 mt-10">

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                        <h2 className="text-3xl font-bold mb-8">

                            👤 Personal Information

                        </h2>

                        <div className="space-y-6">

                            <Info
    title="University"
    value={profile?.university || "Not Added"}
/>

                            <Info
    title="Skills"
    value={profile?.skills || "Not Added"}
/>

                            <Info
    title="Target Company"
    value={profile?.company || "Not Added"}
/>

                            <Info
    title="Bio"
    value={profile?.bio || "Not Added"}
/>

                        </div>

                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

                        <h2 className="text-3xl font-bold mb-8">

                            📊 Learning Statistics

                        </h2>

<Stat
    name="Courses"
    value={stats?.courses || 0}
/>

<Stat
    name="Lessons"
    value={stats?.lessons_completed || 0}
/>

<Stat
    name="AI Questions"
    value={stats?.ai_questions || 0}
/>

<Stat
    name="Coding Interviews"
    value={stats?.coding_interviews || 0}
/>

<Stat
    name="Resume Checks"
    value={stats?.resume_checks || 0}
/>

<Stat
    name="XP"
    value={stats?.xp || 0}
/>

<Stat
    name="Streak 🔥"
    value={`${stats?.streak || 0} Days`}
/>

                    </div>

                </div>

                {/* Social */}

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">

                    <h2 className="text-3xl font-bold mb-8">

                        🌐 Social Links

                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <Social
    title="GitHub"
    value={profile?.github}
/>

<Social
    title="LinkedIn"
    value={profile?.linkedin}
/>

<Social
    title="Portfolio"
    value="Coming Soon"
/>

                    </div>

                </div>

                {/* Account */}

                <div className="bg-slate-900 border border-red-900 rounded-3xl p-8 mt-8">

                    <h2 className="text-3xl font-bold mb-8">

                        ⚙ Account Settings

                    </h2>

                    <div className="flex gap-5">

                        <button
    onClick={handleChangePassword}
    className="bg-yellow-600 px-6 py-3 rounded-xl font-semibold"
>
    Change Password
</button>

                       <button
    onClick={handleDelete}
    className="bg-red-600 px-6 py-3 rounded-xl font-semibold"
>
    Delete Account
</button>

                    </div>

                </div>

            </div>
            <EditProfileModal
    open={editOpen}
    setOpen={setEditOpen}
/>

        </div>

    );

}

function Info({ title, value }) {

    return (

        <div>

            <p className="text-slate-400">

                {title}

            </p>

            <p className="text-xl font-semibold">

                {value}

            </p>

        </div>

    );

}

function Stat({ name, value }) {

    return (

        <div className="flex justify-between py-4 border-b border-slate-800">

            <span>{name}</span>

            <span className="font-bold text-cyan-400">

                {value}

            </span>

        </div>

    );

}

function Social({ title, value }) {

    return (

        <div className="bg-slate-800 rounded-2xl p-6">

            <h3 className="text-xl font-bold">
                {title}
            </h3>

            <p className="text-slate-400 mt-3 break-all">
                {value || "Not Connected"}
            </p>

        </div>

    );

}

export default Profile;


const handleDelete = async () => {

    const ok = window.confirm(
        "Delete your account permanently?"
    );

    if (!ok) return;

    try {

        await deleteAccount();

        navigate("/login");

    }

    catch(err){

        alert(err.message);

    }

};

const handleChangePassword = async () => {

    try {

        await changePassword();

        alert(
            "Password reset link has been sent to your email."
        );

    } catch (err) {

        alert(err.message);

    }

};