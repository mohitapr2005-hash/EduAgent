function QuizGenerator({
  quizTopic,
  setQuizTopic,
  generateQuiz,
  quiz,
  selectedAnswers,
  setSelectedAnswers,
  submitQuiz,
  score,
  loading,
}) {
  return (
    <>
      <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-4">
          📝 Quiz Generator
        </h2>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Topic"
            value={quizTopic}
            onChange={(e) => setQuizTopic(e.target.value)}
            className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
          />

          <button
    onClick={generateQuiz}
    disabled={loading}
    className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
>
    {loading ? "📝 Generating..." : "Generate Quiz"}
</button>
        </div>
      </div>

      {quiz?.questions && (
        <div style={{ marginTop: "20px" }}>
          {quiz.questions.map((q, index) => (
            <div
              key={index}
              className="bg-slate-800/50 p-6 rounded-2xl shadow-lg mb-4"
            >
              <h4>
                {index + 1}. {q.question}
              </h4>

              {q.options.map((option, i) => (
                <div key={i}>
                  <label>
                    <input
  type="radio"
  name={`question-${index}`}
  value={option}
  checked={selectedAnswers[index] === option}
  onChange={() =>
    setSelectedAnswers({
      ...selectedAnswers,
      [index]: option,
    })
  }
/>
                    {" "}
                    {option}
                  </label>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {quiz && (
        <button
          onClick={submitQuiz}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold mt-4"
        >
          Submit Quiz
        </button>
      )}

      {score !== null && quiz && (
        <div className="bg-green-600 text-white text-center text-2xl font-bold p-4 rounded-2xl mt-6">
          🎉 Your Score: {score}/{quiz.questions.length}
        </div>
      )}
    </>
  );
}

export default QuizGenerator;