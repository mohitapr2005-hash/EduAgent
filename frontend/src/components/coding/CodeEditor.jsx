import Editor from "@monaco-editor/react";

function CodeEditor({ language, code, setCode }) {

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 mt-8">

            <h2 className="text-2xl font-bold mb-6">
                💻 Code Editor
            </h2>

            <Editor
                height="500px"
                theme="vs-dark"
                language={language.toLowerCase()}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                    fontSize: 16,
                    minimap: {
                        enabled: false
                    },
                    automaticLayout: true,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                    tabSize: 4
                }}
            />

        </div>

    );

}

export default CodeEditor;