import { useEffect, useState } from "react";
import { getMyCoursesAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { getCourseAPI } from "../services/api";

function MyCourses() {

  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    async function loadCourses() {

      try {

        const data = await getMyCoursesAPI();

        setCourses(data);

      } catch (error) {

        console.error(error);

      }

    }

    loadCourses();

  }, []);

const openCourse = async (course) => {

  try {

    const roadmap = await getCourseAPI(course.id);

    localStorage.setItem(
      "selectedRoadmap",
      JSON.stringify(roadmap)
    );

    navigate("/");

  } catch (err) {

    console.error(err);

    alert("Unable to load course");

  }

};
  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Courses
      </h1>

      {courses.map(course => (

        <div
  key={course.id}
  onClick={() => openCourse(course)}
  className="bg-slate-800 p-5 rounded-xl mb-4 cursor-pointer hover:bg-slate-700 transition"
>

          <h2 className="text-xl font-bold">
            {course.title}
          </h2>

          <p>{course.description}</p>

        </div>

      ))}

    </div>

  );

}

export default MyCourses;