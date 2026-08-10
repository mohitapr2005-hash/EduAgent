import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { getAnalytics } from "../services/analytics";
import Navbar from "../components/Navbar";

function Analytics() {

    const [stats, setStats] = useState(null);

const user = auth.currentUser;

useEffect(() => {

    const loadAnalytics = async () => {

        if (!user) return;

        const data = await getAnalytics(user.uid);

        setStats(data);

    };

    loadAnalytics();

}, [user]);

    return (

        <div className="min-h-screen bg-slate-950 text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-10">

                <h1 className="text-5xl font-black">
                    📊 Analytics Dashboard
                </h1>

                <p className="text-slate-400 mt-3 text-lg">
                    Track your learning journey and AI usage.
                </p>

            </div>

            {/* Hero Cards */}

<div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-12">

    <div className="rounded-3xl bg-gradient-to-br from-cyan-600/20 to-blue-700/20 border border-cyan-500/30 p-7 hover:scale-105 transition duration-300">

        <p className="text-slate-300">
            🔥 Current Streak
        </p>

        <h1 className="text-5xl font-black mt-4">
            {stats?.streak || 0}
        </h1>

        <p className="text-cyan-400 mt-3">
            Days
        </p>

    </div>

    <div className="rounded-3xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 p-7 hover:scale-105 transition duration-300">

        <p className="text-slate-300">
            🏆 Total XP
        </p>

        <h1 className="text-5xl font-black mt-4">
            {stats?.xp || 0}
        </h1>

        <p className="text-yellow-400 mt-3">
            Experience
        </p>

    </div>

    <div className="rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 p-7 hover:scale-105 transition duration-300">

        <p className="text-slate-300">
            🪙 Coins
        </p>

        <h1 className="text-5xl font-black mt-4">
            {stats?.coins || 0}
        </h1>

        <p className="text-pink-400 mt-3">
            Earned
        </p>

    </div>

    <div className="rounded-3xl bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 p-7 hover:scale-105 transition duration-300">

        <p className="text-slate-300">
            ⭐ Level
        </p>

        <h1 className="text-5xl font-black mt-4">
            {stats?.level || 1}
        </h1>

        <p className="text-green-400 mt-3">
            Pro Learner
        </p>

    </div>

    

</div>
{/* Learning Statistics */}

<div className="mt-14">

    <h2 className="text-3xl font-bold mb-8">
        📚 Learning Statistics
    </h2>

    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-cyan-500 transition-all">

            <p className="text-slate-400">
                📚 Courses Created
            </p>

            <h2 className="text-4xl font-black mt-3">
                {stats?.courses || 0}
            </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-green-500 transition-all">

            <p className="text-slate-400">
                ✅ Lessons Completed
            </p>

            <h2 className="text-4xl font-black mt-3">
                {stats?.lessons_completed || 0}
            </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-purple-500 transition-all">

            <p className="text-slate-400">
                🤖 AI Questions
            </p>

            <h2 className="text-4xl font-black mt-3">
                {stats?.ai_questions || 0}
            </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-pink-500 transition-all">

            <p className="text-slate-400">
                💻 Coding Interviews
            </p>

            <h2 className="text-4xl font-black mt-3">
                {stats?.coding_interviews || 0}
            </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-yellow-500 transition-all">

            <p className="text-slate-400">
                📝 Notes Generated
            </p>

            <h2 className="text-4xl font-black mt-3">
                {stats?.notes_generated || 0}
            </h2>

        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-red-500 transition-all">

            <p className="text-slate-400">
                📄 Resume Reviews
            </p>

            <h2 className="text-4xl font-black mt-3">
                {stats?.resume_checks || 0}
            </h2>

        </div>

    </div>

</div>
{/* XP Progress + AI Usage */}

<div className="grid lg:grid-cols-2 gap-8 mt-14">

    {/* XP Card */}

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold">
            🏆 Level Progress
        </h2>

        <p className="text-slate-400 mt-3">
            Current Level
        </p>

        <div className="text-6xl font-black text-cyan-400 mt-5">
    Level {stats?.level || 1}
</div>
<p className="text-slate-400 mt-2">
    {stats?.xp || 0} XP Earned
</p>

        <div className="mt-8 w-full h-5 rounded-full bg-slate-800 overflow-hidden">

            <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
                style={{
    width: `${((stats?.xp || 0) % 500) / 5}%`
}}
            />

        </div>

        <div className="flex justify-between mt-3">

            <span className="text-slate-400">
                {stats?.xp || 0} XP
            </span>

            <span className="text-cyan-400">
                {((stats?.level || 1) * 500)} XP
            </span>

        </div>

    </div>

    {/* AI Usage */}

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

        <h2 className="text-3xl font-bold mb-8">
            🤖 Today's AI Usage
        </h2>

        {[
            ["Tutor",8,20],
            ["Course",3,10],
            ["Notes",7,15],
            ["Quiz",5,15],
            ["Interview",2,10],
            ["Coding",4,10]
        ].map((item,index)=>(

            <div
                key={index}
                className="mb-6"
            >

                <div className="flex justify-between mb-2">

                    <span>
                        {item[0]}
                    </span>

                    <span className="text-cyan-400">

                        {item[1]} / {item[2]}

                    </span>

                </div>

                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">

                    <div
                        className="bg-cyan-500 h-full"
                        style={{
                            width:`${item[1]/item[2]*100}%`
                        }}
                    />

                </div>

            </div>

        ))}

    </div>

</div>
        </div>

    );

}

export default Analytics;