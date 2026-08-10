import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import {
    saveProfile,
    getProfile,
    uploadProfilePhoto
} from "../services/profile";
import toast from "react-hot-toast";

function EditProfileModal({ open, setOpen }) {

    const [name, setName] = useState("");
    const [university, setUniversity] = useState("");
    const [skills, setSkills] = useState("");
    const [company, setCompany] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [bio, setBio] = useState("");
    const [photo, setPhoto] = useState(null);

    useEffect(() => {

        const loadProfile = async () => {

            const user = auth.currentUser;

            if (!user) return;

            const data = await getProfile(user.uid);

            if (!data) return;

            setName(data.name || "");
            setUniversity(data.university || "");
            setSkills(data.skills || "");
            setCompany(data.company || "");
            setGithub(data.github || "");
            setLinkedin(data.linkedin || "");
            setBio(data.bio || "");
            setPhoto(data.photo_url || "");
        };

        if (open) {
            loadProfile();
        }

    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 w-full max-w-3xl">

                <h1 className="text-3xl font-bold mb-8">
                    ✏ Edit Profile
                </h1>

                <div className="flex flex-col items-center mb-8">

    <img
        src={
            photo ||
            "https://ui-avatars.com/api/?name=User"
        }
        className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500"
    />

    <label className="mt-5 cursor-pointer">

    <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (e) => {

            const file = e.target.files[0];

            if (!file) return;

            const data = await uploadProfilePhoto(file);

            setPhoto(data.photo_url);

        }}
    />

    <div className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-xl font-semibold transition">

        📷 Change Profile Photo

    </div>

</label>

</div>

                <div className="grid md:grid-cols-2 gap-5">

                    <input
                        placeholder="Full Name"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="bg-slate-800 p-4 rounded-xl"
                    />

                    <input
                        placeholder="University"
                        value={university}
                        onChange={(e)=>setUniversity(e.target.value)}
                        className="bg-slate-800 p-4 rounded-xl"
                    />

                    <input
                        placeholder="Skills"
                        value={skills}
                        onChange={(e)=>setSkills(e.target.value)}
                        className="bg-slate-800 p-4 rounded-xl"
                    />

                    <input
                        placeholder="Target Company"
                        value={company}
                        onChange={(e)=>setCompany(e.target.value)}
                        className="bg-slate-800 p-4 rounded-xl"
                    />

                    <input
                        placeholder="GitHub"
                        value={github}
                        onChange={(e)=>setGithub(e.target.value)}
                        className="bg-slate-800 p-4 rounded-xl"
                    />

                    <input
                        placeholder="LinkedIn"
                        value={linkedin}
                        onChange={(e)=>setLinkedin(e.target.value)}
                        className="bg-slate-800 p-4 rounded-xl"
                    />

                </div>

                <textarea
                    placeholder="Bio..."
                    value={bio}
                    onChange={(e)=>setBio(e.target.value)}
                    className="w-full mt-5 bg-slate-800 rounded-xl p-4 h-32"
                />

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={() => setOpen(false)}
                        className="bg-slate-700 px-6 py-3 rounded-xl"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {

    console.log("Save button clicked");

    const user = auth.currentUser;

    console.log(user);

    await saveProfile(user.uid,{
    name,
    university,
    skills,
    company,
    github,
    linkedin,
    bio,
    photo_url: photo
});
    const response = await saveProfile(user.uid, {
    name,
    university,
    skills,
    company,
    github,
    linkedin,
    bio,
    photo_url: photo
});

console.log(response);
    console.log("Saved Successfully");

    toast.success("Profile Updated 🚀");

    setOpen(false);

}}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-3 rounded-xl font-bold"
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditProfileModal;