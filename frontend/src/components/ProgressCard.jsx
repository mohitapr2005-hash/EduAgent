import { downloadCertificateAPI } from "../services/api";
function ProgressCard({

    roadmap,
    completedWeek,
    courseId,

}) {
    

    if (!roadmap) return null;
    const completed = completedWeek;
    const totalWeeks = roadmap.weeks.length;

    const progress = Math.round(
        (completed / totalWeeks) * 100
    );

    const downloadCertificate = async () => {

    try {

        await downloadCertificateAPI(courseId);

    } catch (error) {

        console.error(error);

        alert(error.message);

    }

};

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 shadow-xl">

            <h2 className="text-2xl font-bold mb-6">
                📊 Learning Progress
            </h2>

            <div className="mb-4">

                <div className="flex justify-between">

                    <span>
                        Progress
                    </span>

                    <span>
                        {progress}%
                    </span>

                </div>

                <div className="w-full bg-slate-700 rounded-full h-4 mt-3">

                    <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full transition-all duration-700"
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

            </div>

            <div className="mt-8 space-y-4">

                <div className="flex justify-between">

                    <span>📚 Total Weeks</span>

                    <strong>{totalWeeks}</strong>

                </div>

                <div className="flex justify-between">

                    <span>✅ Completed</span>

                    <strong>{completed}</strong>

                </div>

                <div className="flex justify-between">

                    <span>🎯 Remaining</span>

                    <strong>{totalWeeks-completed}</strong>

                </div>

            </div>
            

        <div className="mt-8 space-y-4">

    ...

</div>

{progress === 100 && (

    <button
        onClick={downloadCertificate}
        className="w-full mt-8 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl"
    >
        🏆 Download Certificate
    </button>

)}

</div>

);

}

export default ProgressCard;