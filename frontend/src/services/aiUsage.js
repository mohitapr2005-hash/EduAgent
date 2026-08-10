import { auth } from "../firebase/firebase";

const BASE_URL = "http://127.0.0.1:8000";

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