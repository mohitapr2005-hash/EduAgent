import Analytics from "./pages/Analytics";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import { AuthContext } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyCourses from "./pages/MyCourses";
import StudyPlanner from "./pages/StudyPlanner";
import Interview from "./pages/Interview";
import InterviewHistory from "./pages/InterviewHistory";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import CodingInterview from "./pages/CodingInterview";
import Profile from "./pages/Profile";
import VirtualLab from "./pages/VirtualLab";
import CPUScheduling from "./pages/CPUScheduling";
import PageReplacement from "./pages/PageReplacement";
import MemoryAllocation from "./pages/MemoryAllocation";
import DeadlockDetection from "./pages/DeadlockDetection";
import DiskScheduling from "./pages/DiskScheduling";
import BankersAlgorithm from "./pages/BankersAlgorithm";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
    
      <Routes>
        {/* Authentication */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/profile" element={<Profile />} />

<Route
    path="/analytics"
    element={<Analytics />}
/>
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <Signup />}
        />

        {/* Dashboard */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" />}
        />

        {/* Main Pages */}
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/study-planner" element={<StudyPlanner />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interview-history" element={<InterviewHistory />} />
        <Route path="/coding-interview" element={<CodingInterview />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/profile" element={<Profile />} />

        {/* Virtual Lab */}
        <Route path="/virtual-lab" element={<VirtualLab />} />
        <Route
          path="/virtual-lab/cpu-scheduling"
          element={<CPUScheduling />}
        />
        <Route
          path="/virtual-lab/page-replacement"
          element={<PageReplacement />}
        />
        <Route
          path="/virtual-lab/disk-scheduling"
          element={<DiskScheduling />}
        />
        <Route
          path="/virtual-lab/bankers-algorithm"
          element={<BankersAlgorithm />}
        />
        <Route
          path="/virtual-lab/memory-allocation"
          element={<MemoryAllocation />}
        />
        <Route
          path="/virtual-lab/deadlock-detection"
          element={<DeadlockDetection />}
        />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0f172a",
            color: "#fff",
            border: "1px solid #334155",
            borderRadius: "12px",
          },
        }}
      />
    </>
  );
}

export default App;