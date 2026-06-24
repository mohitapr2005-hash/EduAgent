const BASE_URL = "http://127.0.0.1:8000";

// Generate Course
export const generateCourseAPI = async (topic) => {
  const response = await fetch(`${BASE_URL}/generate-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  return await response.json();
};

// Ask AI Tutor
export const askDoubtAPI = async (question) => {
  const response = await fetch(`${BASE_URL}/ask-doubt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question }),
  });

  return await response.json();
};

// Generate Quiz
export const generateQuizAPI = async (topic) => {
  const response = await fetch(`${BASE_URL}/generate-quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  return await response.json();
};

// Generate Notes
export const generateNotesAPI = async (topic) => {
  const response = await fetch(`${BASE_URL}/generate-notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  return await response.json();
};

// Generate Week Lesson
export const generateWeekLessonAPI = async (topic, week) => {
  const response = await fetch(`${BASE_URL}/generate-week`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      week,
    }),
  });


  return await response.json();
};

// Generate Video
export const generateVideoAPI = async (topic, week) => {

  const response = await fetch(`${BASE_URL}/generate-video`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      topic,
      week,
    }),
  });

  return await response.json();
};

