"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const SUBJECT_OPTIONS = ["General Inquiry", "Interested in a Service"] as const;

interface ServiceGroup {
  group: string;
  options: string[];
}

const SERVICE_GROUPS: ServiceGroup[] = [
  {
    group: "Website Application & Design",
    options: [
      "Website: Brochure Site",
      "Website: Web Application",
      "Website: E-commerce",
    ],
  },
  {
    group: "Mobile Application",
    options: [
      "Mobile: iOS App",
      "Mobile: Android App",
      "Mobile: Cross-platform App",
    ],
  },
  {
    group: "Graphics & Design",
    options: [
      "Design: Branding & Logo",
      "Design: UI/UX",
      "Design: Marketing Assets",
    ],
  },
  {
    group: "Custom Software",
    options: [
      "Custom: POS System",
      "Custom: Financial System",
      "Custom: Offline-First App",
    ],
  },
];

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  service: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success";

const INITIAL_STATE: ContactFormState = {
  firstName: "",
  lastName: "",
  email: "",
  subject: SUBJECT_OPTIONS[0],
  service: "",
  message: "",
};

function FieldLabel({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <span className="text-[11px] uppercase tracking-[0.2em] text-white/40">
      {children}
      {optional && (
        <span className="text-white/25 normal-case tracking-normal">
          {" "}
          (optional)
        </span>
      )}
    </span>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(INITIAL_STATE);
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange =
    (field: keyof ContactFormState) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // TODO: replace with a real submission (API route, email service, etc.)
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center py-14">
        <div
          className="w-14 h-14 rounded-full bg-[var(--accent)]/15 flex items-center justify-center mb-5"
          aria-hidden="true"
        >
          <CheckCircle2 size={28} className="text-[var(--accent)]" />
        </div>
        <h3 className="text-xl font-bold text-white">Message sent</h3>
        <p className="mt-2 text-sm text-white/50 max-w-sm leading-relaxed">
          Thanks for reaching out, {form.firstName || "there"}. We&apos;ll
          reply to {form.email || "your email"} within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <FieldLabel>First name</FieldLabel>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={handleChange("firstName")}
            placeholder="Jane"
            className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-[var(--accent)]/40 transition-colors"
          />
        </label>

        <label className="block">
          <FieldLabel>Last name</FieldLabel>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={handleChange("lastName")}
            placeholder="Doe"
            className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-[var(--accent)]/40 transition-colors"
          />
        </label>
      </div>

      <label className="block">
        <FieldLabel>Email</FieldLabel>
        <input
          type="email"
          required
          value={form.email}
          onChange={handleChange("email")}
          placeholder="jane@company.com"
          className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-[var(--accent)]/40 transition-colors"
        />
      </label>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <FieldLabel>Subject</FieldLabel>
          <select
            value={form.subject}
            onChange={handleChange("subject")}
            className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-[var(--accent)]/40 transition-colors"
          >
            {SUBJECT_OPTIONS.map((option) => (
              <option key={option} value={option} className="bg-[#0b1120]">
                {option}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <FieldLabel optional>Which service?</FieldLabel>
          <select
            value={form.service}
            onChange={handleChange("service")}
            className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-[var(--accent)]/40 transition-colors"
          >
            <option value="" className="bg-[#0b1120]">
              Select a service
            </option>
            {SERVICE_GROUPS.map((group) => (
              <optgroup
                key={group.group}
                label={group.group}
                className="bg-[#0b1120]"
              >
                {group.options.map((option) => (
                  <option key={option} value={option} className="bg-[#0b1120]">
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <FieldLabel optional>Message</FieldLabel>
        <textarea
          rows={5}
          value={form.message}
          onChange={handleChange("message")}
          placeholder="Tell us about your timeline, budget, and goals..."
          className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/60 focus:border-[var(--accent)]/40 transition-colors resize-none"
        />
      </label>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--accent)] text-white font-semibold hover:bg-opacity-90 disabled:opacity-60 transition shadow-lg shadow-[var(--accent)]/20"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
        {status !== "submitting" && <Send size={16} aria-hidden="true" />}
      </button>
    </form>
  );
}