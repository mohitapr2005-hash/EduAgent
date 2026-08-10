function SkillsCard({ title, skills, color }) {

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
                {title}
            </h2>

            <div className="flex flex-wrap gap-3">

                {(skills || []).map((skill, index) => (

                    <span
                        key={index}
                        className={`px-5 py-3 rounded-full text-white font-bold shadow-lg hover:scale-105 transition ${color}`}
                    >
                        {skill}
                    </span>

                ))}

            </div>

        </div>

    );

}

export default SkillsCard;