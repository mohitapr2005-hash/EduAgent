import { useEffect, useState } from "react";
import {
    getMyCoursesAPI,
    getCourseAPI,
    deleteCourseAPI
} from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function MyCourses() {

    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const loadCourses = async () => {

            try {

                const data = await getMyCoursesAPI();

                setCourses(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadCourses();

    }, []);

    const openCourse = async (course) => {

    try {

        const roadmap = await getCourseAPI(course.id);

        localStorage.setItem(
            "selectedRoadmap",
            JSON.stringify(roadmap)
        );

        localStorage.setItem(
            "selectedCourseId",
            course.id
        );

        localStorage.setItem(
            "completedWeek",
            course.completed_week
        );

        navigate("/");

    } catch (error) {

        console.error(error);

        alert("Unable to load course");

    }

};
 const deleteCourse = async (id) => {

    const ok = window.confirm(
        "Delete this course?"
    );

    if (!ok) return;

    try {

        await deleteCourseAPI(id);

        setCourses(
            courses.filter(
                (course) => course.id !== id
            )
        );

    } catch (err) {

        console.error(err);

        alert("Failed to delete course");

    }

};
    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">

            <Navbar />

            <div className="max-w-7xl mx-auto px-8 py-12">

                {/* Heading */}

                <div className="mb-12">

                    <h1 className="text-5xl font-black">
                        📚 My Courses
                    </h1>

                    <p className="text-slate-400 text-xl mt-3">
                        Continue your AI learning journey.
                    </p>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">

                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">

                        <p className="text-slate-400">
                            Total Courses
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            {courses.length}
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">

                        <p className="text-slate-400">
                            Completed
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            0
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">

                        <p className="text-slate-400">
                            In Progress
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            {courses.length}
                        </h2>

                    </div>

                    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6">

                        <p className="text-slate-400">
                            Certificates
                        </p>

                        <h2 className="text-4xl font-bold mt-2">
                            0
                        </h2>

                    </div>

                </div>

                {/* Search */}

                <input
                    type="text"
                    placeholder="🔍 Search your courses..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-5 mb-10 outline-none focus:border-cyan-500"
                />

                {/* Cards */}

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {courses.map((course) => (

                        <div
                            key={course.id}
                            onClick={() => openCourse(course)}
                            className="cursor-pointer bg-slate-900 border border-slate-700 rounded-3xl p-8 hover:border-cyan-500 hover:-translate-y-2 hover:shadow-cyan-500/20 transition-all duration-300"
                        >

                            <div className="text-5xl mb-5">
                                📘
                            </div>

                            <h2 className="text-2xl font-bold mb-3">
                                {course.title}
                            </h2>

                            <p className="text-slate-400 mb-6 line-clamp-3">
                                {course.description}
                            </p>

                            {/* Fake Progress */}

                            <div className="mb-2 flex justify-between">

                                <span className="text-slate-400">
                                    Progress
                                </span>

                                <span className="text-cyan-400">
    {course.progress}%
</span>

                            </div>

                            <div className="w-full h-3 rounded-full bg-slate-700 overflow-hidden mb-8">

                                <div
    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
    style={{
        width: `${course.progress}%`
    }}
></div>
<p className="text-sm text-slate-400 mb-6">

    Week {course.completed_week} / {course.total_weeks}

</p>

                            </div>

                            <div className="flex gap-3">

    <button
        onClick={(e) => {

            e.stopPropagation();

            openCourse(course);

        }}
        className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 py-3 rounded-xl font-bold"
    >
        Continue
    </button>

    <button
        onClick={(e) => {

            e.stopPropagation();

            deleteCourse(course.id);

        }}
        className="bg-red-600 px-5 rounded-xl hover:bg-red-700"
    >
        🗑
    </button>

</div>

                        </div>

                    ))}

                </div>

                {courses.length === 0 && (

                    <div className="text-center py-24">

                        <div className="text-7xl mb-6">
                            📚
                        </div>

                        <h2 className="text-4xl font-bold mb-4">
                            No Courses Yet
                        </h2>

                        <p className="text-slate-400">
                            Generate your first AI course from the Dashboard.
                        </p>

                    </div>

                )}

            </div>

        </div>

    );

}

export default MyCourses;