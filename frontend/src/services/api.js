import axios from "axios";
import { auth } from "../firebase/firebase";

const BASE_URL = "https://eduagent-ugdl.onrender.com";

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

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${BASE_URL}/ask-doubt`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            question
        })

    });

    return await response.json();

};

// Generate Quiz
export const generateQuizAPI = async (topic) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${BASE_URL}/generate-quiz`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
            topic
        }),
    });

    return await response.json();

};

// Generate Notes
export const generateNotesAPI = async (topic) => {
  const token = await auth.currentUser.getIdToken();
  const response = await fetch(`${BASE_URL}/generate-notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ topic }),
  });

  return await response.json();
};

// Generate Week Lesson
export const generateWeekLessonAPI = async (topic, week) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${BASE_URL}/generate-week`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            topic,
            week
        }),
    });

    return await response.json();
};

// Generate Video
export const generateVideoAPI = async (topic, week) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${BASE_URL}/generate-video`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            topic,
            week
        }),
    });

    return await response.json();
};


export const getMyCoursesAPI = async () => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch("https://eduagent-ugdl.onrender.com/my-courses", {
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

    const data = await response.json();

    console.log("Complete Week Response:", data);

    return data;
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
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail);
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

export const generateStudyPlanAPI = async (
  topic,
  hoursPerDay,
  targetDays
) => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(
    `${BASE_URL}/generate-study-plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        topic,
        hours_per_day: hoursPerDay,
        target_days: targetDays,
      }),
    }
  );

  return await response.json();
};

export const getDashboardAPI = async () => {

  const token = await auth.currentUser.getIdToken();

  const response = await fetch(
    `${BASE_URL}/dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return await response.json();
};

export const generateInterviewQuestionAPI = async (topic, difficulty) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${BASE_URL}/generate-interview-question`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            topic,
            difficulty
        })

    });

    return await response.json();

};

export const evaluateAnswerAPI = async (
    topic,
    question,
    answer
) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`${BASE_URL}/evaluate-answer`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
            topic,
            question,
            answer
        })

    });

    return await response.json();

};
export const getInterviewHistoryAPI = async () => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
        `${BASE_URL}/interview-history`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();
};
export const saveInterviewAPI = async (
    topic,
    score,
    feedback
) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
        `${BASE_URL}/save-interview`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify({
                topic,
                score,
                feedback
            })
        }
    );

    return await response.json();
};

export const analyzeResumeAPI = async (file) => {

    const token = await auth.currentUser.getIdToken();

    const formData = new FormData();

    formData.append("file", file);

    const response = await fetch(
        `${BASE_URL}/analyze-resume`,
        {
            method: "POST",

            headers: {
                Authorization: `Bearer ${token}`
            },

            body: formData
        }
    );

    return await response.json();

};

export const generateCodingQuestionAPI = async (
    topic,
    difficulty
) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
        `${BASE_URL}/generate-coding-question`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                topic,
                difficulty
            })
        }
    );

    return await response.json();
};

export const evaluateCodeAPI = async (
    topic,
    question,
    code,
    language
) => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
        `${BASE_URL}/evaluate-code`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                topic,
                question,
                code,
                language
            })
        }
    );

    return await response.json();
};

export const deleteCourseAPI = async (courseId) => {

    const token = await auth.currentUser.getIdToken();

    const res = await fetch(
    `${BASE_URL}/course/${courseId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await res.json();
};

export const saveChatAPI = async (question, answer) => {

    const token = await auth.currentUser.getIdToken();

    const response = await axios.post(
        `${BASE_URL}/chat`,
        {
            question,
            answer
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


export const getChatHistoryAPI = async () => {

    const token = await auth.currentUser.getIdToken();

    const response = await axios.get(
        `${BASE_URL}/chat`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const deleteChatAPI = async (chatId) => {

    const token = await auth.currentUser.getIdToken();

    const response = await axios.delete(
        `${BASE_URL}/chat/${chatId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};
export const deleteAccountAPI = async () => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
        `${BASE_URL}/profile/delete`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!response.ok)
        throw new Error("Delete failed");

    return response.json();

};