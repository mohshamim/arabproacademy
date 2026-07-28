export const WHATSAPP_NUMBER = "966574915561"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const PHONE_DISPLAY = "+966574915561"
export const PHONE_HREF = "tel:+966574915561"
export const EMAIL = "arabpacademy@gmail.com"

export function whatsappEnrollUrl(message: string) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
}

export const NAV_LINKS = [
  { label: "About", href: "#why" },
  { label: "Courses", href: "#courses" },
  { label: "Online", href: "#online" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const

export const ONLINE_LEVELS = [
  {
    level: "LEVEL 1",
    name: "BEGINNER",
    badgeColor: "teal" as const,
    monthlyPrice: "650",
    fullPrice: "1,299",
    features: [
      "2 live classes per week",
      "Course duration: 2 months (8 weeks)",
      "100% online classes",
    ],
    message:
      "I want to enroll in the Online Beginner Course (Level 1) — 650 SAR/month or 1,299 SAR full course",
  },
  {
    level: "LEVEL 2",
    name: "INTERMEDIATE",
    badgeColor: "gold" as const,
    monthlyPrice: "799",
    fullPrice: "1,599",
    features: [
      "2 live classes per week",
      "Course duration: 2 months (8 weeks)",
      "100% online classes",
    ],
    message:
      "I want to enroll in the Online Intermediate Course (Level 2) — 799 SAR/month or 1,599 SAR full course",
  },
] as const

export const ONLINE_INCLUDES = [
  "Structured course materials & weekly practice sheets",
  "WhatsApp practice group with your batch and instructor",
  "Certificate of completion at the end of the course",
  "Flexible make-up sessions for missed classes",
] as const

export const STATS = [
  { value: "80+", label: "Students Enrolled" },
  { value: "98%", label: "Success Rate" },
  { value: "3 Months", label: "To Fluency" },
  { value: "Riyadh", label: "Based in KSA" },
] as const

export const WHY_ITEMS = [
  {
    title: "Boost Your Career in the Gulf",
    desc: "Arabic fluency is the single biggest career differentiator for professionals in Saudi Arabia, UAE, Qatar, and Kuwait.",
    icon: "briefcase",
  },
  {
    title: "Connect with 400M+ Speakers",
    desc: "Arabic is the 5th most spoken language in the world. Opening this door transforms your social and professional life.",
    icon: "globe",
  },
  {
    title: "Accelerate in Saudi Vision 2030",
    desc: "Saudi Arabia's Vision 2030 is creating thousands of new opportunities. Arabic speakers get first access.",
    icon: "rocket",
  },
  {
    title: "Build Genuine Relationships",
    desc: "Speaking the local language earns deep respect and trust from Saudi and Gulf colleagues, clients, and neighbors.",
    icon: "heart",
  },
  {
    title: "Community & Belonging",
    desc: "Integrate faster into local culture — from markets to meetings, spoken Arabic puts you at ease everywhere.",
    icon: "users",
  },
  {
    title: "Certified Achievement",
    desc: "Complete your program and receive a recognized certificate of Arabic proficiency to showcase on your resume.",
    icon: "award",
  },
] as const

export const COURSE_FEATURES = [
  {
    title: "3 Days a Week",
    desc: "Structured schedule designed for working professionals — consistent progress without burnout.",
    icon: "calendar",
  },
  {
    title: "3-Month Structured Path",
    desc: "A clear, week-by-week curriculum that takes you from zero to confident conversation.",
    icon: "route",
  },
  {
    title: "100% Spoken-First Approach",
    desc: "We focus on the Arabic you'll actually use — everyday conversation, not academic theory.",
    icon: "message",
  },
  {
    title: "Small Batch Classes",
    desc: "Limited seats per batch so every student gets personal attention and speaking practice.",
    icon: "users",
  },
  {
    title: "Real-Life Scenarios",
    desc: "Marketplace, office, hospital, government offices — practice the situations you face daily.",
    icon: "map",
  },
  {
    title: "Riyadh-Based Institute",
    desc: "Learn in-person at our Riyadh center or join live online — your choice, same quality.",
    icon: "building",
  },
] as const

export const JOURNEY = [
  {
    month: "Month 1",
    title: "Foundations & Greetings",
    desc: "Pronunciation, daily greetings, introductions, numbers, and essential survival phrases.",
  },
  {
    month: "Month 2",
    title: "Everyday Conversations",
    desc: "Asking directions, shopping, food, transport, family talk, and workplace small talk.",
  },
  {
    month: "Month 3",
    title: "Professional Fluency",
    desc: "Office meetings, negotiations, phone calls, and confident cultural integration.",
  },
] as const

export const PRICING = [
  {
    name: "Monthly Package",
    price: "899",
    period: "SAR / month",
    desc: "Try it out, pay as you go",
    features: [
      "3 classes per week",
      "1 month of classes",
      "Spoken-first curriculum",
      "Small batch sessions",
      "Class recordings access",
      "WhatsApp support group",
    ],
    cta: "Start Monthly",
    message: "I want to enroll in the Monthly Package (899 SAR)",
    popular: false,
  },
  {
    name: "3-Month Package",
    price: "1,899",
    period: "SAR / 3 months",
    desc: "Complete fluency journey — save 968 SAR",
    features: [
      "3 classes per week",
      "Full 3-month structured program",
      "Spoken-first curriculum",
      "Small batch sessions",
      "Lifetime recordings access",
      "WhatsApp support group",
      "Certificate of completion",
      "Guaranteed fluency or free extension",
      "Priority doubt-solving sessions",
    ],
    cta: "Enroll in 3-Month",
    message: "I want to enroll in the 3-Month Package (1,899 SAR)",
    popular: true,
  },
] as const

export const AUDIENCES = [
  {
    title: "Working Professionals",
    desc: "Engineers, doctors, managers, and executives who want to lead meetings and build client trust in Arabic.",
    icon: "briefcase",
  },
  {
    title: "Students & Scholars",
    desc: "University students and researchers preparing for careers or further studies in the Gulf region.",
    icon: "graduation",
  },
  {
    title: "New Expats",
    desc: "Just arrived in Saudi Arabia? Start speaking from day one and settle in faster than you imagined.",
    icon: "plane",
  },
  {
    title: "Business Owners",
    desc: "Entrepreneurs who negotiate, hire, and operate in the local market — Arabic gives you the edge.",
    icon: "store",
  },
  {
    title: "Families of Expats",
    desc: "Spouses and family members who want to feel at home, make friends, and handle daily life independently.",
    icon: "home",
  },
  {
    title: "Job Seekers",
    desc: "Boost your CV with certified Arabic proficiency — stand out in the competitive Gulf job market.",
    icon: "search",
  },
] as const

export const TESTIMONIALS = [
  {
    name: "Rajesh Kumar",
    role: "Project Manager, Riyadh",
    initial: "R",
    text: "I was skeptical about learning Arabic in 3 months, but the spoken-first method really works. I now lead client meetings in Arabic confidently. The 3-month package was worth every riyal.",
  },
  {
    name: "Sarah Mitchell",
    role: "Healthcare Professional",
    initial: "S",
    text: "As a nurse in Riyadh, speaking Arabic changed everything. Patients trust me instantly now. The teachers are patient and the small batches gave me real speaking time.",
  },
  {
    name: "Ahmed Diallo",
    role: "Business Owner, Jeddah",
    initial: "A",
    text: "I run a trading company and needed Arabic for negotiations. After the program, I closed deals I would have lost before. The real-life scenario training is unmatched.",
  },
  {
    name: "Priya Sharma",
    role: "Teacher & Expat",
    initial: "P",
    text: "Moving to Saudi was daunting until I joined Arab Pro Academy. Within weeks I was handling daily life in Arabic — markets, taxis, schools. Highly recommend to every expat.",
  },
  {
    name: "James Okoro",
    role: "Engineer, Aramco Project",
    initial: "J",
    text: "The structured 3-month path kept me accountable. The certificate helped me land a better role. Worth far more than the price — this is an investment, not a cost.",
  },
  {
    name: "Fatima Noor",
    role: "University Student",
    initial: "F",
    text: "I tried apps and YouTube for a year with no progress. In 3 months here, I speak more Arabic than I ever imagined. The teachers genuinely care about your success.",
  },
] as const

export const FAQS = [
  {
    q: "Do I need any prior Arabic knowledge?",
    a: "Not at all. Our program starts from absolute zero. Most of our students join as complete beginners and reach confident spoken fluency by the end of 3 months.",
  },
  {
    q: "Is this Modern Standard Arabic or a spoken dialect?",
    a: "We focus on spoken Arabic — the everyday conversational Arabic used in Saudi Arabia and the Gulf. This is the Arabic you need for real life, work, and social situations.",
  },
  {
    q: "What if I miss a class?",
    a: "All classes are recorded and available to students. You can review any missed session at your convenience, and our WhatsApp support group helps you catch up quickly.",
  },
  {
    q: "Are classes in-person or online?",
    a: "Both. We are based in Riyadh and offer in-person classes at our center. You can also join live online sessions with the same teachers and curriculum.",
  },
  {
    q: 'What does the "guaranteed fluency" mean?',
    a: "If after completing the full 3-month program you are not able to hold everyday Arabic conversations, we provide a free extension of classes until you reach that goal. Your success is our commitment.",
  },
  {
    q: "How do I enroll and pay?",
    a: "Simply click any \"Enroll\" button to message us on WhatsApp, or call +966574915561. We will guide you through batch timings, payment options, and get you started immediately.",
  },
  {
    q: "Why is the 3-month package better value?",
    a: "The monthly package is 899 SAR/month, so 3 months separately costs 2,697 SAR. The 3-month package is 1,899 SAR — saving you 798 SAR. Plus, fluency requires the full 3-month journey, so you get better results and a lower price.",
  },
] as const
