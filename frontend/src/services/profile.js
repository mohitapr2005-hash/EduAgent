import { auth } from "../firebase/firebase";

const API = "https://eduagent-ugdl.onrender.com";

export const saveProfile = async (uid, data) => {
    const res = await fetch(`${API}/profile/${uid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        throw new Error("Failed to save profile");
    }

    return await res.json();
};

export const getProfile = async (uid) => {
    const res = await fetch(`${API}/profile/${uid}`);

    if (!res.ok) {
        throw new Error("Failed to load profile");
    }

    return await res.json();
};

export const uploadProfilePhoto = async (file) => {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not logged in");

    const token = await user.getIdToken();
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API}/upload-profile-photo`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    if (!res.ok) {
        throw new Error("Failed to upload profile photo");
    }

    return await res.json();
};