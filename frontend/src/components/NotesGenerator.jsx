function NotesGenerator({
  notesTopic,
  setNotesTopic,
  generateNotes,
  notes,
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
          className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold"
        >
          Generate Notes
        </button>
      </div>

      {notes && (
        <div className="mt-6 bg-slate-900 p-4 rounded-lg whitespace-pre-wrap">
          {notes}
        </div>
      )}
    </div>
  );
}

export default NotesGenerator;