function CourseGenerator({
  topic,
  setTopic,
  generateCourse,
  loading,
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-4">
        🎓 Course Generator
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Topic (e.g. Operating Systems)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
        />

        <button
          onClick={generateCourse}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          {loading ? "Generating..." : "Generate Course"}
        </button>
      </div>
    </div>
  );
}

export default CourseGenerator;