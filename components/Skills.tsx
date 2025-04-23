import MagicButton from "./MagicButton";
import { skills } from "@/data";

export default function Skills() {
  return (
    <section id="techStack">
      <h1 className="heading mb-12">
        My <span className="text-purple">Tech Stack</span>
      </h1>
      <section className="bg-transparent">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <MagicButton
              key={skill.name}
              title={skill.name}
              icon={skill.icon}
              position="left"
            />
          ))}
        </div>
      </section>
    </section>
  );
}
