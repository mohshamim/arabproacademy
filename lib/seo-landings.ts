import type { Locale } from "@/lib/locale"

export const LANDING_SLUGS = [
  "spoken-arabic-riyadh",
  "arabic-crash-course-riyadh",
  "learn-arabic-fast",
  "arabic-for-expats-riyadh",
  "online-arabic-saudi-gcc",
] as const

export type LandingSlug = (typeof LANDING_SLUGS)[number]

export type LandingCopy = {
  eyebrow: string
  h1: string
  h1Gold: string
  lead: string
  points: { title: string; body: string }[]
  whoTitle: string
  who: string[]
  faqs: { q: string; a: string }[]
  waMessage: string
  cta: string
  secondary: string
}

export const LANDINGS: Record<LandingSlug, Record<Locale, LandingCopy>> = {
  "spoken-arabic-riyadh": {
    en: {
      eyebrow: "In-person in Riyadh · Live online across Saudi",
      h1: "Spoken Arabic classes",
      h1Gold: "in Riyadh",
      lead: "Conversational Arabic for Indian, Filipino, and Pakistani expats who need to speak at work, in taxis, and at the supermarket — not pass a grammar exam. Small batches at our Riyadh centre, or the same teachers live online.",
      points: [
        {
          title: "Spoken first, not MSA textbooks",
          body: "You practise Gulf everyday Arabic: greetings, prices, directions, clinic visits, and office small talk.",
        },
        {
          title: "Built for non-native speakers",
          body: "Classes are English-friendly. Most students start from zero after moving to Saudi Arabia.",
        },
        {
          title: "Riyadh batches + live online",
          body: "Join in person if you live in Riyadh, or the same 3-month path from Jeddah, Dammam, or abroad.",
        },
      ],
      whoTitle: "This course fits you if",
      who: [
        "You live in Riyadh and need Arabic for daily life this quarter",
        "You are Indian, Filipino, Pakistani, or another non-Arab expat",
        "You want conversation, not university-style fus'ha",
        "You can attend 3 days a week, in person or live online",
      ],
      faqs: [
        {
          q: "Is this spoken Arabic or Modern Standard Arabic?",
          a: "Spoken first. We teach the conversational Arabic used in Riyadh and the Gulf. You will understand signs and formal phrases, but the goal is talking.",
        },
        {
          q: "Where are in-person classes?",
          a: "At Arab Pro Academy in Riyadh. Message us on WhatsApp for the next batch time and the classroom location.",
        },
        {
          q: "Can complete beginners join?",
          a: "Yes. Most Riyadh students start from zero. We place you with a 2-minute quiz or a short WhatsApp voice chat.",
        },
      ],
      waMessage:
        "Hi, I want spoken Arabic classes in Riyadh. Please share the next batch and fees.",
      cta: "WhatsApp to enroll in Riyadh",
      secondary: "Take the 2-minute placement quiz",
    },
    ar: {
      eyebrow: "حضوري في الرياض · أونلاين مباشر في السعودية",
      h1: "دورة العربية المحكية",
      h1Gold: "في الرياض",
      lead: "عربية محادثة للمقيمين من الهند والفلبين وباكستان — للعمل والتاكسي والسوق، لا لاختبار نحو. دفعات صغيرة في مركز الرياض، أو نفس المعلمون أونلاين مباشر.",
      points: [
        {
          title: "محادثة أولاً لا كتب الفصحى",
          body: "تتدرّب على عربية الخليج اليومية: التحية، الأسعار، الاتجاهات، العيادة، وحديث المكتب.",
        },
        {
          title: "لغير الناطقين بالعربية",
          body: "الحصص مريحة للإنجليزية. معظم الطلاب يبدأون من الصفر بعد القدوم للسعودية.",
        },
        {
          title: "دفعات الرياض وأونلاين",
          body: "احضر في الرياض، أو نفس مسار 3 أشهر من جدة أو الدمام أو الخارج.",
        },
      ],
      whoTitle: "هذه الدورة تناسبك إذا",
      who: [
        "تسكن في الرياض وتحتاج العربية للحياة هذا الربع",
        "أنت مقيم من الهند أو الفلبين أو باكستان أو غير عربي",
        "تريد المحادثة لا الفصحى الجامعية",
        "تستطيع 3 أيام في الأسبوع حضورياً أو أونلاين",
      ],
      faqs: [
        {
          q: "هل هي محكية أم فصحى؟",
          a: "محكية أولاً. نعلّم عربية المحادثة في الرياض والخليج. ستفهم اللافتات والعبارات الرسمية، والهدف هو الكلام.",
        },
        {
          q: "أين الحصص الحضورية؟",
          a: "في أكاديمية عرب برو بالرياض. راسلنا على واتساب لموعد الدفعة القادمة وموقع الصف.",
        },
        {
          q: "هل يقبل المبتدئ تماماً؟",
          a: "نعم. معظم طلاب الرياض يبدأون من الصفر. نحدد مستواك باختبار دقيقتين أو مكالمة واتساب قصيرة.",
        },
      ],
      waMessage: "مرحباً، أرغب بدورة العربية المحكية في الرياض. أرسلوا موعد الدفعة والرسوم.",
      cta: "سجّل عبر واتساب في الرياض",
      secondary: "اختبار تحديد المستوى خلال دقيقتين",
    },
  },
  "arabic-crash-course-riyadh": {
    en: {
      eyebrow: "3 days a week · 3-month intensive",
      h1: "Arabic crash course",
      h1Gold: "in Riyadh",
      lead: "A short, intensive spoken-Arabic path for expats who need results this quarter — not a two-year diploma. Three live classes a week, small batches, recordings if you miss a day. Most students pick the 3-month package.",
      points: [
        {
          title: "Crash pace, still structured",
          body: "Week-by-week: sounds and greetings → markets and taxis → workplace calls. No filler modules.",
        },
        {
          title: "Three months to conversation",
          body: "The 1,899 SAR package is the full crash path and saves 798 SAR versus paying monthly.",
        },
        {
          title: "In-person intensity in Riyadh",
          body: "Classroom speaking time beats apps. Live online uses the same teachers if you cannot commute.",
        },
      ],
      whoTitle: "Pick the crash course if",
      who: [
        "You need to speak Arabic for a job or family move this year",
        "You can commit 3 days a week for 12 weeks",
        "You already tried Duolingo or YouTube and stalled",
        "You want a certificate after the intensive, not after years",
      ],
      faqs: [
        {
          q: "How intensive is the crash course?",
          a: "Three classes a week for three months, plus WhatsApp practice. It is a job-friendly intensive, not an all-day bootcamp.",
        },
        {
          q: "Is the monthly plan a crash course too?",
          a: "Monthly is 899 SAR if you want to try one month. Fluency still needs the full 3-month crash path — that is why the package is cheaper overall.",
        },
        {
          q: "What if I miss a week?",
          a: "Sessions are recorded. The WhatsApp group and a make-up slot help you catch the speaking drills.",
        },
      ],
      waMessage:
        "Hi, I want the Arabic crash course in Riyadh (3-month intensive). Please share the next start date.",
      cta: "Reserve the crash course on WhatsApp",
      secondary: "Compare monthly vs 3-month pricing",
    },
    ar: {
      eyebrow: "3 أيام أسبوعياً · مكثّف 3 أشهر",
      h1: "دورة عربية مكثفة",
      h1Gold: "في الرياض",
      lead: "مسار محكي قصير للمقيمين الذين يحتاجون نتيجة هذا الربع — لا دبلوما لسنتين. ثلاث حصص مباشرة أسبوعياً، دفعات صغيرة، وتسجيل إن غبت. معظم الطلاب يختارون باقة 3 أشهر.",
      points: [
        {
          title: "إيقاع مكثّف ومنظّم",
          body: "أسبوعياً: الأصوات والتحية → السوق والتاكسي → مكالمات العمل. بلا حشو.",
        },
        {
          title: "ثلاثة أشهر للمحادثة",
          body: "باقة 1,899 ريالاً هي المسار المكثّف الكامل وتوفّر 798 ريالاً مقابل الدفع الشهري.",
        },
        {
          title: "كثافة حضورية في الرياض",
          body: "الكلام في الصف أقوى من التطبيقات. الأونلاين بنفس المعلمين إن تعذّر الحضور.",
        },
      ],
      whoTitle: "اختر المكثّف إذا",
      who: [
        "تحتاج العربية لوظيفة أو انتقال عائلي هذا العام",
        "تستطيع 3 أيام أسبوعياً لمدة 12 أسبوعاً",
        "جرّبت يوتيوب أو التطبيقات وتوقفت",
        "تريد شهادة بعد المكثّف لا بعد سنوات",
      ],
      faqs: [
        {
          q: "ما مدى كثافة الدورة؟",
          a: "ثلاث حصص أسبوعياً لثلاثة أشهر مع تدريب واتساب. مكثّف يناسب الموظفين، لا معسكراً طوال اليوم.",
        },
        {
          q: "هل الشهري مكثّف أيضاً؟",
          a: "الشهري 899 ريالاً لتجربة شهر. الطلاقة تحتاج مسار 3 أشهر — لذلك الباقة أوفر إجمالاً.",
        },
        {
          q: "ماذا لو غبت أسبوعاً؟",
          a: "الحصص مسجّلة. مجموعة واتساب وحصة تعويضية تعيدان تمارين الكلام.",
        },
      ],
      waMessage:
        "مرحباً، أرغب بالدورة المكثفة في الرياض (3 أشهر). أرسلوا تاريخ البداية القادم.",
      cta: "احجز المكثّف عبر واتساب",
      secondary: "قارن السعر الشهري وباقة 3 أشهر",
    },
  },
  "learn-arabic-fast": {
    en: {
      eyebrow: "Quick spoken Arabic · Saudi Arabia",
      h1: "Learn Arabic fast",
      h1Gold: "in Saudi Arabia",
      lead: "A quick-learning track for beginners who need usable phrases in weeks and confident conversation in about 3 months. Based in Riyadh, open live online to the rest of Saudi and the GCC.",
      points: [
        {
          title: "Speed comes from speaking hours",
          body: "You talk every class. Homework is voice notes on WhatsApp, not 40-page grammar PDFs.",
        },
        {
          title: "Beginner to daily life, then work",
          body: "Month 1: greetings, numbers, taxis. Month 2: shopping and appointments. Month 3: office and phone calls.",
        },
        {
          title: "Faster than apps, lighter than university",
          body: "No semester calendar. New Riyadh batches start when a small group fills.",
        },
      ],
      whoTitle: "For people who say “I need Arabic quickly”",
      who: [
        "New arrivals in Riyadh, Jeddah, or Dammam",
        "Professionals with a promotion or client-facing role",
        "Spouses who handle school, drivers, and clinics",
        "Anyone who wasted a year on apps and wants a deadline",
      ],
      faqs: [
        {
          q: "How fast will I speak?",
          a: "Most beginners use greetings and shopping phrases within the first weeks. Holding a short everyday conversation is the 3-month target — not native-level fluency.",
        },
        {
          q: "Is “learn Arabic fast” realistic?",
          a: "Yes for spoken survival and work small-talk if you attend and practise. No course makes you a news anchor in 30 days. We do not sell that.",
        },
        {
          q: "Do you offer a one-week crash only?",
          a: "Our intensive is the 3-month, 3-days-a-week path. Message WhatsApp if you only have a short stay — we will say honestly if a batch can help.",
        },
      ],
      waMessage:
        "Hi, I want to learn spoken Arabic fast in Saudi. I am a beginner. Please advise the next batch.",
      cta: "Start the quick track on WhatsApp",
      secondary: "See if you are beginner or intermediate",
    },
    ar: {
      eyebrow: "عربية محكية سريعة · السعودية",
      h1: "تعلّم العربية بسرعة",
      h1Gold: "في السعودية",
      lead: "مسار سريع للمبتدئين الذين يحتاجون جملاً عملية خلال أسابيع ومحادثة واثقة خلال نحو 3 أشهر. المقر في الرياض، وأونلاين مباشر لبقية السعودية والخليج.",
      points: [
        {
          title: "السرعة من ساعات الكلام",
          body: "تتكلم في كل حصة. الواجب ملاحظات صوتية على واتساب لا ملفات نحو طويلة.",
        },
        {
          title: "من المبتدئ إلى العمل",
          body: "الشهر 1: تحية وأرقام وتاكسي. الشهر 2: تسوق ومواعيد. الشهر 3: مكتب ومكالمات.",
        },
        {
          title: "أسرع من التطبيقات وأخف من الجامعة",
          body: "بلا تقويم فصول. دفعات الرياض تبدأ عندما تكتمل مجموعة صغيرة.",
        },
      ],
      whoTitle: "لمن يقول «أحتاج العربية بسرعة»",
      who: [
        "قادمون جدد إلى الرياض أو جدة أو الدمام",
        "مهنيون في دور يواجه العملاء",
        "أزواج يتولون المدرسة والسائق والعيادة",
        "من ضيّع عاماً على التطبيقات ويريد موعداً نهائياً",
      ],
      faqs: [
        {
          q: "متى أتكلم؟",
          a: "معظم المبتدئين يستخدمون التحية وجمل السوق في الأسابيع الأولى. محادثة يومية قصيرة هدف 3 أشهر — ليست طلاقة أهل اللغة.",
        },
        {
          q: "هل «تعلّم سريع» واقعي؟",
          a: "نعم للبقاء اليومي وحديث العمل إن حضرت وتدرّبت. لا دورة تجعلك مذيعاً في 30 يوماً. لا نبيع ذلك.",
        },
        {
          q: "هل لديكم مكثّف لأسبوع واحد فقط؟",
          a: "مكثّفنا مسار 3 أشهر و3 أيام أسبوعياً. راسل واتساب إن إقامتك قصيرة — نقول بصراحة إن كانت دفعة تفيدك.",
        },
      ],
      waMessage:
        "مرحباً، أريد تعلّم العربية المحكية بسرعة في السعودية. أنا مبتدئ. انصحوني بالدفعة القادمة.",
      cta: "ابدأ المسار السريع عبر واتساب",
      secondary: "اعرف إن كنت مبتدئاً أو متوسطاً",
    },
  },
  "arabic-for-expats-riyadh": {
    en: {
      eyebrow: "Indian · Filipino · Pakistani · other non-Arabs",
      h1: "Arabic for expats",
      h1Gold: "in Riyadh",
      lead: "English-friendly spoken Arabic for people who did not grow up with the language. Nurses, engineers, teachers, drivers’ families, and office staff in Riyadh use this to handle HR, neighbours, and hospital wards.",
      points: [
        {
          title: "You will not be the only non-Arab in class",
          body: "Batches are built for expats. Teachers explain in simple English, then lock the hour on speaking Arabic.",
        },
        {
          title: "Riyadh situations, not textbook Cairo",
          body: "Phrases for compounds, malls, absher appointments, and Saudi workplace politeness.",
        },
        {
          title: "Same course if your spouse is in India",
          body: "They can join the live online track while you sit in the Riyadh room — one academy, two rooms.",
        },
      ],
      whoTitle: "Made for non-native speakers",
      who: [
        "Indian professionals and families in Riyadh and the Eastern Province",
        "Filipino and Pakistani colleagues who need clinic and office Arabic",
        "New GCC arrivals who searched “Arabic classes for expats”",
        "Anyone tired of MSA YouTube aimed at Arab school kids",
      ],
      faqs: [
        {
          q: "Do I need to read Arabic first?",
          a: "No. We start with sounds and speech. Reading comes in once you can already say the words you see.",
        },
        {
          q: "Are classes mixed nationalities?",
          a: "Yes. The common language in the room is English plus the Arabic you are learning. That is the point.",
        },
        {
          q: "Can my family in India join?",
          a: "Yes — live online with the same teachers. Enrollment is still WhatsApp, no long checkout.",
        },
      ],
      waMessage:
        "Hi, I am an expat in Riyadh and I want spoken Arabic classes for non-native speakers. Please share batches.",
      cta: "WhatsApp — expat batch in Riyadh",
      secondary: "View online levels if you are not in Riyadh",
    },
    ar: {
      eyebrow: "هنود · فلبينيون · باكستانيون · مقيمون غير عرب",
      h1: "العربية للمقيمين",
      h1Gold: "في الرياض",
      lead: "عربية محكية مريحة للإنجليزية لمن لم ينشأ على اللغة. ممرضون ومهندسون ومعلمون وعائلات وموظفون في الرياض يستخدمونها للموارد البشرية والجيران وأقسام المستشفى.",
      points: [
        {
          title: "لن تكون غير العربي الوحيد",
          body: "الدفعات للمقيمين. المعلمون يشرحون بإنجليزية بسيطة ثم يثبّتون الساعة على الكلام بالعربية.",
        },
        {
          title: "مواقف الرياض لا كتاب القاهرة",
          body: "جمل للمجمّعات والمول ومواعيد أبشر ولباقة مكتب سعودية.",
        },
        {
          title: "نفس الدورة إن كان الأهل في الهند",
          body: "ينضمون أونلاين مباشر وأنت في صف الرياض — أكاديمية واحدة.",
        },
      ],
      whoTitle: "لغير الناطقين بالعربية",
      who: [
        "المهنيون والعائلات من الهند في الرياض والشرقية",
        "زملاء فلبينيون وباكستانيون يحتاجون عربية العيادة والمكتب",
        "قادمون جدد للخليج بحثوا عن دورة للمقيمين",
        "من ملّ يوتيوب الفصحى الموجّه لأطفال عرب",
      ],
      faqs: [
        {
          q: "هل يجب أن أقرأ العربية أولاً؟",
          a: "لا. نبدأ بالأصوات والكلام. القراءة تأتي بعد أن تقول الكلمات التي تراها.",
        },
        {
          q: "هل الصفوف مختلطة الجنسيات؟",
          a: "نعم. لغة الغرفة المشتركة الإنجليزية إضافة للعربية التي تتعلمها. هذا هو المقصود.",
        },
        {
          q: "هل تلتحق عائلتي في الهند؟",
          a: "نعم — أونلاين مباشر بنفس المعلمين. التسجيل عبر واتساب.",
        },
      ],
      waMessage:
        "مرحباً، أنا مقيم في الرياض وأريد دورة عربية محكية لغير الناطقين. أرسلوا مواعيد الدفعات.",
      cta: "واتساب — دفعة المقيمين في الرياض",
      secondary: "شاهد المستويات الأونلاين إن لم تكن في الرياض",
    },
  },
  "online-arabic-saudi-gcc": {
    en: {
      eyebrow: "Live online · Saudi · UAE · Qatar · Kuwait",
      h1: "Online spoken Arabic",
      h1Gold: "from Saudi & the GCC",
      lead: "Same Riyadh teachers, live on video. Built for learners in Jeddah, Dammam, Dubai, Abu Dhabi, Doha, and Kuwait City who cannot sit in our Riyadh classroom — and for family in India who want the same syllabus.",
      points: [
        {
          title: "Live, not a pre-recorded dump",
          body: "Two online tracks (Beginner 650 SAR/month, Intermediate 799 SAR/month) plus the full 3-month spoken path if you want Riyadh intensity from home.",
        },
        {
          title: "Gulf time zones, English support",
          body: "You practise Saudi/Gulf conversation. Teachers answer in English when you get stuck.",
        },
        {
          title: "Recordings + WhatsApp group",
          body: "Miss a live hour because of shift work — watch the recording and send a voice note the same day.",
        },
      ],
      whoTitle: "Join online if you are",
      who: [
        "In Jeddah, Dammam, Khobar, or elsewhere in Saudi outside Riyadh",
        "In the UAE, Qatar, Kuwait, Bahrain, or Oman",
        "In India and want a Gulf-speaking teacher, not a generic MSA MOOC",
        "In Riyadh but prefer home after work",
      ],
      faqs: [
        {
          q: "Is online the same as the Riyadh crash course?",
          a: "Same teachers and spoken-first method. In-person has more room energy. Online 8-week levels are a lighter weekly load; ask WhatsApp which batch matches your deadline.",
        },
        {
          q: "What internet do I need?",
          a: "A phone or laptop and a stable connection. We use a simple video link — no campus login maze.",
        },
        {
          q: "Can I switch to in-person later?",
          a: "Yes, if you move to Riyadh. Tell admissions on WhatsApp and we place you in a running batch.",
        },
      ],
      waMessage:
        "Hi, I want live online spoken Arabic from Saudi/GCC. Please share beginner and intermediate options.",
      cta: "Enroll online on WhatsApp",
      secondary: "See beginner vs intermediate levels",
    },
    ar: {
      eyebrow: "أونلاين مباشر · السعودية · الإمارات · قطر · الكويت",
      h1: "عربية محكية أونلاين",
      h1Gold: "من السعودية والخليج",
      lead: "نفس معلمي الرياض، مباشرة على الفيديو. لمتعلمي جدة والدمام ودبي وأبوظبي والدوحة والكويت ممن لا يحضرون صف الرياض — ولأهل في الهند يريدون نفس المنهج.",
      points: [
        {
          title: "مباشر لا تسجيلات مكدّسة",
          body: "مساران أونلاين (مبتدئ 650 ريالاً/شهر، متوسط 799) إضافة لمسار 3 أشهر إن أردت كثافة الرياض من البيت.",
        },
        {
          title: "توقيت الخليج ودعم بالإنجليزية",
          body: "تتدرّب على محادثة سعودية/خليجية. المعلمون يجيبون بالإنجليزية عند التعثّر.",
        },
        {
          title: "تسجيلات ومجموعة واتساب",
          body: "فاتتك ساعة بسبب الشفت — شاهد التسجيل وأرسل مذكرة صوتية في نفس اليوم.",
        },
      ],
      whoTitle: "انضم أونلاين إذا كنت",
      who: [
        "في جدة أو الدمام أو الخبر أو خارج الرياض",
        "في الإمارات أو قطر أو الكويت أو البحرين أو عُمان",
        "في الهند وتريد معلماً خليجياً لا دورة فصحى عامة",
        "في الرياض وتفضّل البيت بعد العمل",
      ],
      faqs: [
        {
          q: "هل الأونلاين مثل مكثّف الرياض؟",
          a: "نفس المعلمون ومنهج المحادثة. الحضوري فيه طاقة الصف. مستويات 8 أسابيع أخف أسبوعياً — اسأل واتساب أي دفعة تناسب مهلتك.",
        },
        {
          q: "ما الإنترنت المطلوب؟",
          a: "جوال أو لابتوب واتصال مستقر. رابط فيديو بسيط — بلا متاهة تسجيل جامعي.",
        },
        {
          q: "هل أنتقل للحضوري لاحقاً؟",
          a: "نعم إن انتقلت للرياض. أخبر القبول على واتساب ونضعك في دفعة جارية.",
        },
      ],
      waMessage:
        "مرحباً، أريد العربية المحكية أونلاين مباشر من السعودية/الخليج. أرسلوا خيارات المبتدئ والمتوسط.",
      cta: "سجّل أونلاين عبر واتساب",
      secondary: "شاهد مستوى المبتدئ والمتوسط",
    },
  },
}

export const LANDING_NAV: { slug: LandingSlug; en: string; ar: string }[] = [
  { slug: "spoken-arabic-riyadh", en: "Spoken Arabic in Riyadh", ar: "العربية المحكية في الرياض" },
  { slug: "arabic-crash-course-riyadh", en: "Crash course", ar: "دورة مكثفة" },
  { slug: "learn-arabic-fast", en: "Learn Arabic fast", ar: "تعلّم بسرعة" },
  { slug: "arabic-for-expats-riyadh", en: "For expats", ar: "للمقيمين" },
  { slug: "online-arabic-saudi-gcc", en: "Online Saudi & GCC", ar: "أونلاين السعودية والخليج" },
]
