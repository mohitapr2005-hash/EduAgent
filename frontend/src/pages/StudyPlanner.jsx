import { useState } from "react";
import { generateStudyPlanAPI } from "../services/api";
import Navbar from "../components/Navbar";

function StudyPlanner() {

    const [topic, setTopic] = useState("");
    const [hours, setHours] = useState(2);
    const [days, setDays] = useState(30);
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {

        if (!topic.trim()) {
            alert("Enter a topic");
            return;
        }

        try {

            setLoading(true);

            const data = await generateStudyPlanAPI(
                topic,
                hours,
                days
            );

            setPlan(data);

        } catch (error) {

            console.error(error);

            alert("Failed to generate study plan");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-12">

                {/* Hero */}

                <div className="mb-12">

                    <h1 className="text-5xl font-black">
                        🤖 AI Study Planner
                    </h1>

                    <p className="text-slate-400 text-xl mt-3">
                        Generate a personalized study roadmap in seconds.
                    </p>

                </div>

                {/* Planner Form */}

                <div className="bg-slate-900 border border-slate-700 rounded-3xl p-10 shadow-xl">

                    <h2 className="text-3xl font-bold mb-8">
                        📅 Create Your Plan
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">

                        <div>

                            <label className="block mb-2 text-slate-400">
                                Course Topic
                            </label>

                            <input
                                placeholder="Machine Learning..."
                                value={topic}
                                onChange={(e)=>setTopic(e.target.value)}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-slate-400">
                                Hours / Day
                            </label>

                            <input
                                type="number"
                                value={hours}
                                onChange={(e)=>setHours(Number(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-slate-400">
                                Total Days
                            </label>

                            <input
                                type="number"
                                value={days}
                                onChange={(e)=>setDays(Number(e.target.value))}
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500"
                            />

                        </div>

                    </div>

                    <button
                        onClick={generatePlan}
                        className="mt-8 bg-gradient-to-r from-cyan-500 to-purple-600 px-10 py-4 rounded-xl font-bold hover:scale-105 transition"
                    >

                        {loading ? "⚡ Generating..." : "✨ Generate AI Study Plan"}

                    </button>

                </div>

                {/* Plan */}

                {plan?.days && (

                    <div className="mt-16">

                        <h2 className="text-4xl font-bold mb-10">
                            📖 Your Study Plan
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">

                            {plan.days.map((day)=>(

                                <div
                                    key={day.day}
                                    className="bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500 transition"
                                >

                                    <div className="flex justify-between items-center mb-5">

                                        <h3 className="text-2xl font-bold">

                                            📅 Day {day.day}

                                        </h3>

                                        <span className="bg-cyan-600 px-4 py-2 rounded-full text-sm">

                                            {hours} hrs

                                        </span>

                                    </div>

                                    <p className="text-cyan-400 font-semibold mb-6">

                                        {day.title}

                                    </p>

                                    <div className="space-y-3">

                                        {day.tasks.map((task,index)=>(

                                            <div
                                                key={index}
                                                className="bg-slate-800 rounded-xl p-4"
                                            >

                                                ✅ {task}

                                            </div>

                                        ))}

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}

export default StudyPlanner;