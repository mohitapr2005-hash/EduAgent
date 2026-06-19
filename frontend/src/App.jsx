import { useState } from "react";
import Navbar from "./components/Navbar";
import CourseGenerator from "./components/CourseGenerator";
import Roadmap from "./components/Roadmap";
import AITutor from "./components/AITutor";
import QuizGenerator from "./components/QuizGenerator";
import NotesGenerator from "./components/NotesGenerator";
import {
  generateCourseAPI,
  askDoubtAPI,
  generateQuizAPI,
  generateNotesAPI,
  generateWeekLessonAPI,
} from "./services/api";

function App() {

const [selectedWeek, setSelectedWeek] = useState(null);

const [lesson, setLesson] = useState(null);
const [lessonLoading, setLessonLoading] = useState(false);

const [topic, setTopic] = useState("");
const [roadmap, setRoadmap] = useState(null);
const [loading, setLoading] = useState(false);

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");

const [quizTopic, setQuizTopic] = useState("");
const [quiz, setQuiz] = useState(null);

const [selectedAnswers, setSelectedAnswers] = useState({});
const [score, setScore] = useState(null);

const [notesTopic, setNotesTopic] = useState("");
const [notes, setNotes] = useState("");


const generateCourse = async () => {

    if (!topic.trim()) {
        alert("Please enter a topic");
        return;
    }

    try {

        setLoading(true);

        const data = await generateCourseAPI(topic);

        setRoadmap(data);

    } catch (error) {

        console.error(error);

        alert("Something went wrong");

    } finally {

        setLoading(false);

    }

};

const askDoubt = async () => {

    if (!question.trim()) {
        alert("Please enter a question");
        return;
    }

    try {

        const data = await askDoubtAPI(question);

        setAnswer(data.answer);

    } catch (error) {

        console.error(error);

        alert("Failed to get answer");

    }

};

const generateQuiz = async () => {

    if (!quizTopic.trim()) {
        alert("Please enter a topic");
        return;
    }

    try {

        const data = await generateQuizAPI(quizTopic);

        if (data.error) {
            alert(data.error);
            return;
        }

        setQuiz(data);
        setSelectedAnswers({});
        setScore(null);

    } catch (error) {

        console.error(error);

        alert("Failed to generate quiz");

    }

};

const generateNotes = async () => {

    if (!notesTopic.trim()) {
        alert("Please enter a topic");
        return;
    }

    try {

        const data = await generateNotesAPI(notesTopic);

        setNotes(data.notes);

    } catch (error) {

        console.error(error);

        alert("Failed to generate notes");

    }

};

const submitQuiz = () => {
  if (!quiz || !quiz.questions) return;

  let total = 0;

  quiz.questions.forEach((q, index) => {
    if (selectedAnswers[index] === q.answer) {
      total++;
    }
  });

  setScore(total);
};

const generateWeekLesson = async (week) => {

    try {

        setLessonLoading(true);

        const data = await generateWeekLessonAPI(topic, week);

        if (data.error) {
            alert(data.error);
            return;
        }

        setSelectedWeek(week);
        setLesson(data);

    } catch (error) {

        console.error(error);

        alert("Failed to generate lesson");

    } finally {

        setLessonLoading(false);

    }

};


return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-10">
  
<Navbar />


<CourseGenerator
  topic={topic}
  setTopic={setTopic}
  generateCourse={generateCourse}
  loading={loading}
/>



<Roadmap
  roadmap={roadmap}
  lesson={lesson}
  selectedWeek={selectedWeek}
  generateWeekLesson={generateWeekLesson}
/>


<AITutor
  question={question}
  setQuestion={setQuestion}
  askDoubt={askDoubt}
  answer={answer}
/>



<QuizGenerator
  quizTopic={quizTopic}
  setQuizTopic={setQuizTopic}
  generateQuiz={generateQuiz}
  quiz={quiz}
  selectedAnswers={selectedAnswers}
  setSelectedAnswers={setSelectedAnswers}
  submitQuiz={submitQuiz}
  score={score}
/>

 {quiz?.questions && (
  <div style={{ marginTop: "20px" }}>
    {quiz.questions.map((q, index) => (
      <div
        key={index}
     className="bg-slate-800/50 p-6 rounded-2xl shadow-lg mb-4"
      >
        <h4>
          {index + 1}. {q.question}
        </h4>

        <div>
          {q.options.map((option, i) => (
            <div key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={option}
                  onChange={() =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [index]: option,
                    })
                  }
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
)}



<NotesGenerator
  notesTopic={notesTopic}
  setNotesTopic={setNotesTopic}
  generateNotes={generateNotes}
  notes={notes}
/>

</div>     

);
}

export default App;