import { useState } from "react";
import { analyzeResumeAPI } from "../services/api";
import UploadCard from "../components/resume/UploadCard";
import ATSScore from "../components/resume/ATSScore";
import SkillsCard from "../components/resume/SkillsCard";
import SuggestionsCard from "../components/resume/SuggestionsCard";
import Navbar from "../components/Navbar";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
const [loading, setLoading] = useState(false);

const [analysis, setAnalysis] = useState(null);
const analyzeResume = async () => {

    if (!file) return;

    try {

        setLoading(true);

        const data = await analyzeResumeAPI(file);

console.log("Resume Response:", JSON.stringify(data, null, 2));

setAnalysis(data);


    }

    catch (err) {

        console.log(err);

    }

    finally {

        setLoading(false);

    }

};

return (
    <div className="min-h-screen bg-slate-950 text-white">

        <Navbar />

        <div className="max-w-6xl mx-auto px-8 py-10">

        <div className="max-w-5xl mx-auto py-16">

            <h1 className="text-7xl font-black text-center bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text">

                AI Resume Analyzer

            </h1>

            <p className="text-center text-slate-400 text-xl mt-6 mb-16 max-w-3xl mx-auto">

                Upload your resume and receive ATS score,
                skill analysis and AI suggestions.

            </p>

            <UploadCard

                file={file}
                setFile={setFile}
                loading={loading}
                onAnalyze={analyzeResume}

            />

{analysis && analysis.error && (
    <div className="mt-8 bg-red-900 border border-red-500 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-red-300">
            ❌ Resume Analysis Failed
        </h2>
        <p className="mt-3 text-red-200">
            {analysis.error}
        </p>
    </div>
)}

{analysis && !analysis.error && (
    <>
        <ATSScore
            score={analysis.ats_score}
        />

        <div className="grid md:grid-cols-2 gap-8 mt-8">
            <SkillsCard
                title="✅ Skills Found"
                skills={analysis.skills}
                color="bg-green-600"
            />
            <SkillsCard
                title="❌ Missing Skills"
                skills={analysis.missing_skills}
                color="bg-red-600"
            />
        </div>

        <SuggestionsCard
            suggestions={analysis.suggestions}
        />
    </>
)}

</div>

                </div>

    </div>
);
}

export default ResumeAnalyzer;