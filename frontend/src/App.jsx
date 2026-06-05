import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "40px",
        fontFamily: "Arial",
      }}
    >
      <h1>🎓 EduAgent AI</h1>

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

      {roadmap?.error && (
        <div>
          <h2>Error</h2>
          <p>{roadmap.error}</p>
        </div>
      )}

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

              <ul
  style={{
    textAlign: "left",
    maxWidth: "700px",
    margin: "0 auto",
  }}
>
  {week.topics.map((topic, index) => (
    <li key={index}>{topic}</li>
  ))}
</ul>
            </div>
          ))}

          <div
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            <h3>Projects</h3>

            <ul>
              {roadmap.projects?.map((project, index) => (
                <li key={index}>{project}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;