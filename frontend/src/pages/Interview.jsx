import { useState } from "react";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import {
    generateInterviewQuestionAPI,
    evaluateAnswerAPI,
    saveInterviewAPI
} from "../services/api";



function Interview() {

    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");

    // STEP 3 (states)
    const [interviewFinished, setInterviewFinished] = useState(false);
    const [nextQuestion, setNextQuestion] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [remaining, setRemaining] = useState(null);
const [limit, setLimit] = useState(null);
    const [history, setHistory] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(1);
    const MAX_QUESTIONS = 5;

    // 👇 STEP 4 GOES HERE
    const startInterview = async () => {

        try {

            setLoading(true);

            const data = await generateInterviewQuestionAPI(
                topic,
                difficulty
            );
            console.log(data);
            if (data.error) {
    toast.error(data.error);
    return;
}

setRemaining(data.remaining);
setLimit(data.limit);
            setInterviewFinished(false);
            setQuestion(data.question);
            setQuestionNumber(1);
            setHistory([]);
            setAnswer("");
            setResult(null);
            

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    const submitAnswer = async () => {

    try {

        setLoading(true);

        const data = await evaluateAnswerAPI(
            topic,
            question,
            answer
        );
        console.log("Evaluate Response:", data);

        setResult(data);
        setHistory([
    ...history,
    {
        question,
        answer,
        score: data.score
    }
]);

if (questionNumber < MAX_QUESTIONS) {

setNextQuestion(data.next_question);

} else {

    setInterviewFinished(true);

}

    }

    catch(err){

    console.error("Full Error:", err);

    if (err.response) {
        console.log("Response:", err.response);
    }

    alert("Error occurred. Check browser console.");

}

    finally{

        setLoading(false);

    }

};

return (

    <div className="min-h-screen bg-slate-950 text-white">

        <Navbar />

        <div className="max-w-4xl mx-auto px-6 py-12">

<div className="mb-12 text-center">

    <p className="text-cyan-400 uppercase tracking-[0.35em] text-sm mb-3">
        AI POWERED INTERVIEW PRACTICE
    </p>

    <h1 className="text-6xl font-black">
        🎤 AI Mock Interview
    </h1>

    <p className="text-slate-400 text-xl mt-5 max-w-2xl mx-auto">
        Practice technical interviews with AI feedback, scoring,
        strengths, weaknesses and personalized improvement tips.
    </p>

</div>
                <div className="bg-slate-900/80 border border-slate-700 rounded-3xl p-10 mt-12 shadow-2xl backdrop-blur-xl">

<input
    className="w-full p-5 text-lg rounded-2xl bg-slate-800 border border-slate-700 focus:border-cyan-500 outline-none mb-6"
    placeholder="Enter Topic"
    value={topic}
    onChange={(e)=>setTopic(e.target.value)}
/>

<select
    className="w-full p-4 rounded-xl bg-slate-800 mb-6"
    value={difficulty}
    onChange={(e)=>setDifficulty(e.target.value)}
>
    <option>Easy</option>
    <option>Medium</option>
    <option>Hard</option>
</select>

<button
    onClick={startInterview}
    className="w-full mt-8 py-5 rounded-2xl text-xl font-bold bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:scale-[1.02] transition-all duration-300 shadow-xl"
>
    {loading ? "⏳ Generating Interview..." : "🚀 Start Interview"}
</button>
{remaining !== null && (
    <p className="mt-4 text-center text-cyan-400 font-semibold">
        Remaining Daily Interviews: {remaining} / {limit}
    </p>
)}

</div>
                {result && (

<div className="mt-8 bg-slate-900 border border-green-700 rounded-3xl p-8 shadow-xl">

<h2 className="text-2xl font-bold mb-4">
Result
</h2>

<p>
⭐ Score:
{result.score}/10
</p>

<h3 className="mt-4 font-bold">
Strengths
</h3>

<ul>
{
result.strengths?.map((s,index)=>

<li key={index}>
✅ {s}
</li>

)
}
</ul>

<h3 className="mt-4 font-bold">
Weaknesses
</h3>

<ul>
{
result.weaknesses?.map((w,index)=>

<li key={index}>
❌ {w}
</li>

)
}
</ul>

<p className="mt-4">
💡 {result.interview_tip}
</p>

</div>

)}

{nextQuestion && questionNumber < MAX_QUESTIONS && (

    <button
        onClick={() => {

            setQuestion(nextQuestion);

            setQuestionNumber(questionNumber + 1);

            setAnswer("");

            setResult(null);

            setNextQuestion("");

        }}
        className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
    >
        Next Question →
    </button>

)}

                {/* 👇 STEP 5 GOES HERE */}
                {question && (

<div className="mb-8">

<div className="flex justify-between mb-2">

<span className="font-semibold">
Question {questionNumber} / {MAX_QUESTIONS}
</span>

<span>
{Math.round(questionNumber / MAX_QUESTIONS * 100)}%
</span>

</div>

<div className="w-full bg-slate-800 rounded-full h-3">

<div

className="bg-cyan-500 h-3 rounded-full transition-all"

style={{
width: `${questionNumber/MAX_QUESTIONS*100}%`
}}
>

</div>

</div>

</div>

)}

                {question && (

                    

                    <div className="mt-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

                        <h2 className="text-2xl font-bold mb-4">
                            Question
                        </h2>

                        <p className="text-lg">
                            {question}
                        </p>
                        <textarea
    className="w-full mt-6 p-5 rounded-2xl bg-slate-800 border border-slate-700 h-56 focus:border-cyan-500 outline-none"
    placeholder="Write your answer here..."
    value={answer}
    onChange={(e)=>setAnswer(e.target.value)}
/>

<button
    onClick={submitAnswer}
    disabled={loading}
    className="mt-6 w-full bg-green-600 hover:bg-green-700 py-4 rounded-2xl text-lg font-bold transition"
>
    {loading ? "Evaluating..." : "Submit Answer"}
</button>

                    </div>
                    

                )}

                {interviewFinished && (

<div className="mt-10 bg-gradient-to-r from-green-900/40 to-emerald-900/30 border border-green-600 rounded-3xl p-10 shadow-2xl">

    <h1 className="text-4xl font-bold text-green-400 mb-6">
        🎉 Interview Completed
    </h1>

    <p className="text-xl">
        Questions Answered:
    </p>

<div className="mt-6">

    <p className="text-xl">
        Average Score
    </p>

    <div className="text-6xl font-black text-cyan-400 my-6">

        {(
            history.reduce(
                (sum,item)=>sum+item.score,
                0
            )/history.length
        ).toFixed(1)}

        /10

    </div>

</div>

</div>

)}


                    </div>

    </div>

);

}

export default Interview;