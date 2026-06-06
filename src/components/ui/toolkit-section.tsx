'use client'

import { Card } from "@/components/ui/card"
import { KnotAnimation } from "@/components/ui/knot-animation"

const toolCategories = [
  {
    number: "01",
    label: "Frontend",
    title: "UI Engineering",
    items: [
      { name: "React", desc: "Component architecture", url: "https://react.dev" },
      { name: "Next.js", desc: "Full-stack React", url: "https://nextjs.org" },
      { name: "TypeScript", desc: "Type-safe code", url: "https://typescriptlang.org" },
      { name: "Tailwind CSS", desc: "Utility-first CSS", url: "https://tailwindcss.com" },
      { name: "Framer Motion", desc: "Animation", url: "https://framer.com/motion" },
      { name: "Three.js", desc: "3D graphics", url: "https://threejs.org" },
    ],
  },
  {
    number: "02",
    label: "Design & Creative",
    title: "Visual Craft",
    items: [
      { name: "Figma", desc: "UI/UX design", url: "https://figma.com" },
      { name: "Spline", desc: "3D design", url: "https://spline.design" },
      { name: "Blender", desc: "3D modeling", url: "https://blender.org" },
      { name: "Photoshop", desc: "Image editing", url: "https://adobe.com/photoshop" },
    ],
  },
  {
    number: "03",
    label: "Languages",
    title: "Core Languages",
    items: [
      { name: "TypeScript", desc: "Primary language", url: "https://typescriptlang.org" },
      { name: "JavaScript", desc: "ES6+", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { name: "Python", desc: "Scripting & automation", url: "https://python.org" },
      { name: "HTML / CSS", desc: "Web fundamentals", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
      { name: "SQL", desc: "Databases", url: "https://en.wikipedia.org/wiki/SQL" },
    ],
  },
  {
    number: "04",
    label: "Tools & Infrastructure",
    title: "The Stack",
    items: [
      { name: "Git", desc: "Version control", url: "https://git-scm.com" },
      { name: "VS Code", desc: "Editor", url: "https://code.visualstudio.com" },
      { name: "Vercel", desc: "Deployment", url: "https://vercel.com" },
      { name: "Linux", desc: "Terminal & servers", url: "https://linux.org" },
      { name: "Postman", desc: "API testing", url: "https://postman.com" },
    ],
  },
]

function ToolItem({ name, desc, url }: { name: string; desc: string; url: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-2.5 py-1.5 border border-white/[0.06] hover:border-white/20 transition-colors duration-200 group cursor-pointer">
      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/60 transition-colors duration-200" />
      <div>
        <span className="text-sm font-mono text-white/80 group-hover:text-white transition-colors duration-200">
          {name}
        </span>
        <span className="text-[10px] text-white/30 font-mono ml-2 hidden sm:inline">
          {desc}
        </span>
      </div>
    </a>
  )
}

export function ToolkitSection() {
  return (
    <section id="toolkit" className="relative z-10 py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex justify-between items-start gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center gap-2 text-xs font-mono text-white/40 tracking-[1px] uppercase">
                <span className="font-bold text-white/60">[ 03 ]</span>
              </span>
              <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
                Toolkit
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-4 leading-[1.05]">
              My Toolkit
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-2xl">
              The technologies and tools I use to ship production-grade digital experiences.
            </p>
          </div>
          <div className="hidden md:block shrink-0 w-[160px] mt-2">
            <div className="p-2">
              <KnotAnimation />
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {toolCategories.map((cat) => (
            <Card key={cat.label} className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="font-mono text-[10px] text-white/30 tracking-[1px]">
                  [{cat.number}]
                </span>
                <span className="font-mono text-[10px] text-white/40 tracking-[1px] uppercase">
                  {cat.label}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-medium text-foreground tracking-tight mb-4 leading-[1.1]">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <ToolItem key={item.name} {...item} />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
