import { useEffect, useState } from "react";
import { getInterviewHistoryAPI } from "../services/api";

function InterviewHistory() {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        loadHistory();

    }, []);

    const loadHistory = async () => {

        try {

            const data = await getInterviewHistoryAPI();

            setHistory(data);

        } catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <div className="max-w-5xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    🎤 Interview History
                </h1>

                {history.length === 0 ? (

                    <p>No interviews yet.</p>

                ) : (

                    history.map((item) => (

                        <div
                            key={item.id}
                            className="bg-slate-900 rounded-2xl p-6 mb-5"
                        >

                            <h2 className="text-2xl font-bold">
                                {item.topic}
                            </h2>

                            <p className="mt-2">
                                ⭐ Score: {item.score}/10
                            </p>

                            <p className="mt-2 text-slate-300">
                                {item.feedback}
                            </p>

                            <p className="mt-3 text-sm text-slate-400">
                                {new Date(item.created_at).toLocaleString()}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>

    );

}

export default InterviewHistory;