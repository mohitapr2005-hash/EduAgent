function CourseGenerator({
  topic,
  setTopic,
  generateCourse,
  loading,
}) {
  return (
    <div className="max-w-5xl mx-auto mt-10 mb-12">

      <div className="bg-slate-900/70 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-4xl font-extrabold text-center mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Learn Anything with AI
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Generate complete AI-powered courses with videos, quizzes,
          notes and your own AI tutor.
        </p>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search any subject (Machine Learning, Java, UPSC Polity...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-800 border border-slate-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />

          <button
            onClick={generateCourse}
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300 font-bold shadow-lg disabled:opacity-50"
          >
            {loading ? "⚡ Generating..." : "✨ Generate AI Course"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default CourseGenerator;