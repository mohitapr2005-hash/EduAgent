function UploadCard({
    file,
    setFile,
    onAnalyze,
    loading
}) {

    return (

        <div className="bg-slate-900 rounded-3xl border border-slate-700 p-10">

            <div className="text-center">

                <div className="text-7xl mb-6">
                    📄
                </div>

                <h2 className="text-3xl font-bold">
                    Upload Resume
                </h2>

                <p className="text-slate-400 mt-3">
                    Upload your resume in PDF format
                </p>

                <div className="border-2 border-dashed border-purple-500 rounded-2xl mt-10 p-12">

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e)=>setFile(e.target.files[0])}
                        className="hidden"
                        id="resume"
                    />

                    <label
                        htmlFor="resume"
                        className="cursor-pointer"
                    >

                        <div className="text-5xl">
                            ☁️
                        </div>

                        <p className="mt-5 text-lg">
                            Click to choose PDF
                        </p>

                    </label>

                </div>

                {file && (

                    <div className="mt-8 bg-slate-800 rounded-xl p-4">

                        ✅ {file.name}

                    </div>

                )}

                <button
                    disabled={!file || loading}
                    onClick={onAnalyze}
                    className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-600 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all disabled:opacity-50"
                >

                    {loading
                        ? "Analyzing..."
                        : "Analyze Resume"}

                </button>

            </div>

        </div>

    );

}

export default UploadCard;