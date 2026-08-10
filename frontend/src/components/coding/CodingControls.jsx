function CodingControls({

    topic,
    setTopic,

    difficulty,
    setDifficulty,

    language,
    setLanguage,

    onGenerate,

    loading

}) {

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">

            <div className="grid md:grid-cols-3 gap-6">

                <select
                    value={topic}
                    onChange={(e)=>setTopic(e.target.value)}
                    className="bg-slate-800 rounded-xl p-4"
                >
                    <option>Arrays</option>
                    <option>Strings</option>
                    <option>Linked Lists</option>
                    <option>Trees</option>
                    <option>Graphs</option>
                    <option>Dynamic Programming</option>
                </select>

                <select
                    value={difficulty}
                    onChange={(e)=>setDifficulty(e.target.value)}
                    className="bg-slate-800 rounded-xl p-4"
                >
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                </select>

                <select
                    value={language}
                    onChange={(e)=>setLanguage(e.target.value)}
                    className="bg-slate-800 rounded-xl p-4"
                >
                    <option>Java</option>
                    <option>Python</option>
                    <option>C++</option>
                    <option>JavaScript</option>
                </select>

            </div>

            <button

                onClick={onGenerate}

                className="mt-8 w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl py-4 font-bold"

            >

                {loading

                    ? "Generating..."

                    : "Generate Coding Question"}

            </button>

        </div>

    );

}

export default CodingControls;