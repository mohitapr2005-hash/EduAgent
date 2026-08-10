function QuestionCard({ question }) {

    if (!question) return null;

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 mt-8">

            <h2 className="text-3xl font-bold">
                {question.title}
            </h2>

            <div className="mt-4">

                <span className="bg-blue-600 px-4 py-2 rounded-full">

                    {question.difficulty}

                </span>

            </div>

            <p className="mt-8 text-lg whitespace-pre-line">

                {question.description}

            </p>

            <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                    Example
                </h3>

                {question.examples?.map((example, index) => (

                    <div
                        key={index}
                        className="bg-slate-800 rounded-xl p-4 mb-3 font-mono"
                    >
                        {example}
                    </div>

                ))}

            </div>

            <div className="mt-8">

                <h3 className="text-xl font-bold mb-4">
                    Constraints
                </h3>

                <ul>

                    {question.constraints?.map((constraint, index) => (

                        <li key={index} className="mb-2">

                            • {constraint}

                        </li>

                    ))}

                </ul>

            </div>

        </div>

    );

}

export default QuestionCard;