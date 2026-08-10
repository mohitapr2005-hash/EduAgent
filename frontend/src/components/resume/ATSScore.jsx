function ATSScore({ score }) {

    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const progress =
        circumference - (score / 100) * circumference;

    let color = "#22c55e";

    if (score < 80) color = "#eab308";

    if (score < 60) color = "#ef4444";

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 mt-8">

            <h2 className="text-3xl font-bold text-center mb-8">
                ATS Score
            </h2>

            <div className="flex justify-center">

                <div className="relative w-60 h-60">

                    <svg
                        className="w-60 h-60 -rotate-90"
                    >

                        <circle
                            cx="120"
                            cy="120"
                            r={radius}
                            stroke="#334155"
                            strokeWidth="15"
                            fill="none"
                        />

                        <circle
                            cx="120"
                            cy="120"
                            r={radius}
                            stroke={color}
                            strokeWidth="15"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={progress}
                        />

                    </svg>

                    <div className="absolute inset-0 flex flex-col justify-center items-center">

                        <h1 className="text-6xl font-black">
                            {score}
                        </h1>

                        <p className="text-slate-400">
                            ATS Score
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ATSScore;