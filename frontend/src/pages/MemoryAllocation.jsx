import { useState } from "react";
import Navbar from "../components/Navbar";

export default function MemoryAllocation() {

    const [blocks, setBlocks] = useState("100 500 200 300 600");

    const [processes, setProcesses] = useState("212 417 112 426");

    const [algorithm, setAlgorithm] = useState("First Fit");

    const [result, setResult] = useState(null);

    const parseBlocks = () =>
        blocks.split(" ").map(Number);

    const parseProcesses = () =>
        processes.split(" ").map(Number);

const runFirstFit = () => {

    const memory = [...parseBlocks()];

    const allocation = [];

    parseProcesses().forEach((process) => {

        let placed = false;

        for (let i = 0; i < memory.length; i++) {

            if (memory[i] >= process) {

                allocation.push(i + 1);

                memory[i] -= process;

                placed = true;

                break;

            }

        }

        if (!placed)
            allocation.push("Not Allocated");

    });

    setResult({

        allocation,

        remaining: memory

    });

};
const runBestFit = () => {

    const memory = [...parseBlocks()];

    const allocation = [];

    parseProcesses().forEach((process) => {

        let index = -1;

        let best = Infinity;

        for (let i = 0; i < memory.length; i++) {

            if (memory[i] >= process && memory[i] < best) {

                best = memory[i];

                index = i;

            }

        }

        if (index !== -1) {

            allocation.push(index + 1);

            memory[index] -= process;

        } else {

            allocation.push("Not Allocated");

        }

    });

    setResult({

        allocation,

        remaining: memory

    });

};



const runWorstFit = () => {

    const memory = [...parseBlocks()];

    const allocation = [];

    parseProcesses().forEach((process) => {

        let index = -1;

        let worst = -1;

        for (let i = 0; i < memory.length; i++) {

            if (memory[i] >= process && memory[i] > worst) {

                worst = memory[i];

                index = i;

            }

        }

        if (index !== -1) {

            allocation.push(index + 1);

            memory[index] -= process;

        } else {

            allocation.push("Not Allocated");

        }

    });

    setResult({

        allocation,

        remaining: memory

    });

};



const runSimulation = () => {

    switch (algorithm) {

        case "First Fit":
            runFirstFit();
            break;

        case "Best Fit":
            runBestFit();
            break;

        case "Worst Fit":
            runWorstFit();
            break;

        default:
            runFirstFit();

    }

};

return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-bold text-center">
                🧠 Memory Allocation
            </h1>

            <p className="text-center text-slate-400 mt-3">
                First Fit • Best Fit • Worst Fit
            </p>

            <div className="max-w-6xl mx-auto mt-10 bg-slate-900 rounded-2xl p-8">

                <div className="grid md:grid-cols-3 gap-6">

                    <div>

                        <label className="font-bold">
                            Memory Blocks
                        </label>

                        <input
                            value={blocks}
                            onChange={(e) => setBlocks(e.target.value)}
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        />

                    </div>

                    <div>

                        <label className="font-bold">
                            Processes
                        </label>

                        <input
                            value={processes}
                            onChange={(e) => setProcesses(e.target.value)}
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        />

                    </div>

                    <div>

                        <label className="font-bold">
                            Algorithm
                        </label>

                        <select
                            value={algorithm}
                            onChange={(e) => setAlgorithm(e.target.value)}
                            className="mt-2 w-full bg-slate-800 p-3 rounded"
                        >

                            <option>First Fit</option>
                            <option>Best Fit</option>
                            <option>Worst Fit</option>

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
                                Allocation Result
                            </h2>

                            <table className="w-full mt-6 border-collapse">

                                <thead>

                                    <tr className="border-b border-slate-700">

                                        <th className="text-left p-3">
                                            Process
                                        </th>

                                        <th className="text-left p-3">
                                            Allocated Block
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {result.allocation.map((item, index) => (

                                        <tr
                                            key={index}
                                            className="border-b border-slate-800"
                                        >

                                            <td className="p-3">
                                                P{index + 1}
                                            </td>

                                            <td className="p-3">
                                                {item}
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>

                            </table>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 mt-8">

                            <h2 className="text-2xl font-bold">
                                Remaining Memory
                            </h2>

                            <p className="mt-4 text-xl">
                                {result.remaining.join(" , ")}
                            </p>

                        </div>

                    </div>

                )}

            </div>

        </div>

    </>
);

}