import { useState } from "react";
import Navbar from "../components/Navbar";

export default function BankersAlgorithm() {

    const [available, setAvailable] = useState("3 3 2");

    const [allocation, setAllocation] = useState([
        [0,1,0],
        [2,0,0],
        [3,0,2],
        [2,1,1],
        [0,0,2]
    ]);

    const [maximum, setMaximum] = useState([
        [7,5,3],
        [3,2,2],
        [9,0,2],
        [2,2,2],
        [4,3,3]
    ]);

    const [result, setResult] = useState(null);

    const updateAllocation = (i,j,value)=>{

        const copy=[...allocation];

        copy[i][j]=Number(value);

        setAllocation(copy);

    };

    const updateMaximum=(i,j,value)=>{

        const copy=[...maximum];

        copy[i][j]=Number(value);

        setMaximum(copy);

    };
    const runBanker=()=>{

    const work=available
        .split(" ")
        .map(Number);

    const finish=new Array(allocation.length).fill(false);

    const safe=[];

    const need=allocation.map((row,i)=>
        row.map((x,j)=>maximum[i][j]-x)
    );

    let progress=true;

    while(progress){

        progress=false;

        for(let i=0;i<allocation.length;i++){

            if(finish[i]) continue;

            let possible=true;

            for(let j=0;j<work.length;j++){

                if(need[i][j]>work[j]){

                    possible=false;

                    break;

                }

            }

            if(possible){

                finish[i]=true;

                safe.push("P"+i);

                allocation[i].forEach((x,j)=>{

                    work[j]+=x;

                });

                progress=true;

            }

        }

    }

    setResult({

        safe,

        safeState:
            finish.every(x=>x)

    });

};
return (
    <>
        <Navbar />

        <div className="min-h-screen bg-slate-950 text-white p-10">

            <h1 className="text-5xl font-bold text-center">
                🏦 Banker's Algorithm
            </h1>

            <p className="text-center text-slate-400 mt-4">
                Safe Sequence Detection
            </p>

            <div className="max-w-6xl mx-auto mt-10 bg-slate-900 rounded-2xl p-8">

                <button
                    onClick={runBanker}
                    className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold"
                >
                    Find Safe Sequence
                </button>

                {result && (
                    <div className="mt-8">

                        <div className="bg-slate-800 rounded-xl p-6">

                            <h2 className="text-2xl font-bold">
                                Safe State
                            </h2>

                            <p className="text-3xl mt-4">
                                {result.safeState ? "✅ SAFE" : "❌ UNSAFE"}
                            </p>

                        </div>

                        <div className="bg-slate-800 rounded-xl p-6 mt-6">

                            <h2 className="text-2xl font-bold">
                                Safe Sequence
                            </h2>

                            <p className="text-xl mt-4">
                                {result.safe.join(" → ")}
                            </p>

                        </div>

                    </div>
                )}

            </div>

        </div>

    </>
);
}