import QuizGenerator from "../QuizGenerator";
import NotesGenerator from "../NotesGenerator";

function RevisionSection(props) {

    return (

        <>

            <div className="mb-8">

                <h2 className="text-4xl font-black">

                    🧠 Practice & Revision

                </h2>

                <p className="text-slate-400 mt-2">

                    Strengthen your understanding with quizzes and AI-generated notes.

                </p>

            </div>

            <div className="grid lg:grid-cols-2 gap-8">

                <QuizGenerator
                    quizTopic={props.quizTopic}
                    setQuizTopic={props.setQuizTopic}
                    generateQuiz={props.generateQuiz}
                    quiz={props.quiz}
                    selectedAnswers={props.selectedAnswers}
                    setSelectedAnswers={props.setSelectedAnswers}
                    submitQuiz={props.submitQuiz}
                    score={props.score}
                />

                <NotesGenerator
                    notesTopic={props.notesTopic}
                    setNotesTopic={props.setNotesTopic}
                    generateNotes={props.generateNotes}
                    notes={props.notes}
                />

            </div>

        </>

    );

}

export default RevisionSection;