import Link from "next/link"
import { requireAdmin } from "@/lib/admin-auth"
import { AdminCard, AdminPageHeader } from "@/components/admin/ui"

const STEPS = [
  {
    href: "/admin/leads",
    title: "1. Answer new leads",
    body: "Someone fills the website form or you get a WhatsApp enquiry. Open Leads, tap WhatsApp, talk to them. Change status to Contacted, then Interested, then Enrolled.",
  },
  {
    href: "/admin/students",
    title: "2. Turn them into a student",
    body: "On the lead page, use Enroll as student. Or add them under Students (name + WhatsApp number). Put them in a batch when you know which class they joined.",
  },
  {
    href: "/admin/batches",
    title: "3. Put them in a class (batch)",
    body: "A batch is one group: for example “Riyadh evening — September”. Set dates, days, and how many seats. Open the batch to see the roster.",
  },
  {
    href: "/admin/attendance",
    title: "4. Take attendance each class",
    body: "Create a session (date + short title), then mark Present / Late / Absent. After two absences, the student appears on the make-up list. Send a recording or extra session.",
  },
  {
    href: "/admin/students",
    title: "5. Log voice-note homework",
    body: "Open the student. Paste the WhatsApp voice or Drive link, give a score 1–5, save. This is how you track speaking practice — not a written exam.",
  },
  {
    href: "/admin/quizzes",
    title: "6. Weekly quiz (optional)",
    body: "Short multiple-choice for vocab or listening. The public placement quiz lives on the website at /placement. Speaking is scored on Oral exams, not here.",
  },
  {
    href: "/admin/exams",
    title: "7. Mid and final oral exam",
    body: "Create a Mid or Final exam for a batch. Score each student 1–5 on pronunciation, vocabulary, fluency, and understanding. Average 3 or more = pass. Below 3 = extra speaking time (the free-extension promise).",
  },
  {
    href: "/admin/certificates",
    title: "8. Issue a certificate",
    body: "When they finish, Issue certificate. Share the link /verify/APA-XXXXXX. Anyone (employer, student) can open it and print it.",
  },
]

export default async function AdminGuidePage() {
  await requireAdmin()

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="How to use this admin"
        description="Simple guide for the teacher. Students still enroll on WhatsApp — this panel is your classroom desk."
      />

      <AdminCard title="What this panel is">
        <p className="text-sm leading-relaxed text-[#4B5563]">
          The public website sells the course. This admin is for you: who
          messaged you, who is in class, who was absent, homework voice notes,
          oral exam scores, and certificates. You do not need a long checkout
          or a student mobile app.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
          Login:{" "}
          <a href="https://arabproacademy.com/admin/login" className="font-semibold text-[#c4962a]">
            arabproacademy.com/admin/login
          </a>
        </p>
      </AdminCard>

      <AdminCard title="Your week, in order">
        <ol className="space-y-5">
          {STEPS.map((step) => (
            <li key={step.title}>
              <Link
                href={step.href}
                className="text-sm font-semibold text-[#0d1b2a] hover:text-[#c4962a]"
              >
                {step.title}
              </Link>
              <p className="mt-1 text-sm leading-relaxed text-[#4B5563]">{step.body}</p>
            </li>
          ))}
        </ol>
      </AdminCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <AdminCard title="Every menu, in simple words">
          <dl className="space-y-3 text-sm">
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Overview</dt>
              <dd className="text-[#4B5563]">Today’s numbers: new leads, students, classes that need make-up.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Leads</dt>
              <dd className="text-[#4B5563]">People who asked about a course. WhatsApp them from here.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Courses</dt>
              <dd className="text-[#4B5563]">The syllabus: 12-week in person, 8-week online. Edit week vocab, PDF, audio, recording links.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Batches</dt>
              <dd className="text-[#4B5563]">A named group of students with dates (one evening class, one online group, etc.).</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Students</dt>
              <dd className="text-[#4B5563]">The people in class. Open one person to see attendance, homework, exams, and certificates.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Attendance</dt>
              <dd className="text-[#4B5563]">Roll call. Present, late, or absent. Two absences = make-up list.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Quizzes</dt>
              <dd className="text-[#4B5563]">Short written checks. Placement quiz is also on the public site.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Oral exams</dt>
              <dd className="text-[#4B5563]">The real test: speaking. Mid + final with a 1–5 rubric.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Certificates</dt>
              <dd className="text-[#4B5563]">Printable completion certificate with a public verify link.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Pricing / Online / Testimonials / FAQ</dt>
              <dd className="text-[#4B5563]">Text on the public website. Change prices or answers here — they show on arabproacademy.com.</dd>
            </div>
            <div>
              <dt className="font-semibold text-[#0d1b2a]">Settings / Admins</dt>
              <dd className="text-[#4B5563]">Contact details and who can log in. Super Admin only.</dd>
            </div>
          </dl>
        </AdminCard>

        <AdminCard title="Public pages students can open">
          <ul className="space-y-3 text-sm text-[#4B5563]">
            <li>
              <span className="font-semibold text-[#0d1b2a]">Website</span> —{" "}
              <a href="/" className="text-[#c4962a]">
                arabproacademy.com
              </a>
              . Brochure, prices, WhatsApp enroll.
            </li>
            <li>
              <span className="font-semibold text-[#0d1b2a]">Placement quiz</span> —{" "}
              <a href="/placement" className="text-[#c4962a]">
                /placement
              </a>
              . 2-minute check: beginner or intermediate. Results also appear under Quizzes.
            </li>
            <li>
              <span className="font-semibold text-[#0d1b2a]">Verify certificate</span> —{" "}
              <span className="font-mono text-xs">/verify/APA-XXXXXX</span>. Share this after you issue a cert.
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-[#4B5563]">
            Enrollment is always WhatsApp. Do not send people a long online
            checkout.
          </p>
        </AdminCard>
      </div>

      <AdminCard title="If something looks empty">
        <ul className="list-disc space-y-2 pl-5 text-sm text-[#4B5563]">
          <li>
            No FAQ or prices: Overview → <strong>Seed content now</strong> (Super Admin).
          </li>
          <li>
            Attendance / quizzes / certificates pages say “tables not in MySQL”: import{" "}
            <code className="rounded bg-[#faf8f4] px-1">prisma/hostinger-lms-upgrade.sql</code> in phpMyAdmin, then Seed again.
          </li>
          <li>
            Cannot log in: the first admin user is created by Seed (or a row in AdminUser). Use the email and password from Hostinger env.
          </li>
        </ul>
      </AdminCard>
    </div>
  )
}
