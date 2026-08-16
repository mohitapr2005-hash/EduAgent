const API = "https://eduagent-ugdl.onrender.com";

export const getStats = async (uid) => {

    const res = await fetch(`${API}/stats/${uid}`);

    return await res.json();

};