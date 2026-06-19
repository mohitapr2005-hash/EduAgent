function AITutor({
  question,
  setQuestion,
  askDoubt,
  answer,
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Tutor
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Ask any question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
        />

        <button
          onClick={askDoubt}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
        >
          Ask AI
        </button>
      </div>

      {answer && (
        <div className="mt-6 bg-slate-900 p-4 rounded-lg">
          <h3 className="font-bold mb-2">
            Answer
          </h3>

          <p className="whitespace-pre-wrap">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

export default AITutor;