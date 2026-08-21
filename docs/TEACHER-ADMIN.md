# Teacher guide — Arab Pro Academy admin

Simple instructions for the teacher. Students still enroll on **WhatsApp**. This admin is your classroom desk.

**Login:** https://arabproacademy.com/admin/login  
**In-app copy of this page:** `/admin/guide`

## What this panel is

The public website sells the course. The admin is for you:

- who messaged you
- who is in class
- who was absent
- homework voice notes
- oral exam scores
- certificates

You do not need a long checkout or a student mobile app.

## Your week, in order

1. **Leads** — Someone fills the website form. Open Leads, tap WhatsApp, talk to them. Status: Contacted → Interested → Enrolled.
2. **Students** — On the lead page, use **Enroll as student**, or add them under Students (name + WhatsApp number).
3. **Batches** — A batch is one group, e.g. “Riyadh evening — September”. Set dates, days, and seats.
4. **Attendance** — Create a session (date + title), mark Present / Late / Absent. Two absences = make-up list (send a recording or extra session).
5. **Homework** — Open the student, paste the WhatsApp voice or Drive link, score 1–5.
6. **Quizzes** — Optional short MCQ for vocab/listening. Public placement quiz is at `/placement`. Speaking is scored on Oral exams.
7. **Oral exams** — Mid and Final. Score 1–5: pronunciation, vocabulary, fluency, understanding. Average ≥ 3 = pass. Below 3 = extra speaking time (free-extension promise).
8. **Certificates** — Issue a certificate. Share `/verify/APA-XXXXXX`. Anyone can open and print it.

## Every menu, in simple words

| Menu | What it is |
| --- | --- |
| Overview | Today’s numbers: new leads, students, make-ups |
| Leads | People who asked about a course |
| Courses | Syllabus: week vocab, PDF, audio, recording links |
| Batches | A named class group with dates |
| Students | People in class (open one for the full picture) |
| Attendance | Roll call |
| Quizzes | Short written checks + placement attempts |
| Oral exams | The real speaking test |
| Certificates | Completion certificate + public verify link |
| Pricing / Online / Testimonials / FAQ | Text on the public website |
| Settings / Admins | Contact details and who can log in (Super Admin) |

## Public pages

- Website: https://arabproacademy.com
- Placement: https://arabproacademy.com/placement
- Verify: `https://arabproacademy.com/verify/APA-XXXXXX`

## If something looks empty

- No FAQ or prices: Overview → **Seed content now** (Super Admin).
- Attendance / quizzes / certificates say tables are missing: import `prisma/hostinger-lms-upgrade.sql` in phpMyAdmin, then Seed again.
- Cannot log in: Seed creates the first admin from Hostinger `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
