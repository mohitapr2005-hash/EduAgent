function ReviewCard({ review }) {

    if (!review) return null;

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 mt-8">

            <h2 className="text-3xl font-bold mb-8">
                🤖 AI Code Review
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="bg-slate-800 rounded-2xl p-6">

                    <h3 className="text-lg text-slate-400">
                        Score
                    </h3>

                    <p className="text-4xl font-black text-green-400 mt-2">
                        {review.score}/10
                    </p>

                </div>

                <div className="bg-slate-800 rounded-2xl p-6">

                    <h3 className="text-lg text-slate-400">
                        Time Complexity
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {review.time_complexity}
                    </p>

                </div>

                <div className="bg-slate-800 rounded-2xl p-6">

                    <h3 className="text-lg text-slate-400">
                        Space Complexity
                    </h3>

                    <p className="text-3xl font-bold mt-2">
                        {review.space_complexity}
                    </p>

                </div>

            </div>

            <div className="mt-10">

                <h3 className="text-2xl font-bold mb-4">
                    ✅ Strengths
                </h3>

                {review.strengths?.map((item, index) => (

                    <div
                        key={index}
                        className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-3"
                    >
                        {item}
                    </div>

                ))}

            </div>

            <div className="mt-10">

                <h3 className="text-2xl font-bold mb-4">
                    ❌ Weaknesses
                </h3>

                {review.weaknesses?.map((item, index) => (

                    <div
                        key={index}
                        className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-3"
                    >
                        {item}
                    </div>

                ))}

            </div>

            <div className="mt-10 bg-blue-900/30 border border-blue-700 rounded-2xl p-6">

                <h3 className="text-2xl font-bold mb-3">
                    🚀 Optimization
                </h3>

                <p>
                    {review.optimization}
                </p>

            </div>

        </div>

    );

}

export default ReviewCard;