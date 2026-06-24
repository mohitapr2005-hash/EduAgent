import hero from "../assets/hero.png";

function Hero() {
  return (
    <div className="text-center py-16">

      <img
        src={hero}
        alt="Hero"
        className="w-72 mx-auto mb-8"
      />

      <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
        EduAgent AI
      </h1>

      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Generate complete AI-powered courses, video lessons,
        quizzes, notes and personal tutoring for any topic in
        seconds.
      </p>

    </div>
  );
}

export default Hero;