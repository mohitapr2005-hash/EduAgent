function VideoPlayer({
  videoUrl,
  loading,
}) {

  if (loading) {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">
        🎥 Generating AI Video
      </h2>

      <div className="h-80 flex flex-col justify-center items-center">

        <div className="animate-spin rounded-full h-20 w-20 border-4 border-cyan-500 border-t-transparent"></div>

        <p className="mt-8 text-gray-300">
          Creating lesson...
        </p>

        <p className="text-gray-500">
          This usually takes 2-3 minutes.
        </p>

      </div>

    </div>
  );
}
  if (!videoUrl) {
    return (
      <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          🎥 AI Video Lesson
        </h2>

        <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center">

          <div className="text-center">

            <div className="text-6xl mb-4">
              🎬
            </div>

            <h3 className="text-xl font-semibold text-gray-300">
              No Video Generated Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Click "Watch Video" from any week to generate an AI lesson.
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">
            🎥 AI Video Lesson
          </h2>

          <p className="text-gray-400 mt-1">
            AI Generated Educational Video
          </p>

        </div>

        <a
          href={videoUrl}
          download
          className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl font-semibold transition"
        >
          ⬇ Download
        </a>

      </div>

      <video
        src={videoUrl}
        controls
        controlsList="nodownload"
        className="w-full rounded-2xl border border-slate-700 shadow-lg"
      />

    </div>
  );
}

export default VideoPlayer;