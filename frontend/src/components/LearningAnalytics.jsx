function LearningAnalytics({ stats }) {

    if (!stats) return null;

    return (

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">

                📈 Learning Analytics

            </h2>

            <div className="space-y-5">

                <Row title="📚 Courses" value={stats.courses} />

                <Row title="📖 Lessons" value={stats.lessons_completed} />

                <Row title="🤖 AI Questions" value={stats.ai_questions} />

                <Row title="💻 Coding Interviews" value={stats.coding_interviews} />

                <Row title="📄 Resume Checks" value={stats.resume_checks} />

                <Row title="⭐ XP" value={stats.xp} />

                <Row title="🔥 Streak" value={`${stats.streak} Days`} />

            </div>

        </div>

    );

}

function Row({ title, value }) {

    return (

        <div className="flex justify-between border-b border-slate-800 pb-4">

            <span>{title}</span>

            <span className="font-bold text-cyan-400">

                {value}

            </span>

        </div>

    );

}

export default LearningAnalytics;