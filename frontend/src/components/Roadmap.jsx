function Roadmap({
  roadmap,
  lesson,
  selectedWeek,
  generateWeekLesson,
}) {
  if (!roadmap?.weeks) return null;

  return (
    <>
      <h2 className="text-3xl font-bold mt-8 mb-2">
        {roadmap.title}
      </h2>

      <p className="mb-6">
        <strong>Duration:</strong> {roadmap.duration}
      </p>

      {roadmap.weeks.map((week) => (
        <div
          key={week.week}
          className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl shadow-xl mb-4"
        >
          <h3 className="text-xl font-bold">
            Week {week.week}
          </h3>

          <ul className="list-disc ml-6 mt-3">
            {week.topics.map((topic, index) => (
              <li key={index}>{topic}</li>
            ))}
          </ul>

          <button
            onClick={() => generateWeekLesson(week.week)}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
          >
            📖 Open Lesson
          </button>

          {selectedWeek === week.week && lesson && (
            <div className="bg-slate-700 p-6 rounded-xl mt-4">

              <h2 className="text-2xl font-bold">
                {lesson.title}
              </h2>

              <p>{lesson.duration}</p>

              <h3 className="mt-4 font-bold">
                Learning Outcomes
              </h3>

              <ul>
                {lesson.learning_outcomes?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="mt-4 font-bold">
                Lesson
              </h3>

              <p className="whitespace-pre-wrap">
                {lesson.lesson}
              </p>

              <h3 className="mt-4 font-bold">
                Examples
              </h3>

              <ul>
                {lesson.examples?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="mt-4 font-bold">
                Assignment
              </h3>

              <ul>
                {lesson.assignment?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="mt-4 font-bold">
                Summary
              </h3>

              <p>{lesson.summary}</p>

            </div>
          )}

        </div>
      ))}
    </>
  );
}

export default Roadmap;