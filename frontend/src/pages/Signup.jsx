function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">

      <div className="bg-slate-900 p-8 rounded-2xl w-[420px] shadow-xl">

        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-slate-800 text-white mb-6"
        />

        <button
          className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg text-white font-bold"
        >
          Sign Up
        </button>

      </div>

    </div>
  );
}

export default Signup;