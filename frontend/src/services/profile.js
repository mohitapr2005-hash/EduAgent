
const API = "http://127.0.0.1:8000";

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
        "http://127.0.0.1:8000/upload-profile-photo",
        {
            method: "POST",
            body: formData
        }
    );

    return await res.json();

};