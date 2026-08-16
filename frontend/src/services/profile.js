
const API = "https://eduagent-ugdl.onrender.com";

export const saveProfile = async (uid, data) => {

    const res = await fetch(`${API}/profile/${uid}`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(data)

    });

    return await res.json();

};

export const getProfile = async (uid) => {

    const res = await fetch(`${API}/profile/${uid}`);

    return await res.json();

};

export const uploadProfilePhoto = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch(
        "https://eduagent-ugdl.onrender.com/upload-profile-photo",
        {
            method: "POST",
            body: formData
        }
    );

    return await res.json();

};