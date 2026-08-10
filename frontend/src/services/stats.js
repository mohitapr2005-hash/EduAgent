const API = "http://127.0.0.1:8000";

export const getStats = async (uid) => {

    const res = await fetch(`${API}/stats/${uid}`);

    return await res.json();

};