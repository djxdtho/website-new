import { Card } from "@/components/ui/card"

const capabilities = [
  {
    number: "01",
    label: "Develop",
    title: "Full-Stack Web Development",
    subtitle: "From concept to deployment",
    tags: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"],
    cta: "Start a project",
    href: "#",
  },
  {
    number: "02",
    label: "Design",
    title: "UI/UX & Visual Design",
    subtitle: "Interfaces that feel right",
    tags: ["Figma", "Spline", "Prototyping", "Brand Identity", "Motion"],
    cta: "Discuss your vision",
    href: "#",
  },
  {
    number: "03",
    label: "Create",
    title: "Interactive Experiences",
    subtitle: "Web you can feel",
    tags: ["3D Web", "WebGL", "Animation", "Creative Coding", "GSAP"],
    cta: "Build something cool",
    href: "#",
  },
  {
    number: "04",
    label: "Consult",
    title: "Technical Consultation",
    subtitle: "Strategy & architecture",
    tags: ["Code Review", "Architecture", "Performance", "Accessibility"],
    cta: "Let's talk shop",
    href: "#",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="relative z-10 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
              [ 02 ]  Capabilities
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-4 leading-[1.05]">
            What I Offer
          </h2>
          <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl mb-16">
            Services I provide — from code to design to strategy.
          </p>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {capabilities.map((cap) => (
            <Card key={cap.number} className="p-6 md:p-8 group/card">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[10px] text-white/30 tracking-[1px]">
                  [{cap.number}]
                </span>
                <span className="font-mono text-[10px] text-white/40 tracking-[1px] uppercase">
                  {cap.label}
                </span>
                <span className="ml-auto text-[10px] font-mono text-white/20 tracking-[1px]">
                  {'->'}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight mb-2 leading-[1.1]">
                {cap.title}
              </h3>
              <p className="text-white/40 text-sm font-mono mb-5">
                {cap.subtitle}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {cap.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono text-white/50 border border-white/[0.08] px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={cap.href}
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.1em] text-white/50 group-hover/card:text-white transition-colors duration-200"
              >
                {cap.cta} <span className="text-white/30 group-hover/card:text-white/60 transition-colors duration-200">&rarr;</span>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
