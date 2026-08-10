import ReactMarkdown from "react-markdown";
function NotesGenerator({
  notesTopic,
  setNotesTopic,
  generateNotes,
  notes,
  loading,
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-4">
        📚 Notes Generator
      </h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Topic"
          value={notesTopic}
          onChange={(e) => setNotesTopic(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
        />
<button
    onClick={generateNotes}
    disabled={loading}
    className="bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition"
>
    {loading ? "📚 Generating..." : "Generate Notes"}
</button>
      </div>

      {notes && (
        <div className="mt-6 bg-slate-900 p-4 rounded-lg whitespace-pre-wrap">
          <div className="prose prose-invert max-w-none">
    <ReactMarkdown>
        {notes}
    </ReactMarkdown>
</div>
        </div>
      )}
    </div>
  );
}

export default NotesGenerator;