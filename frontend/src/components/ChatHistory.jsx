function ChatHistory({
    chatHistory,
    setQuestion,
    setAnswer,
    deleteChat
}) {

    return (
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">

            <h2 className="text-xl font-bold mb-4">
                💬 Chat History
            </h2>

            <div className="space-y-3">

                {chatHistory.map((chat) => (

                    <div
                        key={chat.id}
                        className="bg-slate-800 rounded-lg p-3 flex justify-between items-start"
                    >

                        <button
                            onClick={() => {
                                setQuestion(chat.question);
                                setAnswer(chat.answer);
                            }}
                            className="flex-1 text-left"
                        >
                            <p className="font-semibold truncate">
                                {chat.question}
                            </p>

                            <div className="mt-2 max-h-40 overflow-y-auto text-slate-400 break-words whitespace-pre-wrap">
  {chat.answer}
</div>
                        </button>

                        <button
                            onClick={() => deleteChat(chat.id)}
                            className="ml-3 text-red-400 hover:text-red-300"
                        >
                            🗑️
                        </button>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ChatHistory;