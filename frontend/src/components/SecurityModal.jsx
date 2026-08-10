import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast from "react-hot-toast";

function SecurityModal({ open, setOpen }) {

    if (!open) return null;

    const user = auth.currentUser;

    const changePassword = async () => {

    try {

        console.log("Current User:", auth.currentUser);

        console.log("Email:", auth.currentUser?.email);

        await sendPasswordResetEmail(
            auth,
            auth.currentUser.email
        );

        console.log("Password reset email sent");

        toast.success("Password reset email sent!");

    } catch (err) {

        console.error(err);

        toast.error(err.message);

    }

};

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="w-[500px] rounded-3xl bg-slate-900 border border-slate-700 p-8">

                <h1 className="text-3xl font-bold mb-8">
                    🔒 Security
                </h1>

                <div className="space-y-6">

                    <div className="bg-slate-800 rounded-2xl p-5">

                        <p className="text-slate-400">
                            Email
                        </p>

                        <p className="text-lg font-semibold mt-2">
                            {user?.email}
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-5">

                        <p className="text-slate-400">
                            Password
                        </p>

                        <p className="text-lg mt-2">
                            ••••••••••••
                        </p>

                    </div>

                    <div className="bg-slate-800 rounded-2xl p-5">

                        <p className="text-slate-400">
                            Two Factor Authentication
                        </p>

                        <p className="mt-2 text-yellow-400">
                            Coming Soon
                        </p>

                    </div>

                </div>

                <div className="flex justify-end gap-4 mt-8">

                    <button
                        onClick={() => setOpen(false)}
                        className="px-6 py-3 rounded-xl bg-slate-700"
                    >
                        Close
                    </button>

                    <button
                        onClick={changePassword}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 font-bold"
                    >
                        Get Password
                    </button>

                </div>

            </div>

        </div>

    );

}

export default SecurityModal;