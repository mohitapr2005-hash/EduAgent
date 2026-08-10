import { useState } from "react";
import Navbar from "../components/Navbar";

export default function PageReplacement() {

    const [referenceString, setReferenceString] = useState(
        "7 0 1 2 0 3 0 4 2 3 0 3 2"
    );

    const [frames, setFrames] = useState(3);

    const [algorithm, setAlgorithm] = useState("FIFO");

    const [result, setResult] = useState(null);

    const parseInput = () => {
        return referenceString
            .trim()
            .split(/\s+/)
            .map(Number);
    };
    const runFIFO = () => {

    const pages = parseInput();

    const frame = [];

    const history = [];

    let faults = 0;

    let hits = 0;

    let pointer = 0;

    pages.forEach(page => {

        if (frame.includes(page)) {

            hits++;

        }

        else {

            faults++;

            if (frame.length < frames) {

                frame.push(page);

            }

            else {

                frame[pointer] = page;

                pointer = (pointer + 1) % frames;

            }

        }

        history.push([...frame]);

    });

    setResult({

        history,

        hits,

        faults,

        ratio:

            ((hits / pages.length) * 100).toFixed(2)

    });

};
/* ===========================
        LRU
=========================== */

const runLRU = () => {

    const pages = parseInput();

    const frame = [];

    const history = [];

    let hits = 0;

    let faults = 0;

    pages.forEach(page => {

        if (frame.includes(page)) {

            hits++;

            frame.splice(frame.indexOf(page), 1);

            frame.push(page);

        }

        else {

            faults++;

            if (frame.length < frames) {

                frame.push(page);

            }

            else {

                frame.shift();

                frame.push(page);

            }

        }

        history.push([...frame]);

    });

    setResult({

        history,

        hits,

        faults,

        ratio:
            ((hits / pages.length) * 100).toFixed(2)

    });

};



/* ===========================
        OPTIMAL
=========================== */

const runOptimal = () => {

    const pages = parseInput();

    let frame = [];

    let history = [];

    let hits = 0;

    let faults = 0;

    for (let i = 0; i < pages.length; i++) {

        const page = pages[i];

        if (frame.includes(page)) {

            hits++;

        }

        else {

            faults++;

            if (frame.length < frames) {

                frame.push(page);

            }

            else {

                let indexToReplace = 0;

                let farthest = -1;

                for (let j = 0; j < frame.length; j++) {

                    const nextUse = pages
                        .slice(i + 1)
                        .indexOf(frame[j]);

                    if (nextUse === -1) {

                        indexToReplace = j;

                        break;

                    }

                    if (nextUse > farthest) {

                        farthest = nextUse;

                        indexToReplace = j;

                    }

                }

                frame[indexToReplace] = page;

            }

        }

        history.push([...frame]);

    }

    setResult({

        history,

        hits,

        faults,

        ratio:
            ((hits / pages.length) * 100).toFixed(2)

    });

};



const runSimulation = () => {

    if (algorithm === "FIFO") {

        runFIFO();

    }

    else if (algorithm === "LRU") {

        runLRU();

    }

    else {

        runOptimal();

    }

};
return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-bold text-center">
                📄 Page Replacement Lab
            </h1>

            <p className="text-center text-slate-400 mt-4">
                FIFO • LRU • Optimal Page Replacement
            </p>

            <div className="max-w-6xl mx-auto bg-slate-900 rounded-2xl p-8 mt-10">

                <div className="grid md:grid-cols-3 gap-6">

                    <div>

                        <label className="font-bold">
                            Reference String
                        </label>

                        <input
                            value={referenceString}
                            onChange={(e) =>
                                setReferenceString(e.target.value)
                            }
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        />

                    </div>

                    <div>

                        <label className="font-bold">
                            Frames
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={frames}
                            onChange={(e) =>
                                setFrames(Number(e.target.value))
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
                            <option>FIFO</option>
                            <option>LRU</option>
                            <option>Optimal</option>
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

                        <h2 className="text-2xl font-bold mb-6">
                            Frame Visualization
                        </h2>

                        <div className="overflow-x-auto">

                            <table className="w-full border border-slate-700">

                                <thead className="bg-slate-800">

                                    <tr>

                                        <th className="p-3">
                                            Step
                                        </th>

                                        <th>
                                            Frames
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {result.history.map((frame, index) => (

                                        <tr
                                            key={index}
                                            className="border-t border-slate-700 text-center"
                                        >

                                            <td className="p-3">
                                                {index + 1}
                                            </td>

                                            <td>
                                                {frame.join(" | ")}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-8">

                            <div className="bg-green-600 rounded-xl p-6">

                                <h3 className="text-xl font-bold">
                                    Hits
                                </h3>

                                <p className="text-4xl mt-3">
                                    {result.hits}
                                </p>

                            </div>

                            <div className="bg-red-600 rounded-xl p-6">

                                <h3 className="text-xl font-bold">
                                    Faults
                                </h3>

                                <p className="text-4xl mt-3">
                                    {result.faults}
                                </p>

                            </div>

                            <div className="bg-blue-600 rounded-xl p-6">

                                <h3 className="text-xl font-bold">
                                    Hit Ratio
                                </h3>

                                <p className="text-4xl mt-3">
                                    {result.ratio}%
                                </p>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    </>
);

}