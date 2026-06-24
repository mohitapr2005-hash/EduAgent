const courses = [
  "Operating System",
  "Data Structures",
  "Java",
  "Python",
  "Machine Learning",
  "DBMS",
  "Computer Networks",
  "UPSC Polity",
];

function TrendingCourses({ setTopic, generateCourse }) {
  return (
    <div className="max-w-6xl mx-auto mt-10">

      <h2 className="text-2xl font-bold mb-6 text-white">
        🔥 Trending Courses
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {courses.map((course) => (

          <button
            key={course}
            onClick={() => {
              setTopic(course);
              setTimeout(generateCourse, 100);
            }}
            className="bg-slate-800 hover:bg-cyan-600 transition-all duration-300 rounded-2xl p-5 text-lg font-semibold shadow-lg hover:scale-105"
          >
            {course}
          </button>

        ))}

      </div>

    </div>
  );
}

export default TrendingCourses;