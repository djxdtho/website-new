"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { FallingPattern } from "@/components/ui/falling-pattern"

export function ContactSection() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 px-6 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0">
        <FallingPattern
          color="rgba(255,255,255,0.06)"
          backgroundColor="transparent"
          duration={180}
          blurIntensity="0.4em"
          density={4}
          className="h-full"
        />
      </div>
      <div className="relative z-[1] max-w-5xl mx-auto">
        <div className="mb-2">
          <span className="text-[10px] font-mono text-white/40 tracking-[1px] uppercase">
            [ 09 ]  Contact
          </span>
        </div>
        <p className="text-white/40 text-xs font-mono tracking-wider uppercase mb-8">
          Got a project? Let&apos;s make it real.
        </p>
        <ContactCard
          title="Get in Touch"
          description="Have a project in mind or just want to say hi? Fill out the form and I'll get back to you within 24 hours."
          contactInfo={[
            { icon: Mail, label: "Email", value: "hello@djxdtho.dev" },
            { icon: Phone, label: "Phone", value: "+234 812 345 6789" },
            { icon: MapPin, label: "Location", value: "Nigeria" },
          ]}
        >
          <form className="w-full space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-mono text-white/40 uppercase tracking-wider">Name</Label>
              <Input type="text" placeholder="Your name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-mono text-white/40 uppercase tracking-wider">Email</Label>
              <Input type="email" placeholder="you@example.com" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-mono text-white/40 uppercase tracking-wider">Message</Label>
              <Textarea placeholder="Tell me about your project..." />
            </div>
            <Button type="button" className="w-full rounded-none">
              Send Message
            </Button>
          </form>
        </ContactCard>
      </div>
    </section>
  )
}
