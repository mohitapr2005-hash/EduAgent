import Roadmap from "../Roadmap";
import VideoPlayer from "../VideoPlayer";
import AITutor from "../AITutor";
import ProgressCard from "../ProgressCard";

function WorkspaceSection(props) {

    return (

        <>

            <div className="mb-8">

                <h2 className="text-4xl font-black">

                    📚 Learning Workspace

                </h2>

                <p className="text-slate-400 mt-2">

                    Continue your AI learning journey.

                </p>

            </div>

            <div className="grid lg:grid-cols-5 gap-8 items-start">

                {/* LEFT */}

                <div className="lg:col-span-3">

                    <Roadmap

                        roadmap={props.roadmap}

                        courseId={props.courseId}

                        completedWeek={props.completedWeek}

                        setCompletedWeek={props.setCompletedWeek}

                        lesson={props.lesson}

                        selectedWeek={props.selectedWeek}

                        generateWeekLesson={props.generateWeekLesson}

                        generateVideo={props.generateVideo}

                    />

                </div>

                {/* RIGHT */}

                <div className="lg:col-span-2 space-y-8">

                    <VideoPlayer

                        videoUrl={props.videoUrl}

                        loading={props.videoLoading}

                    />

                    <AITutor

                        question={props.question}

                        setQuestion={props.setQuestion}

                        askDoubt={props.askDoubt}

                        answer={props.answer}

                    />

                    <ProgressCard

                        roadmap={props.roadmap}

                        completedWeek={props.completedWeek}

                        courseId={props.courseId}

                    />

                </div>

            </div>

        </>

    );

}

export default WorkspaceSection;