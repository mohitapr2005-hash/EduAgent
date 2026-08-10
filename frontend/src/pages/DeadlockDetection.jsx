import { useState } from "react";
import Navbar from "../components/Navbar";

export default function DeadlockDetection() {

    const [available, setAvailable] = useState("3 3 2");

    const [allocation] = useState([
        [0,1,0],
        [2,0,0],
        [3,0,2],
        [2,1,1],
        [0,0,2]
    ]);

    const [request] = useState([
        [7,4,3],
        [1,2,2],
        [6,0,0],
        [0,1,1],
        [4,3,1]
    ]);

    const [result, setResult] = useState(null);

    const detectDeadlock = () => {

    const work = available.split(" ").map(Number);

    const finish = new Array(allocation.length).fill(false);

    const safe = [];

    let progress = true;

    while (progress) {

        progress = false;

        for (let i = 0; i < allocation.length; i++) {

            if (finish[i]) continue;

            let possible = true;

            for (let j = 0; j < work.length; j++) {

                if (request[i][j] > work[j]) {

                    possible = false;
                    break;

                }

            }

            if (possible) {

                finish[i] = true;

                safe.push("P" + i);

                allocation[i].forEach((x, j) => {

                    work[j] += x;

                });

                progress = true;

            }

        }

    }

    const deadlocked = [];

    finish.forEach((x, i) => {

        if (!x)
            deadlocked.push("P" + i);

    });

    setResult({

        safe,

        deadlocked

    });

};
return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-bold text-center">
                🛑 Deadlock Detection
            </h1>

            <p className="text-center text-slate-400 mt-3">
                Detect Safe Processes and Deadlocked Processes
            </p>

            <div className="max-w-6xl mx-auto mt-10 bg-slate-900 rounded-2xl p-8">

                <div>

                    <label className="font-bold">
                        Available Resources
                    </label>

                    <input
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                        className="mt-2 w-full bg-slate-800 p-3 rounded"
                    />

                </div>

                <button
                    onClick={detectDeadlock}
                    className="mt-8 bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-bold"
                >
                    Detect Deadlock
                </button>

                {result && (

                    <div className="mt-10">

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-2xl font-bold">
                                Safe Processes
                            </h2>

                            <p className="mt-4 text-xl">
                                {result.safe.length
                                    ? result.safe.join(" → ")
                                    : "None"}
                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 mt-6">

                            <h2 className="text-2xl font-bold">
                                Deadlocked Processes
                            </h2>

                            <p className="mt-4 text-xl">
                                {result.deadlocked.length
                                    ? result.deadlocked.join(", ")
                                    : "No Deadlock 🎉"}
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    </>
);

}