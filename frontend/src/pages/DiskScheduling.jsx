import { useState } from "react";
import Navbar from "../components/Navbar";

export default function DiskScheduling() {

    const [requests, setRequests] = useState(
        "98 183 37 122 14 124 65 67"
    );

    const [head, setHead] = useState(53);

    const [algorithm, setAlgorithm] = useState("FCFS");

    const [result, setResult] = useState(null);

    const parseRequests = () => {

        return requests
            .trim()
            .split(/\s+/)
            .map(Number);

    };
    const runFCFS = () => {

    const arr = parseRequests();

    let current = head;

    let totalSeek = 0;

    const sequence = [head];

    arr.forEach(req => {

        totalSeek += Math.abs(req - current);

        current = req;

        sequence.push(req);

    });

    setResult({

        sequence,

        totalSeek

    });

};
/* ===========================
        SSTF
=========================== */

const runSSTF = () => {

    const pending = parseRequests();

    let current = head;

    let totalSeek = 0;

    const sequence = [head];

    while (pending.length > 0) {

        let nearestIndex = 0;

        let minDistance = Math.abs(pending[0] - current);

        for (let i = 1; i < pending.length; i++) {

            const distance = Math.abs(
                pending[i] - current
            );

            if (distance < minDistance) {

                minDistance = distance;

                nearestIndex = i;

            }

        }

        totalSeek += minDistance;

        current = pending[nearestIndex];

        sequence.push(current);

        pending.splice(nearestIndex, 1);

    }

    setResult({

        sequence,

        totalSeek

    });

};
/* ===========================
        SCAN
=========================== */

const runSCAN = () => {

    const arr = parseRequests().sort((a, b) => a - b);

    let left = arr.filter(x => x < head);

    let right = arr.filter(x => x >= head);

    left.sort((a, b) => b - a);

    const sequence = [
        head,
        ...right,
        199,
        ...left
    ];

    let totalSeek = 0;

    for (let i = 1; i < sequence.length; i++) {

        totalSeek += Math.abs(
            sequence[i] - sequence[i - 1]
        );

    }

    setResult({

        sequence,

        totalSeek

    });

};
/* ===========================
        C-SCAN
=========================== */

const runCSCAN = () => {

    const arr = parseRequests().sort((a, b) => a - b);

    const left = arr.filter(x => x < head);

    const right = arr.filter(x => x >= head);

    const sequence = [
        head,
        ...right,
        199,
        0,
        ...left
    ];

    let totalSeek = 0;

    for (let i = 1; i < sequence.length; i++) {

        totalSeek += Math.abs(
            sequence[i] - sequence[i - 1]
        );

    }

    setResult({

        sequence,

        totalSeek

    });

};



/* ===========================
        LOOK
=========================== */

const runLOOK = () => {

    const arr = parseRequests().sort((a, b) => a - b);

    const left = arr.filter(x => x < head);

    const right = arr.filter(x => x >= head);

    left.sort((a, b) => b - a);

    const sequence = [
        head,
        ...right,
        ...left
    ];

    let totalSeek = 0;

    for (let i = 1; i < sequence.length; i++) {

        totalSeek += Math.abs(
            sequence[i] - sequence[i - 1]
        );

    }

    setResult({

        sequence,

        totalSeek

    });

};



const runSimulation = () => {

    switch (algorithm) {

        case "FCFS":
            runFCFS();
            break;

        case "SSTF":
            runSSTF();
            break;

        case "SCAN":
            runSCAN();
            break;

        case "C-SCAN":
            runCSCAN();
            break;

        case "LOOK":
            runLOOK();
            break;

        default:
            runFCFS();

    }

};
return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-bold text-center">
                💽 Disk Scheduling Lab
            </h1>

            <p className="text-center text-slate-400 mt-4">
                FCFS • SSTF • SCAN • C-SCAN • LOOK
            </p>

            <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl p-8 mt-10">

                <div className="grid md:grid-cols-3 gap-6">

                    <div>

                        <label className="font-bold">
                            Disk Requests
                        </label>

                        <input
                            value={requests}
                            onChange={(e) =>
                                setRequests(e.target.value)
                            }
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        />

                    </div>

                    <div>

                        <label className="font-bold">
                            Initial Head
                        </label>

                        <input
                            type="number"
                            value={head}
                            onChange={(e) =>
                                setHead(Number(e.target.value))
                            }
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        />

                    </div>

                    <div>

                        <label className="font-bold">
                            Algorithm
                        </label>

                        <select
                            value={algorithm}
                            onChange={(e) =>
                                setAlgorithm(e.target.value)
                            }
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        >

                            <option>FCFS</option>
                            <option>SSTF</option>
                            <option>SCAN</option>
                            <option>C-SCAN</option>
                            <option>LOOK</option>

                        </select>

                    </div>

                </div>

                <button
                    onClick={runSimulation}
                    className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold"
                >
                    Run Simulation
                </button>

                {result && (

                    <div className="mt-10">

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-2xl font-bold">
                                Seek Sequence
                            </h2>

                            <p className="mt-4 break-all text-lg">
                                {result.sequence.join(" → ")}
                            </p>

                        </div>

                        <div className="mt-8 bg-blue-600 rounded-xl p-6">

                            <h2 className="text-2xl font-bold">
                                Total Seek Time
                            </h2>

                            <p className="text-5xl mt-4 font-bold">
                                {result.totalSeek}
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    </>
);

}