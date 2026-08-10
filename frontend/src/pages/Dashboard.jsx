import ChatHistory from "../components/ChatHistory";
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
import toast from "react-hot-toast";

import LearningAnalytics from "../components/LearningAnalytics";
import {
  generateCourseAPI,
  askDoubtAPI,
  generateQuizAPI,
  generateNotesAPI,
  generateWeekLessonAPI,
  generateVideoAPI,
  saveChatAPI,
  getChatHistoryAPI,
  deleteChatAPI,
  downloadCertificateAPI,
  getProgressAPI
} from "../services/api";
import { auth } from "../firebase/firebase";



function Dashboard() {

const downloadCertificate = async () => {

    try {

    setCertificateLoading(true);

    await downloadCertificateAPI(topic);
toast.success("Certificate downloaded successfully 🏆");

    } catch (err) {

    console.error(err);

    toast.error("Failed to download certificate");

} finally {

    setCertificateLoading(false);

}

};

const deleteChat = async (chatId) => {

    try {

        await deleteChatAPI(chatId);

        const chats = await getChatHistoryAPI();

        setChatHistory(chats);

    } catch (err) {

        console.error(err);

    }

};

// const [stats, setStats] = useState(null);

// useEffect(() => {

//     const loadStats = async () => {

//         const user = auth.currentUser;

//         if (!user) return;

//         const data = await getStats(user.uid);

//         setStats(data);

//     };

//     loadStats();

// }, []);
const [selectedWeek, setSelectedWeek] = useState(null);
const [chatHistory, setChatHistory] = useState([]);
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
const [tutorLoading, setTutorLoading] = useState(false);
const [quizLoading, setQuizLoading] = useState(false);
const [notesLoading, setNotesLoading] = useState(false);
const [certificateLoading, setCertificateLoading] = useState(false);
const [showHistory, setShowHistory] = useState(false);


useEffect(() => {

    const roadmap = localStorage.getItem("selectedRoadmap");
    const courseId = localStorage.getItem("selectedCourseId");
    const completed = localStorage.getItem("completedWeek");

    if (roadmap) {

        setRoadmap(JSON.parse(roadmap));

        setCourseId(Number(courseId));

        setCompletedWeek(Number(completed));

        localStorage.removeItem("selectedRoadmap");
        localStorage.removeItem("selectedCourseId");
        localStorage.removeItem("completedWeek");
    }

}, []);

useEffect(() => {
    console.log("completedWeek =", completedWeek);
}, [completedWeek]);

const generateCourse = async () => {

    if (!topic.trim()) {
    toast.error("Please enter a topic");
    return;
}

    try {

        setLoading(true);

        console.log("Calling backend...");

        const data = await generateCourseAPI(topic);

        window.dispatchEvent(
    new Event("ai-usage-updated")
);

        console.log("DATA FROM BACKEND:", data);

        setCourseId(data.course_id);

const progress = await getProgressAPI(data.course_id);

setCompletedWeek(progress.completed_week);

setRoadmap(data.roadmap);
        
        toast.success("Course generated successfully 🎉");

    } catch (error) {

        console.error(error);

        
        toast.error("Something went wrong");

    } finally {

        setLoading(false);

    }

};
useEffect(() => {

    const loadHistory = async () => {

        try {

            const chats = await getChatHistoryAPI();

            setChatHistory(chats);

        } catch (err) {

            console.error(err);

        }

    };

    loadHistory();

}, []);

const askDoubt = async () => {

    if (!question.trim()) {
    toast.error("Please enter a question");
    return;
}

    try {

    setTutorLoading(true);

    const data = await askDoubtAPI(question);

        setAnswer(data.answer);
        toast.success("Answer generated 🤖");
        window.dispatchEvent(new Event("ai-usage-updated"));
        await saveChatAPI(
    question,
    data.answer
);

const chats = await getChatHistoryAPI();

setChatHistory(chats);

    } catch (error) {

    console.error(error);

    toast.error("Failed to get answer");

} finally {

    setTutorLoading(false);

}

};

const generateQuiz = async () => {

    if (!quizTopic.trim()) {
       toast.error("Please enter a topic");

        return;
    }

    try {

    setQuizLoading(true);

    const data = await generateQuizAPI(quizTopic);

        if (data.error) {
            toast.error(data.error);
            return;
        }

        window.dispatchEvent(
    new Event("ai-usage-updated")
);
        setQuiz(data);
        setSelectedAnswers({});
        setScore(null);
        toast.success("Quiz generated successfully 📝");

    } catch (error) {

    console.error(error);

    toast.error("Failed to generate quiz");

} finally {

    setQuizLoading(false);

}

};

const generateNotes = async () => {

    if (!notesTopic.trim()) {
        toast.error("Please enter a topic");
        return;
    }

    try {

    setNotesLoading(true);

    const data = await generateNotesAPI(notesTopic);

       setNotes(data.notes);
       window.dispatchEvent(
    new Event("ai-usage-updated")
);
toast.success("Notes generated successfully 📚");

    } catch (error) {

    console.error(error);

    toast.error("Failed to generate notes");

} finally {

    setNotesLoading(false);

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

        console.log("========== READ BUTTON CLICKED ==========");
        console.log("Topic:", topic);
        console.log("Week:", week);

        const data = await generateWeekLessonAPI(topic, week);

        console.log("Backend Response:", data);

        if (data.error) {
            console.log("RAW RESPONSE:", data.raw);
            toast.error(data.error);
            return;
        }

        setSelectedWeek(week);
        setLesson(data);
        window.dispatchEvent(
    new Event("ai-usage-updated")
);

        toast.success(`Week ${week} lesson generated 🎓`);

    } catch (error) {

        console.error("ERROR:", error);

        toast.error("Failed to generate lesson");

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
      window.dispatchEvent(
    new Event("ai-usage-updated")
);
toast.success("Video generated successfully 🎥");
    } else {
      toast.error("Video generation failed");
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to generate video");
  } finally {
    setVideoLoading(false);
  }
};


return (
<div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

    <Navbar />
    <button
  onClick={() => setShowHistory(true)}
  className="fixed bottom-8 right-8 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full w-16 h-16 shadow-xl text-3xl z-50"
>
  💬
</button>

    <div id="dashboard">
  <Hero />
</div>
    <div className="mt-10">

    <ProgressCard
        roadmap={roadmap}
        completedWeek={completedWeek}
        courseId={courseId}
    />
    <div className="mt-4 flex justify-center">

    <button
    onClick={downloadCertificate}
    disabled={certificateLoading}
    className="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold px-6 py-3 rounded-xl transition"
>
    {certificateLoading
        ? "🏆 Downloading..."
        : "🏆 Download Certificate"}
</button>

</div>
{/* <LearningAnalytics stats={stats} /> */}

</div>

    <div className="max-w-7xl mx-auto px-6">

        <div id="courses">
  <CourseGenerator
    topic={topic}
    setTopic={setTopic}
    generateCourse={generateCourse}
    loading={loading}
  />
</div>

        <TrendingCourses
    setTopic={setTopic}
    generateCourse={generateCourse}
/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8 items-stretch">

            {/* LEFT */}

            <div>

<Roadmap
    roadmap={roadmap}
    courseId={courseId}
    completedWeek={completedWeek}
    setCompletedWeek={setCompletedWeek}
    lesson={lesson}
    setLesson={setLesson}
    selectedWeek={selectedWeek}
    setSelectedWeek={setSelectedWeek}
    generateWeekLesson={generateWeekLesson}
    generateVideo={generateVideo}
    lessonLoading={lessonLoading}
/>

            </div>

            {/* RIGHT */}

            <div className="space-y-6">

                <VideoPlayer
    videoUrl={videoUrl}
    loading={videoLoading}
/>

{showHistory && (
    <div className="fixed top-0 right-0 h-full w-[500px] bg-slate-900 border-l border-slate-700 shadow-2xl z-50">

        <div className="flex justify-between items-center p-5 border-b border-slate-700">

            <h2 className="text-2xl font-bold">
                💬 Previous Chats
            </h2>

            <button
                onClick={() => setShowHistory(false)}
                className="text-2xl hover:text-red-500"
            >
                ✖
            </button>

        </div>

        <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">

            <ChatHistory
                chatHistory={chatHistory}
                setQuestion={setQuestion}
                setAnswer={setAnswer}
                deleteChat={deleteChat}
            />

        </div>

    </div>
)}


                

            </div>

                </div>

        {/* AI Assistant */}

        <div id="ai-tutor" className="mt-16 mb-16">

            <h2 className="text-3xl font-bold">
                🤖 AI Assistant
            </h2>

            <p className="text-slate-400 mt-2 mb-6">
                Ask anything about your course, roadmap or interview preparation.
            </p>

            <AITutor
    question={question}
    setQuestion={setQuestion}
    askDoubt={askDoubt}
    answer={answer}
    loading={tutorLoading}
/>

        </div>

        <div className="h-full bg-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col">
            <div id="quiz"></div>
            <QuizGenerator
    quizTopic={quizTopic}
    setQuizTopic={setQuizTopic}
    generateQuiz={generateQuiz}
    quiz={quiz}
    selectedAnswers={selectedAnswers}
    setSelectedAnswers={setSelectedAnswers}
    submitQuiz={submitQuiz}
    score={score}
    loading={quizLoading}
/>

            <NotesGenerator
    notesTopic={notesTopic}
    setNotesTopic={setNotesTopic}
    generateNotes={generateNotes}
    notes={notes}
    loading={notesLoading}
/>


        </div>

            {/* Footer */}

<footer className="relative mt-24 overflow-hidden border-t border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900 to-black">

  {/* Background Blur */}
  <div className="absolute -top-24 left-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
  <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-purple-600/10 blur-3xl"></div>

  <div className="relative max-w-7xl mx-auto px-6 py-16">

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

      {/* Brand */}
      <div>

        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          ⚡ EduAgent AI
        </h2>

        <p className="text-slate-400 leading-8 mt-5">
          EduAgent AI is your intelligent learning companion that
          creates personalized AI roadmaps, quizzes, interview
          preparation, notes, coding practice and much more.
        </p>

        <div className="flex gap-4 mt-8">

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-cyan-500 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
          >
            🐙
          </a>

          <a
            href="#"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
          >
            💼
          </a>

          <a
            href="mailto: wildvue.2026@gmail.com"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-red-500 flex items-center justify-center text-xl transition-all duration-300 hover:scale-110"
          >
            ✉️
          </a>

        </div>

      </div>

      {/* Quick Links */}
      <div>

        <h3 className="text-xl font-bold mb-6 text-white">
          Quick Links
        </h3>

        <ul className="space-y-4">

          <li>
            <a href="#dashboard" className="text-slate-400 hover:text-cyan-400 transition-all hover:translate-x-2 inline-block">
              🏠 Dashboard
            </a>
          </li>

          <li>
            <a href="#courses" className="text-slate-400 hover:text-cyan-400 transition-all hover:translate-x-2 inline-block">
              📚 AI Courses
            </a>
          </li>

          <li>
            <a href="#ai-tutor" className="text-slate-400 hover:text-cyan-400 transition-all hover:translate-x-2 inline-block">
              🤖 AI Tutor
            </a>
          </li>

          <li>
            <a href="#quiz" className="text-slate-400 hover:text-cyan-400 transition-all hover:translate-x-2 inline-block">
              📝 Quiz & Notes
            </a>
          </li>

          <li>
            <a href="#dashboard" className="text-slate-400 hover:text-cyan-400 transition-all hover:translate-x-2 inline-block">
              ⬆ Back To Top
            </a>
          </li>

        </ul>

      </div>

      {/* Features */}
      <div>

        <h3 className="text-xl font-bold mb-6 text-white">
          Features
        </h3>

        <ul className="space-y-4 text-slate-400">

          <li>✨ AI Course Generator</li>

          <li>📚 Smart Notes</li>

          <li>🤖 AI Tutor</li>

          <li>📝 AI Quiz Generator</li>

          <li>🎥 AI Video Lessons</li>

          <li>💻 Coding Practice</li>

          <li>📄 Resume Analyzer</li>

          <li>🎯 Interview Preparation</li>

        </ul>

      </div>

      {/* Contact */}
      <div>

        <h3 className="text-xl font-bold mb-6 text-white">
          Contact Us
        </h3>

        <div className="space-y-5">

          <a
            href="mailto:wildvue.2026@gmail.com"
            className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
          >
            📧 wildvue.2026@gmail.com
          </a>

          <a
            href="tel:+918449369008"
            className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 transition"
          >
            📱 +91 8449369008
          </a>

          <p className="flex items-center gap-3 text-slate-400">
            📍 Greater Noida, Uttar Pradesh
          </p>

          <p className="flex items-center gap-3 text-slate-400">
            🕒 Mon - Sat | 9:00 AM - 7:00 PM
          </p>

        </div>

      </div>

    </div>

    {/* Divider */}

    <div className="border-t border-slate-800 mt-14 pt-8">

      <div className="flex flex-col md:flex-row items-center justify-between gap-5">

        <p className="text-slate-500 text-center md:text-left">
          © 2026 <span className="text-cyan-400 font-semibold">EduAgent AI</span>. All Rights Reserved.
        </p>

        <p className="text-slate-500 text-center">
          Designed & Developed with ❤️ by
          <span className="text-white font-semibold"> Mohit Verma</span>
        </p>

      </div>

    </div>

  </div>

</footer>

    </div>

</div>
);
}

export default Dashboard;