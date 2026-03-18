export const bundledSourceDocuments = {
  "cv-2026": {
    repositoryPath: "src/content/bundled-source-documents.ts",
    markdown: `# Han Che

## Summary
- Engineering Manager and senior software engineer with UX + frontend focus, founding-engineer experience, and technical team-lead background.
- Designed and delivered 15 full-stack web applications across Angular, React, and Node.js, including large CMS and MES SaaS systems.
- Led teams up to 10 people, mentored more than 20 juniors and interns, and combines engineering leadership with startup coaching.

## Top Skills
- Software Engineering Practices
- Story Pitching
- Presentation Skills
- German, Chinese (Mandarin), and English across professional contexts

## Certifications
- Deep entrepreneurship: manufacturing Europe's future
- UX Certification
- Six Sigma Green Belt
- ESTIEM Trainer

## Experience
### RIB Software
- Engineering Manager, December 2025 – Present, Remote
- Leading an international team of 6 developers for specialized in-house UI components.
- Introducing agile ways of working, peer review, peer programming, and spec-driven development across teams.

### Self-employed
- Startup & NPO Coaching, October 2010 – Present
- More than 2,000 coaching hours for student founders and nonprofit organizations.
- Startup clients include Nono, DeepSkill, and Ayun across pitching, storytelling, strategy, business model, and engineering topics.

### XL2 by Audi & Capgemini
- Senior Software Engineer, October 2023 – August 2025, Heilbronn, Germany
- Led a 7-member team for a multi-million Euro Audi digitization program.
- Stack included Angular, NestJS, GraphQL, Postgres, AWS, React, and Tailwind.

### Selfbits
- Senior Software Engineer, September 2020 – September 2023
- Built industrial IoT features such as OEE dashboards and resource scheduling.
- Managed Angular component-library and design-system work; earlier also supported sales engineering and application design.

### Infobip
- Business Development Director Greater China, April 2014 – September 2015
- Responsible for more than 30% of global mobile-payments revenue and closed 50+ contracts.

## Education
- Karlsruhe Institute of Technology (KIT): M.S., Information Engineering and Management (2015 – 2018)
- Universität Karlsruhe (TH): B.Sc., Industrial Engineering and Management (2008 – 2012)
`,
  },
  "linkedin-2026": {
    repositoryPath: "src/content/bundled-source-documents.ts",
    markdown: `# Han Che

## Summary
- Public profile centered on startup coaching, engineering leadership, and B2B product execution.
- Focus areas include storytelling for fundraising and enterprise sales, spec-driven delivery transformation, and enterprise SaaS UX improvement.

## Experience Highlights
### Self-employed
- Startup & NPO Coaching since October 2010.
- Coaching student start-ups in Karlsruhe since 2024 and supporting organizations such as Pioniergarage, Enactus, VWI/ESTIEM, Rotaract, and Toastmasters.

### RIB Software
- Engineering Manager leading distributed UI-component work for the construction industry and scaling agile engineering practices.

### XL2 by Audi & Capgemini
- Senior Software Engineer leading enterprise digitization delivery, internal standards, and technical interviews.

### Infobip
- Business Development leadership across Greater China and APAC with office launches and regional team management.

## Education
- KIT M.S. in Information Engineering and Management.
- Universität Karlsruhe (TH) B.Sc. in Industrial Engineering and Management.

## Certifications
- UX Certification
- Six Sigma Green Belt
- ESTIEM Trainer
`,
  },
} as const;

export function getBundledSourceDocumentMarkdown(documentId: keyof typeof bundledSourceDocuments) {
  return bundledSourceDocuments[documentId].markdown;
}