import { useState } from "react";

function App() {
const [topic, setTopic] = useState("");
const [roadmap, setRoadmap] = useState(null);
const [loading, setLoading] = useState(false);

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");

const [quizTopic, setQuizTopic] = useState("");
const [quiz, setQuiz] = useState(null);

const [selectedAnswers, setSelectedAnswers] = useState({});
const [score, setScore] = useState(null);

const generateCourse = async () => {
if (!topic.trim()) {
alert("Please enter a topic");
return;
}

```
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
```

};

const askDoubt = async () => {
if (!question.trim()) {
alert("Please enter a question");
return;
}

```
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
```

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


return (
<div
style={{
maxWidth: "1000px",
margin: "0 auto",
padding: "40px",
fontFamily: "Arial",
}}
> <h1>🎓 EduAgent AI</h1>

```
  <div style={{ marginBottom: "20px" }}>
    <input
      type="text"
      placeholder="Enter Topic (e.g. Operating Systems)"
      value={topic}
      onChange={(e) => setTopic(e.target.value)}
      style={{
        padding: "10px",
        width: "300px",
        marginRight: "10px",
      }}
    />

    <button
      onClick={generateCourse}
      disabled={loading}
      style={{
        padding: "10px 20px",
        cursor: "pointer",
      }}
    >
      {loading ? "Generating..." : "Generate Course"}
    </button>
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
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "10px",
          }}
        >
          <h3>Week {week.week}</h3>

          <ul style={{ textAlign: "left" }}>
            {week.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  )}

  <hr style={{ margin: "40px 0" }} />

  <h2>🤖 Ask AI Tutor</h2>

  <input
    type="text"
    placeholder="Ask any question..."
    value={question}
    onChange={(e) => setQuestion(e.target.value)}
    style={{
      padding: "10px",
      width: "400px",
      marginRight: "10px",
    }}
  />

  <button onClick={askDoubt}>
    Ask AI
  </button>

  {answer && (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "left",
        whiteSpace: "pre-wrap",
      }}
    >
      <h3>Answer</h3>
      {answer}
    </div>
  )}

  <hr style={{ margin: "40px 0" }} />

  <h2>📝 Quiz Generator</h2>

  <input
    type="text"
    placeholder="Enter Topic"
    value={quizTopic}
    onChange={(e) => setQuizTopic(e.target.value)}
    style={{
      padding: "10px",
      width: "300px",
      marginRight: "10px",
    }}
  />

  <button onClick={generateQuiz}>
    Generate Quiz
  </button>

 {quiz?.questions && (
  <div style={{ marginTop: "20px" }}>
    {quiz.questions.map((q, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "15px",
          borderRadius: "10px",
        }}
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
  <h2>
    Your Score: {score}/{quiz.questions.length}
  </h2>
)}

</div>
);
}

export default App;