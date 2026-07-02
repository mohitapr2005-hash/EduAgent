import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import MyCourses from "./pages/MyCourses";
import { AuthContext } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {

  const { user } = useContext(AuthContext);

  return (
    <Routes>

      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <Login />}
      />

      <Route
        path="/signup"
        element={user ? <Navigate to="/" /> : <Signup />}
      />

      <Route
        path="/"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/my-courses" element={<MyCourses />} />
    </Routes>
  );

}

export default App;