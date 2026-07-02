import { auth } from "../firebase/firebase";
const BASE_URL = "http://127.0.0.1:8000";

export const generateCourseAPI = async (topic) => {

  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not logged in");
  }

  const token = await user.getIdToken();

  const response = await fetch(`${BASE_URL}/generate-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      topic
    }),
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


export const getMyCoursesAPI = async () => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch("http://127.0.0.1:8000/my-courses", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const getCourseAPI = async (courseId) => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(
    `${BASE_URL}/course/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};


export const completeWeekAPI = async (courseId, week) => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(`${BASE_URL}/complete-week`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      course_id: courseId,
      completed_week: week,
    }),
  });

  return await response.json();
};

export const getProgressAPI = async (courseId) => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(
    `${BASE_URL}/progress/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

export const downloadCertificateAPI = async (courseId) => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(
    `${BASE_URL}/certificate/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail);
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = "EduAgent_Certificate.pdf";

  document.body.appendChild(a);

  a.click();

  a.remove();

  window.URL.revokeObjectURL(url);
};