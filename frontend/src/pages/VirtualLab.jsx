import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function VirtualLab() {

    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-slate-950 text-white p-10">

                <h1 className="text-5xl font-bold text-center">
                    🧪 AI Virtual Lab
                </h1>

                <p className="text-center text-slate-400 mt-4">
                    Learn Operating System concepts through interactive simulations.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                    {/* CPU Scheduling */}

<div
    onClick={() => navigate("/virtual-lab/cpu-scheduling")}
    className="bg-slate-900 rounded-2xl p-6 hover:scale-105 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg"
>

    <h2 className="text-2xl font-bold">
        💻 CPU Scheduling
    </h2>

    <p className="mt-3 text-slate-400">
        Visualize FCFS, SJF, Round Robin and Priority Scheduling algorithms.
    </p>

</div>



{/* Page Replacement */}

<div
    onClick={() => navigate("/virtual-lab/page-replacement")}
    className="bg-slate-900 rounded-2xl p-6 hover:scale-105 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg"
>

    <h2 className="text-2xl font-bold">
        📄 Page Replacement
    </h2>

    <p className="mt-3 text-slate-400">
        Learn FIFO, LRU and Optimal Page Replacement algorithms.
    </p>

</div>



{/* Disk Scheduling */}

<div
    onClick={() => navigate("/virtual-lab/disk-scheduling")}
    className="bg-slate-900 rounded-2xl p-6 hover:scale-105 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg"
>

    <h2 className="text-2xl font-bold">
        💽 Disk Scheduling
    </h2>

    <p className="mt-3 text-slate-400">
        Simulate FCFS, SSTF, SCAN, C-SCAN and LOOK disk scheduling.
    </p>

</div>
{/* Banker's Algorithm */}

<div
    onClick={() => navigate("/virtual-lab/bankers-algorithm")}
    className="bg-slate-900 rounded-2xl p-6 hover:scale-105 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg"
>

    <h2 className="text-2xl font-bold">
        🏦 Banker's Algorithm
    </h2>

    <p className="mt-3 text-slate-400">
        Find the safe sequence and detect safe or unsafe system states.
    </p>

</div>



{/* Memory Allocation */}

<div
    onClick={() => navigate("/virtual-lab/memory-allocation")}
    className="bg-slate-900 rounded-2xl p-6 hover:scale-105 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg"
>

    <h2 className="text-2xl font-bold">
        🧠 Memory Allocation
    </h2>

    <p className="mt-3 text-slate-400">
        Simulate First Fit, Best Fit and Worst Fit memory allocation.
    </p>

</div>



{/* Deadlock Detection */}

<div
    onClick={() => navigate("/virtual-lab/deadlock-detection")}
    className="bg-slate-900 rounded-2xl p-6 hover:scale-105 hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-lg"
>

    <h2 className="text-2xl font-bold">
        🛑 Deadlock Detection
    </h2>

    <p className="mt-3 text-slate-400">
        Detect deadlocked processes using Allocation and Request matrices.
    </p>

</div>
                </div>

            </div>

        </>

    );

}