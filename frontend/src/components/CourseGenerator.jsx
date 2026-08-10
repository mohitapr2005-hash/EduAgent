function CourseGenerator({
  topic,
  setTopic,
  generateCourse,
  loading,
}) {
  return (
    <div className="max-w-6xl mx-auto mt-14 mb-16 px-4">

      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-[32px] p-10 shadow-[0_0_40px_rgba(59,130,246,0.15)]">

        <h1 className="text-5xl font-extrabold text-center mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Learn Anything with AI
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create complete AI-powered learning roadmaps, quizzes,
video lessons, notes and interview preparation in seconds.
        </p>

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="🔍 Search any subject (Machine Learning, Java, UPSC Polity...)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 px-6 py-4 rounded-2xl bg-slate-800/70 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          />

          <button
            onClick={generateCourse}
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 font-bold shadow-lg disabled:opacity-50"
          >
            {loading ? "🤖 Generating Course..." : "✨ Generate AI Course"}
          </button>

        </div>
         {loading && (
  <div className="mt-8 rounded-3xl border border-cyan-500/30 bg-slate-900/90 p-8 shadow-[0_0_30px_rgba(6,182,212,0.2)] animate-pulse">

    <div className="flex items-center gap-4 mb-6">
      <div className="h-12 w-12 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>

      <div>
        <h2 className="text-2xl font-bold text-cyan-400">
          🤖 EduAgent AI
        </h2>

        <p className="text-slate-400">
          Creating your personalized course...
        </p>
      </div>
    </div>

    <div className="space-y-4">

      <div className="flex justify-between">
        <span>✔ Understanding Topic</span>
        <span>Done</span>
      </div>

      <div className="flex justify-between">
        <span>⏳ Building AI Roadmap</span>
        <span>Processing...</span>
      </div>

      <div className="flex justify-between">
        <span>📝 Generating Notes</span>
        <span>Processing...</span>
      </div>

      <div className="flex justify-between">
        <span>🎥 Preparing Lessons</span>
        <span>Waiting...</span>
      </div>

    </div>

    <div className="mt-8 w-full bg-slate-700 rounded-full h-3 overflow-hidden">
      <div className="h-3 w-2/3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full animate-pulse"></div>
    </div>

    <p className="text-center mt-5 text-slate-400">
      Please wait while AI prepares your learning roadmap...
    </p>

  </div>
)}

      </div>

    </div>

    
  );
}

export default CourseGenerator;