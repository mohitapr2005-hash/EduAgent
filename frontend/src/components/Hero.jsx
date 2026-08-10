import hero from "../assets/hero.png";

function Hero() {
    return (
        <div className="max-w-7xl mx-auto px-6 py-12">

            <div className="grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT */}

                <div>

                    <p className="text-cyan-400 font-semibold tracking-widest uppercase">
                        AI Powered Learning Platform
                    </p>

                    <h1 className="text-6xl font-black leading-tight mt-4">
                        Learn Smarter
                        <br />
                        with <span className="text-blue-500">EduAgent AI</span>
                    </h1>

                    <p className="text-slate-400 text-xl mt-6 leading-8 max-w-xl">
                        Generate AI courses, solve doubts, prepare for interviews,
                        practice coding, analyze resumes and track your learning —
                        all from one intelligent platform.
                    </p>

                    <div className="flex gap-4 mt-8">

                        <div className="bg-slate-800 rounded-2xl px-6 py-4">
                            📚 AI Courses
                        </div>

                        <div className="bg-slate-800 rounded-2xl px-6 py-4">
                            🤖 AI Tutor
                        </div>

                        <div className="bg-slate-800 rounded-2xl px-6 py-4">
                            💻 Coding
                        </div>

                    </div>

                </div>

                {/* RIGHT */}

                <div className="flex justify-center">

                    <img
    src={hero}
    alt="Hero"
    className="w-[380px] mx-auto lg:mx-0"
/>

                </div>

            </div>

        </div>
    );
}

export default Hero;