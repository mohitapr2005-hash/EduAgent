import { useState } from "react";

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

  const response = await fetch(
    "http://127.0.0.1:8000/generate-course",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
      }),
    }
  );

  const data = await response.json();

  console.log(data);
  setRoadmap(data);
} catch (error) {
  console.error(error);
  alert("Something went wrong");
} finally {
  setLoading(false);
}


};

const askDoubt = async () => {
  console.log("Ask AI button clicked");

  if (!question.trim()) {
    alert("Please enter a question");
    return;
  }

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/ask-doubt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      }
    );

    const data = await response.json();

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
    const response = await fetch(
      "http://127.0.0.1:8000/generate-quiz",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: quizTopic,
        }),
      }
    );

    const data = await response.json();

    console.log("QUIZ DATA:", data);

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
    const response = await fetch(
      "http://127.0.0.1:8000/generate-notes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: notesTopic,
        }),
      }
    );

    const data = await response.json();

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
    console.log("Open Lesson clicked", week);

    setLessonLoading(true);

    const response = await fetch(
      "http://127.0.0.1:8000/generate-week",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          week,
        }),
      }
    );

    const data = await response.json();

    console.log("Lesson Data:", data);

    if (data.error) {
      alert(data.error);
      return;
    }

    setSelectedWeek(week);
setLesson(data);
  } catch (error) {
    console.error("Lesson Error:", error);
    alert("Failed to generate lesson");
  } finally {
    setLessonLoading(false);
  }
}; 


return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white p-10">
  
<h1 className="text-6xl font-extrabold text-center mt-6 mb-4">
  🎓 EduAgent AI
</h1>

<p className="text-center text-gray-300 mb-10">
  AI-Powered Learning Platform
</p>


<div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
  <h2 className="text-2xl font-bold mb-4">
    🎓 Course Generator
  </h2>

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Enter Topic (e.g. Operating Systems)"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
    />

    <button
      onClick={generateCourse}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
    >
      {loading ? "Generating..." : "Generate Course"}
    </button>
  </div>
</div>




  {roadmap?.weeks && (
    <>
      <h2>{roadmap.title}</h2>

      <p>
        <strong>Duration:</strong> {roadmap.duration}
      </p>

    {roadmap.weeks.map((week) => (
  <div
    key={week.week}
    className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-4"
  >
          <h3>Week {week.week}</h3>

          
           <button
  onClick={() => generateWeekLesson(week.week)}
  className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
>
  📖 Open Lesson
</button>

{selectedWeek === week.week && lesson && (
  <div className="bg-slate-700 p-6 rounded-xl mt-4">

    <h2 className="text-2xl font-bold">
      {lesson.title}
    </h2>

    <p>{lesson.duration}</p>

    <h3>Learning Outcomes</h3>

    <ul>
      {lesson.learning_outcomes?.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h3>Lesson</h3>

    <p className="whitespace-pre-wrap">
      {lesson.lesson}
    </p>

    <h3>Examples</h3>

    <ul>
      {lesson.examples?.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h3>Assignment</h3>

    <ul>
      {lesson.assignment?.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>

    <h3>Summary</h3>

    <p>{lesson.summary}</p>

  </div>
)}
<ul className="list-disc ml-6 mt-3">
            {week.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )}



<div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
  <h2 className="text-2xl font-bold mb-4">
    🤖 AI Tutor
  </h2>

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Ask any question..."
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
    />

    <button
      onClick={askDoubt}
      className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
    >
      Ask AI
    </button>
  </div>

  {answer && (
    <div className="mt-6 bg-slate-900 p-4 rounded-lg">
      <h3 className="font-bold mb-2">Answer</h3>
      <p className="whitespace-pre-wrap">{answer}</p>
    </div>
  )}
</div>



  <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
  <h2 className="text-2xl font-bold mb-4">
    📝 Quiz Generator
  </h2>

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Enter Topic"
      value={quizTopic}
      onChange={(e) => setQuizTopic(e.target.value)}
      className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
    />

    <button
      onClick={generateQuiz}
      className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
    >
      Generate Quiz
    </button>
  </div>

  {quiz?.questions && (
    <div className="mt-6">
      {/* keep your existing quiz.questions.map(...) code here */}
    </div>
  )}
</div>

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

{quiz && (
  <button
    onClick={submitQuiz}
    style={{
      padding: "10px 20px",
      marginTop: "20px",
    }}
  >
    Submit Quiz
  </button>
)}

{score !== null && quiz && (
  <div className="bg-green-600 text-white text-center text-2xl font-bold p-4 rounded-2xl mt-6">
  🎉 Your Score: {score}/{quiz.questions.length}
</div>
)}


<div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-8">
  <h2 className="text-2xl font-bold mb-4">
    📚 Notes Generator
  </h2>

  <div className="flex gap-4">
    <input
      type="text"
      placeholder="Enter Topic"
      value={notesTopic}
      onChange={(e) => setNotesTopic(e.target.value)}
      className="flex-1 p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
    />

    <button
      onClick={generateNotes}
      className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold"
    >
      Generate Notes
    </button>
  </div>

  {notes && (
    <div className="mt-6 bg-slate-900 p-4 rounded-lg whitespace-pre-wrap">
      {notes}
    </div>
  )}

  </div>   

</div>     

);
}

export default App;