import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CPUScheduling() {

  const [processes, setProcesses] = useState([
    {
      id: "P1",
      arrival: 0,
      burst: 5,
      priority: 2,
    },
    {
      id: "P2",
      arrival: 1,
      burst: 3,
      priority: 1,
    },
    {
      id: "P3",
      arrival: 2,
      burst: 8,
      priority: 3,
    },
  ]);

  const [algorithm, setAlgorithm] = useState("FCFS");
  const [timeQuantum, setTimeQuantum] = useState(2);
  const [result, setResult] = useState(null);

  const addProcess = () => {
    setProcesses([
      ...processes,
      {
        id: `P${processes.length + 1}`,
        arrival: 0,
        burst: 1,
        priority: 1,
      },
    ]);
  };

  const deleteProcess = (index) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const updateValue = (index, field, value) => {
    const copy = [...processes];
    copy[index][field] = Number(value);
    setProcesses(copy);
  };

  /* ===========================
         FCFS
  =========================== */

  const runFCFS = () => {

    const sorted = [...processes].sort(
      (a, b) => a.arrival - b.arrival
    );

    let currentTime = 0;

    let waitingTotal = 0;
    let turnaroundTotal = 0;

    const gantt = [];
    const table = [];

    sorted.forEach((p) => {

      if (currentTime < p.arrival) {
        currentTime = p.arrival;
      }

      const start = currentTime;
      const finish = start + p.burst;

      const waiting = start - p.arrival;
      const turnaround = finish - p.arrival;

      waitingTotal += waiting;
      turnaroundTotal += turnaround;

      gantt.push({
        id: p.id,
        start,
        finish,
      });

      table.push({
        id: p.id,
        arrival: p.arrival,
        burst: p.burst,
        priority: p.priority,
        start,
        finish,
        waiting,
        turnaround,
      });

      currentTime = finish;
    });

    setResult({
      gantt,
      table,
      avgWaiting: (
        waitingTotal / sorted.length
      ).toFixed(2),

      avgTurnaround: (
        turnaroundTotal / sorted.length
      ).toFixed(2),
    });
  };

  /* ===========================
         SJF
  =========================== */

  const runSJF = () => {

    const remaining = [...processes];

    const gantt = [];
    const table = [];

    let currentTime = 0;

    let waitingTotal = 0;
    let turnaroundTotal = 0;

    while (remaining.length > 0) {

      const available = remaining.filter(
        (p) => p.arrival <= currentTime
      );

      if (available.length === 0) {
        currentTime++;
        continue;
      }

      available.sort(
        (a, b) => a.burst - b.burst
      );

      const p = available[0];

      remaining.splice(
        remaining.findIndex(
          (x) => x.id === p.id
        ),
        1
      );

      const start = currentTime;
      const finish = start + p.burst;

      const waiting = start - p.arrival;
      const turnaround = finish - p.arrival;

      waitingTotal += waiting;
      turnaroundTotal += turnaround;

      gantt.push({
        id: p.id,
        start,
        finish,
      });

      table.push({
        id: p.id,
        arrival: p.arrival,
        burst: p.burst,
        priority: p.priority,
        start,
        finish,
        waiting,
        turnaround,
      });

      currentTime = finish;
    };

    setResult({
      gantt,
      table,
      avgWaiting: (
        waitingTotal / processes.length
      ).toFixed(2),

      avgTurnaround: (
        turnaroundTotal / processes.length
      ).toFixed(2),
    });

  };
  /* ===========================
        ROUND ROBIN
  =========================== */

  const runRoundRobin = () => {

    const queue = processes
      .map((p) => ({
        ...p,
        remaining: p.burst,
        finish: 0,
      }))
      .sort((a, b) => a.arrival - b.arrival);

    const gantt = [];
    const table = [];

    let currentTime = 0;

    while (queue.some((p) => p.remaining > 0)) {

      let executed = false;

      for (let p of queue) {

        if (
          p.arrival <= currentTime &&
          p.remaining > 0
        ) {

          executed = true;

          const start = currentTime;

          const run = Math.min(
            timeQuantum,
            p.remaining
          );

          currentTime += run;

          p.remaining -= run;

          gantt.push({
            id: p.id,
            start,
            finish: currentTime,
          });

          if (p.remaining === 0) {
            p.finish = currentTime;
          }
        }
      }

      if (!executed) {
        currentTime++;
      }
    }

    let waitingTotal = 0;
    let turnaroundTotal = 0;

    queue.forEach((p) => {

      const turnaround =
        p.finish - p.arrival;

      const waiting =
        turnaround - p.burst;

      waitingTotal += waiting;
      turnaroundTotal += turnaround;

      table.push({
        id: p.id,
        arrival: p.arrival,
        burst: p.burst,
        priority: p.priority,
        start: "-",
        finish: p.finish,
        waiting,
        turnaround,
      });

    });

    setResult({
      gantt,
      table,
      avgWaiting: (
        waitingTotal / queue.length
      ).toFixed(2),

      avgTurnaround: (
        turnaroundTotal / queue.length
      ).toFixed(2),
    });

  };


  /* ===========================
        PRIORITY
  =========================== */

  const runPriority = () => {

    const remaining = [...processes];

    const gantt = [];
    const table = [];

    let currentTime = 0;

    let waitingTotal = 0;
    let turnaroundTotal = 0;

    while (remaining.length > 0) {

      const available = remaining.filter(
        (p) => p.arrival <= currentTime
      );

      if (available.length === 0) {
        currentTime++;
        continue;
      }

      available.sort(
        (a, b) =>
          a.priority - b.priority
      );

      const p = available[0];

      remaining.splice(
        remaining.findIndex(
          (x) => x.id === p.id
        ),
        1
      );

      const start = currentTime;
      const finish = start + p.burst;

      const waiting = start - p.arrival;
      const turnaround = finish - p.arrival;

      waitingTotal += waiting;
      turnaroundTotal += turnaround;

      gantt.push({
        id: p.id,
        start,
        finish,
      });

      table.push({
        id: p.id,
        arrival: p.arrival,
        burst: p.burst,
        priority: p.priority,
        start,
        finish,
        waiting,
        turnaround,
      });

      currentTime = finish;

    }

    setResult({

      gantt,
      table,

      avgWaiting: (
        waitingTotal / processes.length
      ).toFixed(2),

      avgTurnaround: (
        turnaroundTotal / processes.length
      ).toFixed(2),

    });

  };


  const runSimulation = () => {

    if (algorithm === "FCFS") {
      runFCFS();
    }

    else if (algorithm === "SJF") {
      runSJF();
    }

    else if (algorithm === "Round Robin") {
      runRoundRobin();
    }

    else if (algorithm === "Priority") {
      runPriority();
    }

  };
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">

        <h1 className="text-5xl font-bold text-center">
          💻 CPU Scheduling Lab
        </h1>

        <div className="max-w-6xl mx-auto mt-10 bg-slate-900 rounded-2xl p-8">

          <table className="w-full text-center">

            <thead className="border-b border-slate-700">

              <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Priority</th>
                <th>Delete</th>
              </tr>

            </thead>

            <tbody>

              {processes.map((p, index) => (

                <tr
                  key={index}
                  className="border-b border-slate-800"
                >

                  <td>{p.id}</td>

                  <td>
                    <input
                      type="number"
                      value={p.arrival}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "arrival",
                          e.target.value
                        )
                      }
                      className="bg-slate-800 rounded p-2 w-20"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={p.burst}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "burst",
                          e.target.value
                        )
                      }
                      className="bg-slate-800 rounded p-2 w-20"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={p.priority}
                      onChange={(e) =>
                        updateValue(
                          index,
                          "priority",
                          e.target.value
                        )
                      }
                      className="bg-slate-800 rounded p-2 w-20"
                    />
                  </td>

                  <td>

                    <button
                      onClick={() =>
                        deleteProcess(index)
                      }
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      X
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          <button
            onClick={addProcess}
            className="mt-6 bg-green-600 px-6 py-2 rounded-lg"
          >
            + Add Process
          </button>

          <div className="mt-8 flex items-center gap-4">

            <select
              value={algorithm}
              onChange={(e) =>
                setAlgorithm(e.target.value)
              }
              className="bg-slate-800 p-3 rounded"
            >

              <option>FCFS</option>
              <option>SJF</option>
              <option>Round Robin</option>
              <option>Priority</option>

            </select>

            {algorithm === "Round Robin" && (

              <input
                type="number"
                value={timeQuantum}
                onChange={(e) =>
                  setTimeQuantum(
                    Number(e.target.value)
                  )
                }
                className="bg-slate-800 rounded p-3 w-24"
              />

            )}

            <button
              onClick={runSimulation}
              className="bg-blue-600 px-6 py-3 rounded-lg"
            >
              Run Simulation
            </button>

          </div>

          {result && (

            <div className="mt-10">

              <h2 className="text-2xl font-bold">
                Gantt Chart
              </h2>

              <div className="flex mt-4">

                {result.gantt.map((g, i) => (

                  <div
                    key={i}
                    className="border px-8 py-4"
                  >
                    {g.id}
                  </div>

                ))}

              </div>

              <div className="flex">

                {result.gantt.map((g, i) => (

                  <div
                    key={i}
                    className="w-20"
                  >
                    {g.start}
                  </div>

                ))}

                <span>
                  {
                    result.gantt[
                      result.gantt.length - 1
                    ].finish
                  }
                </span>

              </div>

              <div className="mt-8 overflow-x-auto">

                <table className="w-full border border-slate-700">

                  <thead className="bg-slate-700">

                    <tr>

                      <th className="p-3">Process</th>
                      <th>Arrival</th>
                      <th>Burst</th>
                      <th>Priority</th>
                      <th>Start</th>
                      <th>Finish</th>
                      <th>Waiting</th>
                      <th>Turnaround</th>

                    </tr>

                  </thead>

                  <tbody>

                    {result.table.map((p) => (

                      <tr
                        key={p.id}
                        className="border-t border-slate-700 text-center"
                      >

                        <td className="p-3">{p.id}</td>
                        <td>{p.arrival}</td>
                        <td>{p.burst}</td>
                        <td>{p.priority}</td>
                        <td>{p.start}</td>
                        <td>{p.finish}</td>
                        <td>{p.waiting}</td>
                        <td>{p.turnaround}</td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

              <div className="mt-6">

                <p>
                  Average Waiting Time :
                  <b> {result.avgWaiting}</b>
                </p>

                <p className="mt-2">
                  Average Turnaround Time :
                  <b> {result.avgTurnaround}</b>
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </>
  );

}