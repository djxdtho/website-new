"use client"

import { useState } from "react"

export type FormData = {
  firstName: string
  lastName: string
  email: string
  address: string
  city: string
  state: string
  zip: string
}

type Props = {
  onSubmit: (data: FormData) => void
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
]

export default function ShippingForm({ onSubmit }: Props) {
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = (): boolean => {
    const errs: Partial<FormData> = {}
    if (!form.firstName.trim()) errs.firstName = "Required"
    if (!form.lastName.trim()) errs.lastName = "Required"
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Valid email required"
    if (!form.address.trim()) errs.address = "Required"
    if (!form.city.trim()) errs.city = "Required"
    if (!form.state) errs.state = "Select a state"
    if (!/^\d{5}$/.test(form.zip)) errs.zip = "5-digit ZIP required"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) onSubmit(form)
  }

  const handleBlur = (field: keyof FormData) => {
    const errs = { ...errors }
    const val = form[field].toString().trim()
    if (!val) {
      errs[field] = "Required"
    } else {
      delete errs[field]
    }
    setErrors(errs)
  }

  const inputClass = (field: keyof FormData) =>
    `w-full px-3 py-2.5 text-sm border rounded-lg bg-white text-[#1A0F0A] placeholder:text-[#8B7D73] focus:outline-none focus:ring-2 focus:ring-[#C4956A]/40 transition-colors ${
      errors[field] ? "border-[#C44A4A]" : "border-[#E8DDD3]"
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#1A0F0A] mb-1">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            onBlur={() => handleBlur("firstName")}
            className={inputClass("firstName")}
            placeholder="Jane"
          />
          {errors.firstName && <p className="text-xs text-[#C44A4A] mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#1A0F0A] mb-1">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            onBlur={() => handleBlur("lastName")}
            className={inputClass("lastName")}
            placeholder="Doe"
          />
          {errors.lastName && <p className="text-xs text-[#C44A4A] mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#1A0F0A] mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          onBlur={() => handleBlur("email")}
          className={inputClass("email")}
          placeholder="jane@example.com"
        />
        {errors.email && <p className="text-xs text-[#C44A4A] mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[#1A0F0A] mb-1">
          Address
        </label>
        <input
          id="address"
          type="text"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          onBlur={() => handleBlur("address")}
          className={inputClass("address")}
          placeholder="123 Coffee St"
        />
        {errors.address && <p className="text-xs text-[#C44A4A] mt-1">{errors.address}</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="city" className="block text-sm font-medium text-[#1A0F0A] mb-1">
            City
          </label>
          <input
            id="city"
            type="text"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            onBlur={() => handleBlur("city")}
            className={inputClass("city")}
            placeholder="Portland"
          />
          {errors.city && <p className="text-xs text-[#C44A4A] mt-1">{errors.city}</p>}
        </div>
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-[#1A0F0A] mb-1">
            State
          </label>
          <select
            id="state"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            onBlur={() => handleBlur("state")}
            className={inputClass("state")}
          >
            <option value="">Select</option>
            {US_STATES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-xs text-[#C44A4A] mt-1">{errors.state}</p>}
        </div>
        <div>
          <label htmlFor="zip" className="block text-sm font-medium text-[#1A0F0A] mb-1">
            ZIP
          </label>
          <input
            id="zip"
            type="text"
            maxLength={5}
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, "") })}
            onBlur={() => handleBlur("zip")}
            className={inputClass("zip")}
            placeholder="97201"
          />
          {errors.zip && <p className="text-xs text-[#C44A4A] mt-1">{errors.zip}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#C4956A] text-[#1A0F0A] font-semibold rounded-lg hover:bg-[#D4A87A] transition-colors mt-2"
      >
        Continue to Review
      </button>
    </form>
  )
}
