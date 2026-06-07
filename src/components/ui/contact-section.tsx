"use client"

import { useRef, useState } from "react"
import { Mail, Phone, MapPin, CheckCircle, XCircle } from "lucide-react"
import emailjs from "@emailjs/browser"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { KnotAnimation } from "@/components/ui/knot-animation"

function ContactForm() {
  const form = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle")

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.current) return
    setStatus("sending")
    try {
      await emailjs.sendForm(
        "service_s878amk",
        "template_73lepd9",
        form.current,
        "0RT6CTEgKh13HuZOX"
      )
      setStatus("sent")
      form.current.reset()
    } catch {
      setStatus("error")
    }
    setTimeout(() => setStatus("idle"), 4000)
  }

  return (
    <form ref={form} className="w-full space-y-4" onSubmit={sendEmail}>
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-mono text-white/40 uppercase tracking-wider">Name</Label>
        <Input type="text" name="from_name" placeholder="Your name" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-mono text-white/40 uppercase tracking-wider">Email</Label>
        <Input type="email" name="from_email" placeholder="you@example.com" required />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs font-mono text-white/40 uppercase tracking-wider">Message</Label>
        <Textarea name="message" placeholder="Tell me about your project..." required />
      </div>
      <Button
        type="submit"
        className="w-full rounded-none"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : status === "sent" ? (
          <span className="inline-flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Sent!</span>
        ) : status === "error" ? (
          <span className="inline-flex items-center gap-2"><XCircle className="w-4 h-4" /> Failed. Try again.</span>
        ) : "Send Message"}
      </Button>
    </form>
  )
}

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-center mb-6 md:hidden">
          <div className="w-[100px]">
            <KnotAnimation speedA={0.06} speedB={0.03} ramp=" .·:>⇒⇛➤➡➢" />
          </div>
        </div>
        <div className="mb-2">
          <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
            [ 09 ]  Contact
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-foreground tracking-tight mb-8 leading-[1.05]">
          Got a project?
        </h2>
        <ContactCard
          decoration={
            <div className="hidden md:flex w-full items-center justify-center py-2">
              <div className="w-full max-w-[160px]">
                <KnotAnimation speedA={0.06} speedB={0.03} ramp=" .·:>⇒⇛➤➡➢" />
              </div>
            </div>
          }
          title="Get in Touch"
          description="Have a project in mind or just want to say hi? Fill out the form and I'll get back to you within 24 hours."
          contactInfo={[
            { icon: Mail, label: "Email", value: "AAelementsweb@gmail.com" },
            { icon: Phone, label: "Phone", value: "+234 702 545 1230" },
            { icon: MapPin, label: "Location", value: "Nigeria" },
          ]}
        >
          <ContactForm />
        </ContactCard>
      </div>
    </section>
  )
}
