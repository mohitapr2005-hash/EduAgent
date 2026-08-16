const API = "https://eduagent-ugdl.onrender.com";

export const getAnalytics = async (uid) => {

    const res = await fetch(`${API}/analytics/${uid}`);

    return await res.json();

};

import { auth } from "../firebase/firebase";

const BASE_URL = "https://eduagent-ugdl.onrender.com";

export const getAIUsage = async () => {

    const token = await auth.currentUser.getIdToken();

    const response = await fetch(
        `${BASE_URL}/ai-usage`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};