import { useState } from "react";
import {
    generateCodingQuestionAPI,
    evaluateCodeAPI
} from "../services/api";
import CodingControls from "../components/coding/CodingControls";
import QuestionCard from "../components/coding/QuestionCard";
import CodeEditor from "../components/coding/CodeEditor";
import ReviewCard from "../components/coding/ReviewCard";
import Navbar from "../components/Navbar";

function CodingInterview() {

    const [topic, setTopic] = useState("Arrays");
    const [difficulty, setDifficulty] = useState("Easy");
    const [language, setLanguage] = useState("Java");

    const [loading, setLoading] = useState(false);

    const [question, setQuestion] = useState(null);

    const [code, setCode] = useState(`class Solution {

}`);

    const [review, setReview] = useState(null);

    const generateQuestion = async () => {

    try {

        setLoading(true);

        const data =
            await generateCodingQuestionAPI(
                topic,
                difficulty
            );

        setQuestion(data);

        setReview(null);

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }

};

    const submitCode = async () => {

    try {

        setLoading(true);

        const data =
            await evaluateCodeAPI(

                topic,

                question.title,

                code,

                language

            );

        setReview(data);

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

            <div className="max-w-7xl mx-auto">

                <h1 className="text-5xl font-black mb-10">
                    💻 AI Coding Interview
                </h1>

                <CodingControls

                    topic={topic}
                    setTopic={setTopic}

                    difficulty={difficulty}
                    setDifficulty={setDifficulty}

                    language={language}
                    setLanguage={setLanguage}

                    loading={loading}

                    onGenerate={generateQuestion}

                />

                <QuestionCard question={question} />

                {question && (

                    <>

                        <CodeEditor

                            language={language}

                            code={code}

                            setCode={setCode}

                        />

                        <button

                            onClick={submitCode}

                            className="w-full mt-8 bg-green-600 py-4 rounded-xl font-bold"

                        >

                            Submit Code

                        </button>

                    </>

                )}

                <ReviewCard review={review} />

            </div>

                </div>

    </div>
);
}

export default CodingInterview;