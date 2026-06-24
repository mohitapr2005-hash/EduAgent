function ProgressCard({

    roadmap,
    selectedWeek,

}) {

    if (!roadmap) return null;

    const totalWeeks = roadmap.weeks.length;

    const completed = selectedWeek || 0;

    const progress = Math.round(
        (completed / totalWeeks) * 100
    );

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
                📊 Learning Progress
            </h2>

            <div className="mb-4">

                <div className="flex justify-between">

                    <span>
                        Progress
                    </span>

                    <span>
                        {progress}%
                    </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-4 mt-3">

                    <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full transition-all duration-700"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                    <span>📚 Total Weeks</span>

                    <strong>{totalWeeks}</strong>

                </div>

                <div className="flex justify-between">

                    <span>✅ Completed</span>

                    <strong>{completed}</strong>

                </div>

                <div className="flex justify-between">

                    <span>🎯 Remaining</span>

                    <strong>{totalWeeks-completed}</strong>

                </div>

            </div>

        </div>

    );

}

export default ProgressCard;