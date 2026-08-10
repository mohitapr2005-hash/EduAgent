function SuggestionsCard({ suggestions }) {

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                💡 AI Suggestions
            </h2>

            <div className="space-y-4">

                {(suggestions || []).map((item, index) => (

                    <div
    key={index}
    className="flex items-start gap-4 bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-purple-500 transition"
>

                        <div className="text-green-400 text-2xl">
                            ✔
                        </div>

                        <p className="text-lg">
                            {item}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default SuggestionsCard;