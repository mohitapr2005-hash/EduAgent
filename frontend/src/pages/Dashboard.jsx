
import VideoPlayer from "../components/VideoPlayer";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CourseGenerator from "../components/CourseGenerator";
import Roadmap from "../components/Roadmap";
import AITutor from "../components/AITutor";
import QuizGenerator from "../components/QuizGenerator";
import NotesGenerator from "../components/NotesGenerator";
import TrendingCourses from "../components/TrendingCourses";
import ProgressCard from "../components/ProgressCard";
import Hero from "../components/Hero";
import {
  generateCourseAPI,
  askDoubtAPI,
  generateQuizAPI,
  generateNotesAPI,
  generateWeekLessonAPI,
  generateVideoAPI,
} from "../services/api";

function Dashboard() {


const [selectedWeek, setSelectedWeek] = useState(null);

const [lesson, setLesson] = useState(null);
const [lessonLoading, setLessonLoading] = useState(false);

const [videoUrl, setVideoUrl] = useState("");
const [videoLoading, setVideoLoading] = useState(false);

const [topic, setTopic] = useState("");
const [roadmap, setRoadmap] = useState(null);
const [courseId, setCourseId] = useState(null);
const [completedWeek, setCompletedWeek] = useState(0);
const [loading, setLoading] = useState(false);

const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");

const [quizTopic, setQuizTopic] = useState("");
const [quiz, setQuiz] = useState(null);

const [selectedAnswers, setSelectedAnswers] = useState({});
const [score, setScore] = useState(null);

const [notesTopic, setNotesTopic] = useState("");
const [notes, setNotes] = useState("");


useEffect(() => {

  const savedRoadmap = localStorage.getItem("selectedRoadmap");

  if (savedRoadmap) {

    setRoadmap(JSON.parse(savedRoadmap));

    localStorage.removeItem("selectedRoadmap");

  }

}, []);

const generateCourse = async () => {

    if (!topic.trim()) {
        alert("Please enter a topic");
        return;
    }

    try {

        setLoading(true);

        console.log("Calling backend...");

        const data = await generateCourseAPI(topic);

        console.log("DATA FROM BACKEND:", data);

        setCourseId(data.course_id);

        setRoadmap(data.roadmap);

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

const generateVideo = async (week) => {
  try {
    setVideoLoading(true);

    console.log("Generating video for:", topic, week);

    const data = await generateVideoAPI(topic, week);

    console.log("Backend Response:", data);

    if (data.success) {
      console.log("Video URL:", data.video_url);
      setVideoUrl(data.video_url);
    } else {
      alert("Video generation failed");
    }

  } catch (error) {
    console.error(error);
    alert("Failed to generate video");
  } finally {
    setVideoLoading(false);
  }
};

console.log("Current videoUrl:", videoUrl);
return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

    <Navbar />

    <Hero />

    <div className="max-w-7xl mx-auto px-6">

        <CourseGenerator
            topic={topic}
            setTopic={setTopic}
            generateCourse={generateCourse}
            loading={loading}
        />

        <TrendingCourses
    setTopic={setTopic}
    generateCourse={generateCourse}
/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            {/* LEFT */}

            <div>

<Roadmap
    roadmap={roadmap}
    courseId={courseId}
    completedWeek={completedWeek}
    setCompletedWeek={setCompletedWeek}
    lesson={lesson}
    selectedWeek={selectedWeek}
    generateWeekLesson={generateWeekLesson}
    generateVideo={generateVideo}
/>

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

                <VideoPlayer
    videoUrl={videoUrl}
    loading={videoLoading}
/>

                <AITutor
                    question={question}
                    setQuestion={setQuestion}
                    askDoubt={askDoubt}
                    answer={answer}
                />

                <ProgressCard
    roadmap={roadmap}
    completedWeek={completedWeek}
    courseId={courseId}
/>

            </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

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

            <NotesGenerator
                notesTopic={notesTopic}
                setNotesTopic={setNotesTopic}
                generateNotes={generateNotes}
                notes={notes}
            />

        </div>

    </div>

</div>
);
}

export default Dashboard;