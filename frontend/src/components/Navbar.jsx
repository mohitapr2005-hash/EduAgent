import { logout } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await logout();

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Logout failed");

    }

  };

  return (

    <div className="flex justify-between items-center px-10 py-6">

      <div>

        <h1 className="text-5xl font-extrabold">
          🎓 EduAgent AI
        </h1>

        <p className="text-gray-300 mt-2">
          AI-Powered Learning Platform
        </p>

      </div>

      <div className="flex gap-4">

  <Link
    to="/"
    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold"
  >
    Dashboard
  </Link>

  <Link
    to="/my-courses"
    className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-semibold"
  >
    My Courses
  </Link>

  <button
    onClick={handleLogout}
    className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold"
  >
    Logout
  </button>

</div>

    </div>

  );

}

export default Navbar;