import { useEffect, useState } from "react";
import { getDashboardAPI } from "../services/api";
import DashboardStats from "../components/DashboardStats";

function DashboardStats() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const data = await getDashboardAPI();

                setStats(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadDashboard();

    }, []);

    if (!stats) {

        return (
            <div className="text-center py-10">
                Loading Dashboard...
            </div>
        );

    }

    const cards = [
        {
            title: "Courses",
            value: stats.courses_created,
            icon: "📚"
        },
        {
            title: "Certificates",
            value: stats.certificates,
            icon: "🏆"
        },
        {
            title: "Completed Weeks",
            value: stats.completed_weeks,
            icon: "✅"
        },
        {
            title: "Quizzes",
            value: stats.quizzes_attempted,
            icon: "❓"
        },
        {
            title: "Videos",
            value: stats.videos_generated,
            icon: "🎥"
        },
        {
            title: "Notes",
            value: stats.notes_generated,
            icon: "📝"
        }
    ];

    return (

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-12">

            {cards.map((card) => (

                <div
    key={card.title}
    className="
group
bg-gradient-to-br
from-slate-900
to-slate-800
border
border-slate-700
rounded-3xl
p-6
shadow-xl
hover:shadow-blue-500/20
hover:border-blue-500
hover:-translate-y-2
transition-all
duration-300
cursor-pointer
"
>

                    <div className="text-5xl group-hover:scale-125 transition duration-300">

                        {card.icon}

                    </div>

                    <h2 className="text-slate-400 mt-4 text-xs uppercase tracking-[2px]">

                        {card.title}

                    </h2>

                    <h1 className="text-4xl font-extrabold mt-2 text-white">

                        {card.value}

                    </h1>

                </div>

            ))}

        </div>

    );

}

export default DashboardStats;

import {
    BookOpen,
    Brain,
    FileText,
    FlaskConical
} from "lucide-react";

export default function DashboardStats() {

    const stats = [

        {
            title: "AI Courses",
            value: "12+",
            icon: <BookOpen size={28} />,
            color: "from-blue-500 to-cyan-500"
        },

        {
            title: "Virtual Labs",
            value: "6",
            icon: <FlaskConical size={28} />,
            color: "from-purple-500 to-pink-500"
        },

        {
            title: "Notes Generated",
            value: "50+",
            icon: <FileText size={28} />,
            color: "from-orange-500 to-red-500"
        },

        {
            title: "AI Assistant",
            value: "24/7",
            icon: <Brain size={28} />,
            color: "from-emerald-500 to-green-500"
        }

    ];

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-12">

            {stats.map((item, index) => (

                <div
                    key={index}
                    className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                >

                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-r ${item.color}`}>

                        {item.icon}

                    </div>

                    <h3 className="text-slate-400 mt-5">

                        {item.title}

                    </h3>

                    <h1 className="text-4xl font-bold mt-2">

                        {item.value}

                    </h1>

                </div>

            ))}

        </div>

    );

}