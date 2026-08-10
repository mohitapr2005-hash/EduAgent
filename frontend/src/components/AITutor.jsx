function AITutor({
  question,
  setQuestion,
  askDoubt,
  answer,
  loading,
}) {
  return (

<div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

    

    

    <textarea
        rows={4}
        value={question}
        onChange={(e)=>setQuestion(e.target.value)}
        placeholder="💬 Ask AI anything..."
        className="w-full bg-slate-800 rounded-xl p-5 border border-slate-700 resize-none outline-none focus:border-cyan-500"
    />

    <div className="mt-6">

        <p className="text-sm text-slate-400 mb-3">
            Example Questions
        </p>

        <div className="flex flex-wrap gap-3">

            <button
                onClick={()=>setQuestion("Explain today's lesson in simple words")}
                className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full"
            >
                📚 Explain lesson
            </button>

            <button
                onClick={()=>setQuestion("Generate interview questions")}
                className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full"
            >
                💼 Interview Questions
            </button>

            <button
                onClick={()=>setQuestion("Give real-world examples")}
                className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full"
            >
                💡 Real Examples
            </button>

        </div>

    </div>

    <button
    onClick={askDoubt}
    disabled={loading}
    className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-purple-600 py-4 rounded-xl font-bold hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
>
    {loading ? "🤖 Thinking..." : "🚀 Ask AI"}
</button>

    {answer && (

        <div className="mt-8 bg-slate-800 rounded-2xl p-6">

            <h3 className="font-bold mb-3">
                AI Response
            </h3>

            <p className="leading-8 text-slate-300 whitespace-pre-wrap">
                {answer}
            </p>

        </div>

    )}

</div>

);
}

export default AITutor;