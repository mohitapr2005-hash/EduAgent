import { logout } from "../services/auth";
import { useNavigate } from "react-router-dom";

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

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 px-5 py-3 rounded-lg font-semibold"
      >
        Logout
      </button>

    </div>

  );

}

export default Navbar;