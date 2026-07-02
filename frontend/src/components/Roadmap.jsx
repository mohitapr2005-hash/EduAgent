import { completeWeekAPI } from "../services/api";

function Roadmap({
  roadmap,
  courseId,
  completedWeek,
  setCompletedWeek,
  lesson,
  selectedWeek,
  generateWeekLesson,
  generateVideo,
}) {
  if (!roadmap?.weeks) return null;

const markComplete = async (week) => {

    try {

        await completeWeekAPI(courseId, week);

        setCompletedWeek(week);

        alert(`Week ${week} completed! 🎉`);

    } catch (error) {

        console.error(error);

        alert("Failed to save progress");

    }

};

  return (
    <>
      <div className="mb-8">

        <h1 className="text-4xl font-extrabold mb-2">
          📚 {roadmap.title}
        </h1>

        <p className="text-gray-400 text-lg">
          Duration: {roadmap.duration}
        </p>

      </div>

      {roadmap.weeks.map((week) => (

        <div
          key={week.week}
          className="bg-slate-900 border border-slate-700 rounded-3xl p-8 mb-6 shadow-xl hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all duration-300"
        >

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                📘 Week {week.week}
              </h2>

              <p className="text-gray-400 mt-2">
                {week.title || "AI Generated Lesson"}
              </p>

            </div>

            <div className="bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              {week.topics.length} Topics
            </div>

          </div>

          <div className="mt-6">

            <ul className="space-y-3">

              {week.topics.map((topic, index) => (

                <li
                  key={index}
                  className="text-gray-300"
                >
                  ✅ {topic}
                </li>

              ))}

            </ul>

          </div>

         <div className="flex gap-4 mt-8">

    <button
      onClick={() => generateWeekLesson(week.week)}
      className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl font-semibold transition"
    >
      📖 Read Lesson
    </button>

    <button
      onClick={() => generateVideo(week.week)}
      className="flex-1 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
    >
      ▶ Watch Video
    </button>

    <button
      onClick={() => markComplete(week.week)}
      className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-xl font-semibold transition"
    >
      ✅ Mark Complete
    </button>

</div>

          {selectedWeek === week.week && lesson && (

            <div className="mt-8 border-t border-slate-700 pt-8">

              <h2 className="text-3xl font-bold mb-2">
                {lesson.title}
              </h2>

              <p className="text-cyan-400 mb-6">
                ⏱ {lesson.duration}
              </p>

              <div className="space-y-8">

                <div>

                  <h3 className="text-xl font-bold mb-3">
                    🎯 Learning Outcomes
                  </h3>

                  <ul className="space-y-2">

                    {lesson.learning_outcomes?.map((item, index) => (

                      <li key={index}>
                        ✅ {item}
                      </li>

                    ))}

                  </ul>

                </div>

                <div>

                  <h3 className="text-xl font-bold mb-3">
                    📚 Lesson
                  </h3>

                  <p className="whitespace-pre-wrap leading-8 text-gray-300">
                    {lesson.lesson}
                  </p>

                </div>

                <div>

                  <h3 className="text-xl font-bold mb-3">
                    💡 Examples
                  </h3>

                  <ul className="space-y-2">

                    {lesson.examples?.map((item, index) => (

                      <li key={index}>
                        🔹 {item}
                      </li>

                    ))}

                  </ul>

                </div>

                <div>

                  <h3 className="text-xl font-bold mb-3">
                    📝 Assignment
                  </h3>

                  <ul className="space-y-2">

                    {lesson.assignment?.map((item, index) => (

                      <li key={index}>
                        📌 {item}
                      </li>

                    ))}

                  </ul>

                </div>

                <div>

                  <h3 className="text-xl font-bold mb-3">
                    📌 Summary
                  </h3>

                  <p className="text-gray-300 leading-8">
                    {lesson.summary}
                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      ))}

    </>
  );
}

export default Roadmap; 