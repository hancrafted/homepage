import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

type SourceDocumentId = "cv-2026" | "linkedin-2026";

type SourceDocument = {
  id: SourceDocumentId;
  label: string;
  path: string;
  derivedSections: readonly string[];
};

type PageCopy = {
  title: string;
  description: string;
};

type DetailFact = {
  label: string;
  value: string;
};

type SourceSummary = {
  label: string;
  detail: string;
};

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  badge: string;
};

type Service = {
  eyebrow: string;
  title: string;
  description: string;
  outcomes: string[];
};

type Method = {
  eyebrow: string;
  title: string;
  description: string;
  detail: string;
  badge: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  sourceDocumentIds: readonly SourceDocumentId[];
};

type EducationItem = {
  institution: string;
  degree: string;
  period: string;
  details: string[];
  sourceDocumentIds: readonly SourceDocumentId[];
};

type CertificationItem = {
  title: string;
  sourceDocumentIds: readonly SourceDocumentId[];
};

type SkillGroup = {
  title: string;
  items: string[];
  sourceDocumentIds: readonly SourceDocumentId[];
};

export type SiteContent = {
  siteName: string;
  nav: { services: string; methods: string; about: string };
  headerCta: string;
  utilities: { language: string; menu: string };
  footer: string;
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      proofLabel: string;
      proofTitle: string;
      proofPoints: string[];
    };
    testimonials: {
      label: string;
      title: string;
      description: string;
      items: Testimonial[];
    };
    services: {
      label: string;
      title: string;
      description: string;
      items: Service[];
    };
    methods: {
      label: string;
      title: string;
      description: string;
      items: Method[];
    };
    cta: {
      label: string;
      title: string;
      description: string;
      button: string;
    };
  };
  about: {
    sidebar: {
      label: string;
      title: string;
      description: string;
      highlights: string[];
      facts: DetailFact[];
      sourcesTitle: string;
      sources: SourceSummary[];
    };
    experience: {
      label: string;
      title: string;
      description: string;
      items: ExperienceItem[];
    };
    education: {
      label: string;
      title: string;
      items: EducationItem[];
    };
    certifications: {
      label: string;
      title: string;
      items: CertificationItem[];
    };
    skills: {
      label: string;
      title: string;
      groups: SkillGroup[];
    };
  };
  pages: {
    home: PageCopy;
    about: PageCopy;
  };
};

export type PageKey = keyof SiteContent["pages"];

const allSourceDocumentIds = ["cv-2026", "linkedin-2026"] as const;

export const sourceDocuments = {
  "cv-2026": {
    id: "cv-2026",
    label: "HanCheCV2026.md",
    path: "/Users/hanche/Library/Mobile Documents/com~apple~CloudDocs/Coaching/Homepage/HanCheCV2026.md",
    derivedSections: [
      "home.hero",
      "home.services",
      "home.methods",
      "about.sidebar",
      "about.experience",
      "about.education",
      "about.certifications",
      "about.skills",
    ],
  },
  "linkedin-2026": {
    id: "linkedin-2026",
    label: "HanCheLinkedIn2026.md",
    path: "/Users/hanche/Library/Mobile Documents/com~apple~CloudDocs/Coaching/Homepage/HanCheLinkedIn2026.md",
    derivedSections: [
      "home.hero",
      "home.services",
      "about.sidebar",
      "about.experience",
      "about.education",
      "about.certifications",
      "about.skills",
    ],
  },
} as const satisfies Record<SourceDocumentId, SourceDocument>;

export const siteContent = {
  en: {
    siteName: "Han Che",
    nav: { services: "Services", methods: "Methods", about: "About Me" },
    headerCta: "Let's Meet",
    utilities: { language: "Select language", menu: "Menu" },
    footer:
      "Centralized multilingual content derived from Han Che’s CV and LinkedIn source documents.",
    home: {
      hero: {
        eyebrow: "Startup coaching & consulting",
        title:
          "Sharper founder stories, calmer execution, and stronger product decisions.",
        description:
          "Han Che combines startup coaching, engineering leadership, and B2B product experience to help teams pitch clearly, transform delivery habits, and improve complex enterprise software experiences.",
        primaryCta: "Let's Meet",
        secondaryCta: "View profile",
        proofLabel: "Why Han Che",
        proofTitle:
          "Coaching credibility backed by engineering, sales, and international business work.",
        proofPoints: [
          "2,000+ coaching hours across startups, student founders, and nonprofit organizations.",
          "15 full-stack web applications delivered, including large-scale CMS and MES enterprise solutions.",
          "Leadership across engineering management, senior sales engineering, and APAC business development.",
        ],
      },
      testimonials: {
        label: "References",
        title: "Seven clearly marked placeholder references for the first launch wave.",
        description:
          "These testimonials are mock content for layout and messaging validation only. Each one is easy to replace with an approved quote later.",
        items: [
          {
            name: "Mock Founder A",
            role: "B2B SaaS founder",
            quote:
              "Han helped us turn a technically impressive product into a story investors could actually follow.",
            badge: "Mock",
          },
          {
            name: "Mock Product Lead B",
            role: "Enterprise transformation lead",
            quote:
              "He brought structure to a chaotic roadmap and gave the team language we could align around.",
            badge: "Mock",
          },
          {
            name: "Mock CEO C",
            role: "Industrial software company",
            quote:
              "Han quickly identified where our pitch, product narrative, and delivery process were fighting each other.",
            badge: "Mock",
          },
          {
            name: "Mock Program Manager D",
            role: "Mobility innovation program",
            quote:
              "He made cross-functional conversations sharper without making them heavier.",
            badge: "Mock",
          },
          {
            name: "Mock Design Director E",
            role: "Enterprise UX leader",
            quote:
              "Han is unusually strong at bridging information architecture, engineering constraints, and executive communication.",
            badge: "Mock",
          },
          {
            name: "Mock Startup Coach F",
            role: "Incubator partner",
            quote:
              "Founders trusted him because he could challenge the story and still stay empathic.",
            badge: "Mock",
          },
          {
            name: "Mock Sales Leader G",
            role: "Enterprise go-to-market advisor",
            quote:
              "He clarified what buyers needed to believe, then worked backward into the product and presentation details.",
            badge: "Mock",
          },
        ],
      },
      services: {
        label: "Services",
        title:
          "Three focused offers for teams that need clearer stories, steadier execution, or better enterprise UX.",
        description:
          "The service layer stays intentionally tight: one offer for narrative, one for delivery transformation, and one for product structure.",
        items: [
          {
            eyebrow: "01",
            title: "Pitch & Storytelling Coaching for Sales and Investment",
            description:
              "Sharpen fundraising, enterprise sales, and demo narratives so technical value becomes understandable, memorable, and convincing.",
            outcomes: [
              "Clarify the core story for investors, buyers, and internal stakeholders.",
              "Strengthen presentations, proof points, and narrative flow.",
              "Reduce the gap between what the product does and what the audience understands.",
            ],
          },
          {
            eyebrow: "02",
            title: "(Agile) Transformation toward Spec-Driven Development",
            description:
              "Help teams move from ambiguous handoffs to explicit specs, calmer reviews, and more reliable collaboration across product and engineering.",
            outcomes: [
              "Introduce clearer requirements, peer review, and delivery rituals.",
              "Reduce rework caused by vague ownership and shifting expectations.",
              "Build habits that scale from one team to multiple teams.",
            ],
          },
          {
            eyebrow: "03",
            title: "B2B UI/UX & IA for Enterprise SaaS",
            description:
              "Improve information architecture, workflows, and interface language for complex expert tools, internal platforms, and enterprise SaaS products.",
            outcomes: [
              "Untangle dense workflows into understandable user journeys.",
              "Improve navigation, screen hierarchy, and decision points.",
              "Translate business complexity into calmer product experiences.",
            ],
          },
        ],
      },
      methods: {
        label: "Methods",
        title:
          "A practical content model anchored in one approved method and two explicit placeholders.",
        description:
          "The data layer already distinguishes real and mock methods so future updates can replace placeholders without restructuring the UI.",
        items: [
          {
            eyebrow: "Approved",
            title: "Backward Chaining",
            description:
              "Start from the decision, proof point, or outcome that matters most and work backward until the next useful action becomes obvious.",
            detail:
              "Useful for investor storytelling, sales narratives, roadmap planning, and spec definition when teams know the stakes but not the sequence.",
            badge: "Real method",
          },
          {
            eyebrow: "Mock",
            title: "Discovery Sprint",
            description:
              "Mock method placeholder for a short alignment sprint that surfaces constraints, risks, and stakeholder language before execution begins.",
            detail:
              "Clearly marked as mock content for now.",
            badge: "Mock",
          },
          {
            eyebrow: "Mock",
            title: "Decision Mapping",
            description:
              "Mock method placeholder for mapping key decisions, dependencies, and proof points across product, engineering, and go-to-market work.",
            detail:
              "Clearly marked as mock content for now.",
            badge: "Mock",
          },
        ],
      },
      cta: {
        label: "Let's Meet",
        title:
          "If you need a stronger story, steadier execution, or clearer enterprise workflows, let's talk.",
        description:
          "The first conversation is designed to clarify the situation and choose the right level of support, not to force a generic package.",
        button: "See background",
      },
    },
    about: {
      sidebar: {
        label: "About Han Che",
        title: "Engineering leader, startup coach, and cross-functional operator.",
        description:
          "Based in Karlsruhe, Han Che works at the intersection of storytelling, delivery discipline, and enterprise product design, combining coaching practice with hands-on software leadership.",
        highlights: [
          "Engineering management with spec-driven delivery rollout",
          "Startup and nonprofit coaching since 2010",
          "Enterprise SaaS, industrial IoT, and mobility product experience",
        ],
        facts: [
          { label: "Base", value: "Karlsruhe, Baden-Württemberg, Germany" },
          { label: "Work style", value: "Remote or hybrid collaboration" },
          {
            label: "Languages",
            value: "German, English, Chinese (Mandarin)",
          },
        ],
        sourcesTitle: "Source documents",
        sources: [
          {
            label: sourceDocuments["cv-2026"].label,
            detail:
              "Primary source for summary, experience, education, certifications, languages, and top skills.",
          },
          {
            label: sourceDocuments["linkedin-2026"].label,
            detail:
              "Cross-check source for public positioning, role timeline, and profile framing.",
          },
        ],
      },
      experience: {
        label: "Experience",
        title: "Work history",
        description:
          "Normalized from the supplied source documents to support structured rendering instead of freeform copy blocks.",
        items: [
          {
            company: "RIB Software",
            role: "Engineering Manager",
            period: "Dec 2025 – Present",
            location: "Remote",
            highlights: [
              "Leading an international team of 6 developers focused on specialized in-house UI components for the construction industry.",
              "Introducing agile frameworks across multiple teams.",
              "Establishing peer review, peer programming, and spec-driven development at company scale.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Self-employed",
            role: "Startup & NPO Coaching",
            period: "Oct 2010 – Present",
            location: "Karlsruhe / Remote",
            highlights: [
              "Gathered 2,000+ hours as a trainer and coach across student and nonprofit organizations.",
              "Coaching student startups from Karlsruhe since 2024.",
              "Startup work includes Nono, DeepSkill, and Ayun across pitching, business model, engineering, storytelling, and strategy.",
              "Organization work includes Pioniergarage, Enactus, VWI/ESTIEM, Rotaract, and Toastmasters.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "autoiXpert GmbH & Co. KG",
            role: "Senior Software Engineer",
            period: "Sep 2025 – Nov 2025",
            location: "Remote",
            highlights: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "XL2 by Audi & Capgemini",
            role: "Senior Software Engineer",
            period: "Oct 2023 – Aug 2025",
            location: "Heilbronn, Germany",
            highlights: [
              "Led a 7-member team for a multi-million-euro Audi digitization project.",
              "Worked across Angular, NestJS, GitHub Copilot, GraphQL, Postgres, AWS, React, and Tailwind.",
              "Established software engineering standards and delivered 15 internal knowledge-transfer workshops.",
              "Performed technical interviews for mid-level to principal engineers.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Selfbits",
            role: "Senior Software Engineer / Senior Sales Engineer",
            period: "Apr 2018 – Sep 2023",
            location: "Germany",
            highlights: [
              "Designed end-to-end features for industrial IoT, including OEE dashboards and resource scheduling.",
              "Worked with Angular, Ionic, NestJS, Apollo, Postgres, Docker, and Kubernetes.",
              "Managed an internal Angular component library and a Figma design library.",
              "Earlier sales-engineering work included designing 10+ applications across CMS, fleet management, and e-commerce while supporting sales and marketing.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Infobip",
            role: "Business Development Director Greater China",
            period: "Dec 2012 – Sep 2015",
            location: "Greater China / APAC",
            highlights: [
              "Responsible for more than 30% of global revenue in mobile payments and closed 50+ contracts.",
              "Launched 2 new offices in China and managed a team of 10.",
              "Progressed from Business Development Manager APAC to Business Development Director Greater China.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
      education: {
        label: "Education",
        title: "Education",
        items: [
          {
            institution: "Karlsruhe Institute of Technology (KIT)",
            degree: "Master of Science (M.S.), Information Engineering and Management",
            period: "2015 – 2018",
            details: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            institution: "Universität Karlsruhe (TH)",
            degree: "Bachelor of Science (B.Sc.), Industrial Engineering and Management",
            period: "2008 – 2012",
            details: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
      certifications: {
        label: "Certifications",
        title: "Certifications and learning signals",
        items: [
          { title: "Deep entrepreneurship: manufacturing Europe's future", sourceDocumentIds: allSourceDocumentIds },
          { title: "UX Certification", sourceDocumentIds: allSourceDocumentIds },
          { title: "Six Sigma Green Belt", sourceDocumentIds: allSourceDocumentIds },
          { title: "ESTIEM Trainer", sourceDocumentIds: allSourceDocumentIds },
          { title: "Student Pupil Mathematics", sourceDocumentIds: allSourceDocumentIds },
        ],
      },
      skills: {
        label: "Skills",
        title: "Skills and domains",
        groups: [
          {
            title: "Coaching & transformation",
            items: [
              "Software engineering practices",
              "Story pitching",
              "Presentation skills",
              "Spec-driven development",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "Product & UX",
            items: [
              "B2B UI/UX",
              "Information architecture",
              "Design systems",
              "Figma library stewardship",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "Engineering",
            items: [
              "Angular",
              "React",
              "Node.js / NestJS",
              "GraphQL",
              "Postgres",
              "AWS",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "Languages",
            items: [
              "German — native or bilingual",
              "Chinese (Mandarin) — native or bilingual",
              "English — full professional",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
    },
    pages: {
      home: {
        title: "Startup Coaching & Consulting",
        description:
          "Precise, trustworthy, and empathic startup coaching, transformation guidance, and enterprise SaaS UX support.",
      },
      about: {
        title: "About Han Che",
        description:
          "Structured work history, education, certifications, and skills for Han Che based on centralized source documents.",
      },
    },
  },
  de: {
    siteName: "Han Che",
    nav: { services: "Leistungen", methods: "Methoden", about: "Über mich" },
    headerCta: "Let's Meet",
    utilities: { language: "Sprache wählen", menu: "Menü" },
    footer:
      "Zentralisierte mehrsprachige Inhalte auf Basis von Han Ches CV- und LinkedIn-Quelldokumenten.",
    home: {
      hero: {
        eyebrow: "Startup-Coaching & Beratung",
        title:
          "Schärfere Gründer-Storys, ruhigere Umsetzung und bessere Produktentscheidungen.",
        description:
          "Han Che verbindet Startup-Coaching, Engineering-Leadership und B2B-Produktexpertise, um Teams bei Pitch, Delivery-Transformation und komplexen Enterprise-Software-Erlebnissen zu unterstützen.",
        primaryCta: "Let's Meet",
        secondaryCta: "Profil ansehen",
        proofLabel: "Warum Han Che",
        proofTitle:
          "Coaching-Kompetenz, getragen von Engineering, Sales und internationaler Geschäftserfahrung.",
        proofPoints: [
          "Über 2.000 Coaching-Stunden mit Startups, studentischen Gründerteams und Non-Profits.",
          "15 Full-Stack-Webanwendungen geliefert, darunter große CMS- und MES-Enterprise-Lösungen.",
          "Erfahrung in Engineering Management, Senior Sales Engineering und Business Development im APAC-Raum.",
        ],
      },
      testimonials: {
        label: "Referenzen",
        title: "Sieben klar markierte Platzhalter-Referenzen für die erste Launch-Welle.",
        description:
          "Diese Testimonials sind bewusst als Mock-Inhalte markiert und können später einzeln durch freigegebene Kundenzitate ersetzt werden.",
        items: [
          {
            name: "Mock Founder A",
            role: "B2B-SaaS-Gründer:in",
            quote:
              "Han hat uns geholfen, aus einem technisch starken Produkt eine Story zu machen, der Investor:innen wirklich folgen konnten.",
            badge: "Mock",
          },
          {
            name: "Mock Product Lead B",
            role: "Transformation Lead im Enterprise-Umfeld",
            quote:
              "Er brachte Struktur in eine chaotische Roadmap und gab dem Team eine Sprache, an der wir uns ausrichten konnten.",
            badge: "Mock",
          },
          {
            name: "Mock CEO C",
            role: "Industriesoftware-Unternehmen",
            quote:
              "Han erkannte sehr schnell, wo sich Pitch, Produktnarrativ und Delivery-Prozess gegenseitig behinderten.",
            badge: "Mock",
          },
          {
            name: "Mock Program Manager D",
            role: "Mobilitätsprogramm",
            quote:
              "Er machte funktionsübergreifende Gespräche schärfer, ohne sie schwerer zu machen.",
            badge: "Mock",
          },
          {
            name: "Mock Design Director E",
            role: "Enterprise-UX-Leitung",
            quote:
              "Han verbindet Informationsarchitektur, technische Grenzen und Executive-Kommunikation ungewöhnlich gut.",
            badge: "Mock",
          },
          {
            name: "Mock Startup Coach F",
            role: "Partner:in eines Inkubators",
            quote:
              "Gründerteams vertrauten ihm, weil er die Story herausfordern konnte und trotzdem empathisch blieb.",
            badge: "Mock",
          },
          {
            name: "Mock Sales Leader G",
            role: "Enterprise-Go-to-Market-Beratung",
            quote:
              "Er klärte zuerst, was Käufer wirklich glauben mussten, und arbeitete sich dann rückwärts in Produkt und Präsentation hinein.",
            badge: "Mock",
          },
        ],
      },
      services: {
        label: "Leistungen",
        title:
          "Drei fokussierte Angebote für Teams, die klarere Storys, verlässlichere Delivery oder bessere Enterprise-UX brauchen.",
        description:
          "Die Leistungsarchitektur bleibt bewusst knapp: ein Angebot für Narrativ, eines für Delivery-Transformation und eines für Produktstruktur.",
        items: [
          {
            eyebrow: "01",
            title: "Pitch- & Storytelling-Coaching für Sales und Investment",
            description:
              "Schärft Fundraising-, Enterprise-Sales- und Demo-Narrative, damit technischer Wert verständlich, merkfähig und überzeugend wird.",
            outcomes: [
              "Die Kernstory für Investor:innen, Käufer und interne Stakeholder klären.",
              "Präsentationen, Proof Points und narrativen Fluss stärken.",
              "Die Lücke zwischen Produktleistung und Publikumsverständnis verkleinern.",
            ],
          },
          {
            eyebrow: "02",
            title: "(Agile) Transformation hin zu Spec-Driven Development",
            description:
              "Unterstützt Teams dabei, von unklaren Übergaben zu expliziten Spezifikationen, ruhigeren Reviews und verlässlicherer Zusammenarbeit zu kommen.",
            outcomes: [
              "Klarere Anforderungen, Peer Review und Delivery-Rituale etablieren.",
              "Nacharbeit durch vage Zuständigkeiten und wechselnde Erwartungen reduzieren.",
              "Gewohnheiten aufbauen, die von einem Team auf mehrere Teams skalieren.",
            ],
          },
          {
            eyebrow: "03",
            title: "B2B UI/UX & IA für Enterprise SaaS",
            description:
              "Verbessert Informationsarchitektur, Workflows und Interface-Sprache für komplexe Expertentools, interne Plattformen und Enterprise-SaaS-Produkte.",
            outcomes: [
              "Dichte Abläufe in verständliche User Journeys übersetzen.",
              "Navigation, Screen-Hierarchie und Entscheidungspunkte verbessern.",
              "Geschäftliche Komplexität in ruhigere Produkterlebnisse übersetzen.",
            ],
          },
        ],
      },
      methods: {
        label: "Methoden",
        title:
          "Ein praktisches Modell mit einer freigegebenen Methode und zwei expliziten Platzhaltern.",
        description:
          "Die Datenstruktur unterscheidet bereits zwischen echter und Mock-Methode, damit spätere Updates die UI nicht umbauen müssen.",
        items: [
          {
            eyebrow: "Freigegeben",
            title: "Backward Chaining",
            description:
              "Man startet bei der wichtigsten Entscheidung, dem Proof Point oder dem Zielergebnis und arbeitet rückwärts, bis der nächste sinnvolle Schritt klar wird.",
            detail:
              "Nützlich für Investor-Storytelling, Sales-Narrative, Roadmap-Planung und Spec-Definition, wenn die Bedeutung klar ist, aber nicht die Reihenfolge.",
            badge: "Echte Methode",
          },
          {
            eyebrow: "Mock",
            title: "Discovery Sprint",
            description:
              "Mock-Platzhalter für einen kurzen Alignment-Sprint, der vor dem Start Rahmenbedingungen, Risiken und Stakeholder-Sprache sichtbar macht.",
            detail: "Derzeit bewusst als Mock-Inhalt markiert.",
            badge: "Mock",
          },
          {
            eyebrow: "Mock",
            title: "Decision Mapping",
            description:
              "Mock-Platzhalter für das Kartieren zentraler Entscheidungen, Abhängigkeiten und Proof Points über Produkt, Engineering und Go-to-Market hinweg.",
            detail: "Derzeit bewusst als Mock-Inhalt markiert.",
            badge: "Mock",
          },
        ],
      },
      cta: {
        label: "Let's Meet",
        title:
          "Wenn Ihr Team eine stärkere Story, ruhigere Umsetzung oder klarere Enterprise-Workflows braucht, lassen Sie uns sprechen.",
        description:
          "Das erste Gespräch soll die Situation klären und das passende Unterstützungsniveau finden – nicht ein Standardpaket verkaufen.",
        button: "Hintergrund ansehen",
      },
    },
    about: {
      sidebar: {
        label: "Über Han Che",
        title: "Engineering Leader, Startup-Coach und funktionsübergreifender Operator.",
        description:
          "Han Che arbeitet von Karlsruhe aus an der Schnittstelle von Storytelling, Delivery-Disziplin und Enterprise-Produktdesign – mit Coaching-Praxis und operativer Software-Erfahrung.",
        highlights: [
          "Engineering Management mit Einführung von spec-getriebener Delivery",
          "Startup- und Non-Profit-Coaching seit 2010",
          "Erfahrung mit Enterprise SaaS, Industrial IoT und Mobilitätsprodukten",
        ],
        facts: [
          { label: "Standort", value: "Karlsruhe, Baden-Württemberg, Deutschland" },
          { label: "Arbeitsweise", value: "Remote oder hybrid" },
          { label: "Sprachen", value: "Deutsch, Englisch, Chinesisch (Mandarin)" },
        ],
        sourcesTitle: "Quelldokumente",
        sources: [
          {
            label: sourceDocuments["cv-2026"].label,
            detail:
              "Primärquelle für Summary, Erfahrung, Ausbildung, Zertifikate, Sprachen und Top Skills.",
          },
          {
            label: sourceDocuments["linkedin-2026"].label,
            detail:
              "Abgleich für öffentliches Profil, Rollentimeline und Positionierung.",
          },
        ],
      },
      experience: {
        label: "Erfahrung",
        title: "Beruflicher Werdegang",
        description:
          "Aus den gelieferten Quelldokumenten normalisiert, damit die Seite strukturierte Inhalte statt freier Textblöcke rendert.",
        items: [
          {
            company: "RIB Software",
            role: "Engineering Manager",
            period: "Dez 2025 – Heute",
            location: "Remote",
            highlights: [
              "Leitet ein internationales Team von 6 Entwickler:innen für spezialisierte interne UI-Komponenten in der Bauindustrie.",
              "Führt agile Arbeitsweisen in mehreren Teams ein.",
              "Etabliert Peer Review, Peer Programming und spec-getriebene Entwicklung auf Unternehmensniveau.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Selbstständig",
            role: "Startup- & NPO-Coaching",
            period: "Okt 2010 – Heute",
            location: "Karlsruhe / Remote",
            highlights: [
              "Über 2.000 Stunden Erfahrung als Trainer und Coach in studentischen und gemeinnützigen Organisationen gesammelt.",
              "Coacht seit 2024 studentische Startups aus Karlsruhe.",
              "Startup-Arbeit mit Nono, DeepSkill und Ayun zu Pitching, Business Model, Engineering, Storytelling und Strategie.",
              "Organisationsarbeit u. a. mit Pioniergarage, Enactus, VWI/ESTIEM, Rotaract und Toastmasters.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "autoiXpert GmbH & Co. KG",
            role: "Senior Software Engineer",
            period: "Sep 2025 – Nov 2025",
            location: "Remote",
            highlights: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "XL2 by Audi & Capgemini",
            role: "Senior Software Engineer",
            period: "Okt 2023 – Aug 2025",
            location: "Heilbronn, Deutschland",
            highlights: [
              "Leitete ein 7-köpfiges Team für ein Audi-Digitalisierungsprojekt im Multi-Millionen-Euro-Bereich.",
              "Arbeitete mit Angular, NestJS, GitHub Copilot, GraphQL, Postgres, AWS, React und Tailwind.",
              "Etablierte Engineering-Standards und führte 15 interne Wissenstransfer-Workshops durch.",
              "Führte technische Interviews für Mid-Level- bis Principal-Rollen.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Selfbits",
            role: "Senior Software Engineer / Senior Sales Engineer",
            period: "Apr 2018 – Sep 2023",
            location: "Deutschland",
            highlights: [
              "Entwarf End-to-End-Features für Industrial IoT, darunter OEE-Dashboards und Ressourcenplanung.",
              "Arbeitete mit Angular, Ionic, NestJS, Apollo, Postgres, Docker und Kubernetes.",
              "Verantwortete eine interne Angular-Komponentenbibliothek und eine Figma-Designbibliothek.",
              "Frühere Sales-Engineering-Arbeit umfasste 10+ Anwendungen in CMS, Flottenmanagement und E-Commerce sowie Unterstützung in Sales und Marketing.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Infobip",
            role: "Business Development Director Greater China",
            period: "Dez 2012 – Sep 2015",
            location: "Greater China / APAC",
            highlights: [
              "Verantwortete über 30 % des globalen Umsatzes im Bereich Mobile Payments und schloss 50+ Verträge ab.",
              "Baute 2 neue Büros in China auf und leitete ein Team von 10 Personen.",
              "Entwickelte sich von Business Development Manager APAC zu Business Development Director Greater China.",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
      education: {
        label: "Ausbildung",
        title: "Ausbildung",
        items: [
          {
            institution: "Karlsruhe Institute of Technology (KIT)",
            degree:
              "Master of Science (M.Sc.), Information Engineering and Management",
            period: "2015 – 2018",
            details: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            institution: "Universität Karlsruhe (TH)",
            degree:
              "Bachelor of Science (B.Sc.), Wirtschaftsingenieurwesen",
            period: "2008 – 2012",
            details: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
      certifications: {
        label: "Zertifikate",
        title: "Zertifikate und Lernsignale",
        items: [
          { title: "Deep entrepreneurship: manufacturing Europe's future", sourceDocumentIds: allSourceDocumentIds },
          { title: "UX Certification", sourceDocumentIds: allSourceDocumentIds },
          { title: "Six Sigma Green Belt", sourceDocumentIds: allSourceDocumentIds },
          { title: "ESTIEM Trainer", sourceDocumentIds: allSourceDocumentIds },
          { title: "Student Pupil Mathematics", sourceDocumentIds: allSourceDocumentIds },
        ],
      },
      skills: {
        label: "Skills",
        title: "Skills und Domänen",
        groups: [
          {
            title: "Coaching & Transformation",
            items: [
              "Software-Engineering-Praktiken",
              "Story Pitching",
              "Präsentationskompetenz",
              "Spec-Driven Development",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "Produkt & UX",
            items: [
              "B2B UI/UX",
              "Informationsarchitektur",
              "Design Systems",
              "Figma-Library-Stewardship",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "Engineering",
            items: [
              "Angular",
              "React",
              "Node.js / NestJS",
              "GraphQL",
              "Postgres",
              "AWS",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "Sprachen",
            items: [
              "Deutsch — muttersprachlich oder zweisprachig",
              "Chinesisch (Mandarin) — muttersprachlich oder zweisprachig",
              "Englisch — volle berufliche Kompetenz",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
    },
    pages: {
      home: {
        title: "Startup-Coaching & Beratung",
        description:
          "Präzises, vertrauenswürdiges und empathisches Startup-Coaching, Transformationsbegleitung und Enterprise-SaaS-UX-Unterstützung.",
      },
      about: {
        title: "Über Han Che",
        description:
          "Strukturierter Werdegang, Ausbildung, Zertifikate und Skills von Han Che auf Basis zentralisierter Quelldokumente.",
      },
    },
  },
  zh: {
    siteName: "Han Che",
    nav: { services: "服务", methods: "方法", about: "关于我" },
    headerCta: "Let's Meet",
    utilities: { language: "选择语言", menu: "菜单" },
    footer: "基于 Han Che 简历与 LinkedIn 源文档集中管理的多语言内容层。",
    home: {
      hero: {
        eyebrow: "创业辅导与咨询",
        title: "更清晰的创业叙事，更稳定的执行节奏，更好的产品决策。",
        description:
          "Han Che 结合创业辅导、工程领导力与 B2B 产品经验，帮助团队提升融资与销售表达、推进交付转型，并优化复杂企业软件体验。",
        primaryCta: "Let's Meet",
        secondaryCta: "查看简介",
        proofLabel: "为什么是 Han Che",
        proofTitle: "由工程、销售与国际业务经验支撑的辅导可信度。",
        proofPoints: [
          "为创业团队、学生创始人和公益组织累计提供 2,000+ 小时辅导。",
          "交付过 15 个全栈 Web 应用，包括大型 CMS 与 MES 企业级方案。",
          "经历覆盖工程管理、高级销售工程，以及亚太业务拓展。",
        ],
      },
      testimonials: {
        label: "参考评价",
        title: "首发阶段先使用 7 条明确标记的占位评价。",
        description:
          "这些 testimonial 当前仅用于版式与信息验证，均已明确标记为 mock，后续可逐条替换为已获批准的真实客户引言。",
        items: [
          {
            name: "Mock Founder A",
            role: "B2B SaaS 创始人",
            quote: "Han 帮我们把技术很强的产品，讲成了投资人真正能跟上的故事。",
            badge: "Mock",
          },
          {
            name: "Mock Product Lead B",
            role: "企业转型负责人",
            quote: "他为混乱的路线图带来了结构，也给了团队可以统一的语言。",
            badge: "Mock",
          },
          {
            name: "Mock CEO C",
            role: "工业软件公司",
            quote: "Han 很快就看出我们的 pitch、产品叙事和交付流程彼此打架的地方。",
            badge: "Mock",
          },
          {
            name: "Mock Program Manager D",
            role: "出行创新项目",
            quote: "他让跨职能沟通更锋利，却没有让协作变得更沉重。",
            badge: "Mock",
          },
          {
            name: "Mock Design Director E",
            role: "企业 UX 负责人",
            quote: "Han 非常擅长在信息架构、工程约束和高层沟通之间搭桥。",
            badge: "Mock",
          },
          {
            name: "Mock Startup Coach F",
            role: "孵化器合作伙伴",
            quote: "创始团队信任他，因为他既能挑战叙事，又保持同理心。",
            badge: "Mock",
          },
          {
            name: "Mock Sales Leader G",
            role: "企业增长顾问",
            quote: "他先澄清买方需要相信什么，再反向推导到产品与表达细节。",
            badge: "Mock",
          },
        ],
      },
      services: {
        label: "服务",
        title: "为需要更清晰叙事、更稳交付或更好企业 UX 的团队准备的三项核心服务。",
        description:
          "服务结构保持克制：一项聚焦叙事，一项聚焦交付转型，一项聚焦产品结构。",
        items: [
          {
            eyebrow: "01",
            title: "面向销售与融资的 Pitch 与 Storytelling Coaching",
            description:
              "帮助团队打磨融资、企业销售与演示叙事，让技术价值更容易被理解、记住并信服。",
            outcomes: [
              "澄清面向投资人、买方与内部利益相关者的核心故事。",
              "强化演示、证据点与叙事节奏。",
              "缩小产品真实能力与受众理解之间的落差。",
            ],
          },
          {
            eyebrow: "02",
            title: "走向 Spec-Driven Development 的（敏捷）转型",
            description:
              "帮助团队从模糊交接走向明确规格、平稳评审与更可靠的产品—工程协作。",
            outcomes: [
              "建立更清晰的需求表达、Peer Review 与交付节奏。",
              "减少由责任模糊和预期漂移带来的返工。",
              "形成可从单团队扩展到多团队的工作习惯。",
            ],
          },
          {
            eyebrow: "03",
            title: "面向 Enterprise SaaS 的 B2B UI/UX 与 IA",
            description:
              "优化复杂专家工具、内部平台与企业 SaaS 产品的信息架构、工作流与界面语言。",
            outcomes: [
              "把密集流程梳理成更容易理解的用户旅程。",
              "改进导航、页面层级与关键决策点。",
              "把业务复杂度转化为更平静的产品体验。",
            ],
          },
        ],
      },
      methods: {
        label: "方法",
        title: "以一个已批准真实方法和两个明确占位方法构成的实践模型。",
        description:
          "数据层已经区分真实方法与 mock 方法，后续替换占位内容时无需重构 UI。",
        items: [
          {
            eyebrow: "已批准",
            title: "Backward Chaining",
            description:
              "先从最关键的决策、证据点或目标结果出发，再一路反推，直到下一步可执行动作变得清晰。",
            detail:
              "适用于投资叙事、销售表达、路线图规划，以及在团队知道结果重要但不清楚顺序时的规格定义。",
            badge: "真实方法",
          },
          {
            eyebrow: "Mock",
            title: "Discovery Sprint",
            description:
              "用于短周期对齐冲刺的占位方法，聚焦在执行前看清约束、风险与利益相关者语言。",
            detail: "当前明确标记为 mock 内容。",
            badge: "Mock",
          },
          {
            eyebrow: "Mock",
            title: "Decision Mapping",
            description:
              "用于梳理产品、工程与 go-to-market 之间关键决策、依赖和证据点的占位方法。",
            detail: "当前明确标记为 mock 内容。",
            badge: "Mock",
          },
        ],
      },
      cta: {
        label: "Let's Meet",
        title: "如果你的团队需要更强叙事、更稳执行或更清晰的企业工作流，我们可以聊聊。",
        description: "第一次交流的目标是先厘清问题与支持层级，而不是套用标准化套餐。",
        button: "查看背景",
      },
    },
    about: {
      sidebar: {
        label: "关于 Han Che",
        title: "工程领导者、创业教练与跨职能操盘者。",
        description:
          "Han Che 常驻 Karlsruhe，长期工作在叙事表达、交付纪律与企业产品设计的交叉点，把辅导经验与一线软件领导实践结合在一起。",
        highlights: [
          "具备工程管理与 spec-driven delivery 推广经验",
          "自 2010 年起持续从事创业与公益辅导",
          "覆盖 Enterprise SaaS、工业 IoT 与出行产品领域",
        ],
        facts: [
          { label: "所在地", value: "Karlsruhe，巴登-符腾堡州，德国" },
          { label: "合作方式", value: "远程或混合协作" },
          { label: "语言", value: "德语、英语、中文（普通话）" },
        ],
        sourcesTitle: "源文档",
        sources: [
          {
            label: sourceDocuments["cv-2026"].label,
            detail: "主要用于摘要、经历、教育、证书、语言能力与核心技能整理。",
          },
          {
            label: sourceDocuments["linkedin-2026"].label,
            detail: "用于交叉验证公开定位、角色时间线与个人简介表达。",
          },
        ],
      },
      experience: {
        label: "经历",
        title: "工作经历",
        description: "将源文档内容结构化，避免页面继续依赖分散的自由文本。",
        items: [
          {
            company: "RIB Software",
            role: "Engineering Manager",
            period: "2025 年 12 月 – 至今",
            location: "远程",
            highlights: [
              "带领 6 人国际团队，推进并维护建筑行业专用内部 UI 组件。",
              "在多个团队中引入敏捷工作方式。",
              "在公司范围内推动 Peer Review、结对协作与 spec-driven development。",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Self-employed",
            role: "Startup & NPO Coaching",
            period: "2010 年 10 月 – 至今",
            location: "Karlsruhe / 远程",
            highlights: [
              "在学生组织与公益组织中累计 2,000+ 小时培训与辅导经验。",
              "自 2024 年起为 Karlsruhe 的学生创业团队提供辅导。",
              "合作 startup 包括 Nono、DeepSkill、Ayun，主题涵盖 pitch、商业模式、工程、storytelling 与战略。",
              "合作组织包括 Pioniergarage、Enactus、VWI/ESTIEM、Rotaract 与 Toastmasters。",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "autoiXpert GmbH & Co. KG",
            role: "Senior Software Engineer",
            period: "2025 年 9 月 – 2025 年 11 月",
            location: "远程",
            highlights: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "XL2 by Audi & Capgemini",
            role: "Senior Software Engineer",
            period: "2023 年 10 月 – 2025 年 8 月",
            location: "Heilbronn，德国",
            highlights: [
              "带领 7 人团队参与奥迪数百万欧元级数字化项目。",
              "技术栈覆盖 Angular、NestJS、GitHub Copilot、GraphQL、Postgres、AWS、React 与 Tailwind。",
              "建立统一的软件工程标准，并完成 15 场内部知识传递工作坊。",
              "承担中级到 Principal 级工程师的技术面试工作。",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Selfbits",
            role: "Senior Software Engineer / Senior Sales Engineer",
            period: "2018 年 4 月 – 2023 年 9 月",
            location: "德国",
            highlights: [
              "为工业 IoT 场景设计端到端功能，包括 OEE 仪表盘与资源调度。",
              "使用 Angular、Ionic、NestJS、Apollo、Postgres、Docker 与 Kubernetes。",
              "负责内部 Angular 组件库与 Figma 设计库。",
              "更早期的 Sales Engineering 工作覆盖 10+ 个 CMS、车队管理与电商应用，并支持销售与市场活动。",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            company: "Infobip",
            role: "Business Development Director Greater China",
            period: "2012 年 12 月 – 2015 年 9 月",
            location: "大中华区 / APAC",
            highlights: [
              "负责移动支付领域超过 30% 的全球收入，并签下 50+ 合同。",
              "在中国落地 2 个新办公室，并管理 10 人团队。",
              "从 Business Development Manager APAC 发展为 Business Development Director Greater China。",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
      education: {
        label: "教育",
        title: "教育背景",
        items: [
          {
            institution: "Karlsruhe Institute of Technology (KIT)",
            degree: "信息工程与管理，理学硕士",
            period: "2015 – 2018",
            details: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            institution: "Universität Karlsruhe (TH)",
            degree: "工业工程与管理，理学学士",
            period: "2008 – 2012",
            details: [],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
      certifications: {
        label: "证书",
        title: "证书与持续学习信号",
        items: [
          { title: "Deep entrepreneurship: manufacturing Europe's future", sourceDocumentIds: allSourceDocumentIds },
          { title: "UX Certification", sourceDocumentIds: allSourceDocumentIds },
          { title: "Six Sigma Green Belt", sourceDocumentIds: allSourceDocumentIds },
          { title: "ESTIEM Trainer", sourceDocumentIds: allSourceDocumentIds },
          { title: "Student Pupil Mathematics", sourceDocumentIds: allSourceDocumentIds },
        ],
      },
      skills: {
        label: "技能",
        title: "技能与领域",
        groups: [
          {
            title: "辅导与转型",
            items: [
              "软件工程实践",
              "Story Pitching",
              "演讲与表达能力",
              "Spec-Driven Development",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "产品与 UX",
            items: [
              "B2B UI/UX",
              "信息架构",
              "设计系统",
              "Figma 设计库维护",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "工程",
            items: [
              "Angular",
              "React",
              "Node.js / NestJS",
              "GraphQL",
              "Postgres",
              "AWS",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
          {
            title: "语言能力",
            items: [
              "德语 —— 母语或双语水平",
              "中文（普通话）—— 母语或双语水平",
              "英语 —— 专业工作水平",
            ],
            sourceDocumentIds: allSourceDocumentIds,
          },
        ],
      },
    },
    pages: {
      home: {
        title: "创业辅导与咨询",
        description:
          "以精准、可信、共情的方式提供创业辅导、交付转型支持与企业 SaaS UX 咨询。",
      },
      about: {
        title: "关于 Han Che",
        description:
          "基于集中化源文档整理的 Han Che 工作经历、教育背景、证书与技能信息。",
      },
    },
  },
} satisfies Record<Locale, SiteContent>;

export function getSiteContent(locale: Locale | string): SiteContent {
  return isLocale(locale) ? siteContent[locale] : siteContent[DEFAULT_LOCALE];
}