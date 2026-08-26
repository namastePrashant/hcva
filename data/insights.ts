export type Insight = {
  slug: string; category: string; title: string; dek: string; date: string; readTime: string;
  takeaways: string[]; sections: { heading: string; paragraphs: string[] }[]; sources: { label: string; url: string }[];
};

export const insights: Insight[] = [
  {
    slug: "nepal-digital-payments-humanitarian-cash",
    category: "Nepal & South Asia", title: "Nepal’s digital payments ecosystem is ready for more humanitarian ambition",
    dek: "What humanitarian teams should consider when connecting preparedness, financial inclusion and last-mile cash delivery in Nepal.", date: "26 August 2026", readTime: "6 min read",
    takeaways: ["Design for assisted access—not only smartphone users.", "Map agent liquidity and connectivity before a crisis.", "Treat financial literacy and safeguarding as delivery infrastructure."],
    sections: [
      { heading: "A strong foundation, uneven access", paragraphs: ["Nepal’s expanding digital-payment ecosystem creates real opportunities for faster and more accountable assistance. The operational question is not simply whether a wallet exists, but whether crisis-affected people can register, authenticate, reach an agent and use funds safely.", "Preparedness work should segment users by connectivity, documentation, accessibility and confidence. That makes it possible to preserve choice while providing assisted pathways for people who may otherwise be excluded."] },
      { heading: "Readiness starts before procurement", paragraphs: ["Humanitarian organisations can pre-map providers, agents, cash-out capacity and escalation routes. Scenario-based stress tests are especially useful: they reveal what happens when roads close, networks fail or a sudden transfer creates a local liquidity shock.", "Shared minimum data standards and clear roles between programme, finance, protection and technology teams reduce the chance that digital delivery becomes a late-stage technical decision."] },
      { heading: "A regional opportunity", paragraphs: ["Nepal can become a practical learning centre for responsible digital CVA in South Asia. Local technology capability, humanitarian experience and an active payment ecosystem make it possible to test approaches that are locally grounded and regionally relevant."] },
    ],
    sources: [{ label: "GSMA humanitarian impact", url: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/impact-report/humanitarian/" }, { label: "GSMA mobile money and CVA", url: "https://www.gsma.com/solutions-and-impact/connectivity-for-good/mobile-for-development/programme/mobile-for-humanitarian-innovation/is-mobile-money-the-future-of-cash-and-voucher-assistance/" }],
  },
  {
    slug: "cash-readiness-beyond-a-checklist",
    category: "Preparedness", title: "Cash readiness is a living operating model—not a checklist",
    dek: "Five capabilities that turn organisational intent into timely, safe and scalable cash delivery.", date: "19 August 2026", readTime: "5 min read",
    takeaways: ["Give readiness an accountable owner.", "Test workflows end to end.", "Update provider and market assumptions regularly."],
    sections: [
      { heading: "From document to capability", paragraphs: ["A readiness assessment is valuable when it changes how an organisation works. Policies, templates and agreements need named owners, review dates and a place in real operating routines.", "The most revealing test is an end-to-end simulation—from targeting and consent through payment approval, reconciliation, complaints and incident escalation."] },
      { heading: "Five connected building blocks", paragraphs: ["Strong readiness links governance, programme design, operations, information management and partnerships. Weakness in any one area can slow the entire response or transfer risk to communities.", "Teams should maintain a practical improvement backlog and prioritise the constraints most likely to affect speed, inclusion or safety in their context."] },
      { heading: "Make learning continuous", paragraphs: ["After-action reviews, provider performance and community feedback should feed directly into revised procedures and training. Readiness is best understood as a cycle of testing, learning and improvement."] },
    ],
    sources: [{ label: "Cash Hub basic CVA readiness checklist", url: "https://cash-hub.org/resource/checklist-for-basic-cash-and-voucher-assistance-cva-readiness/" }, { label: "CALP organisational cash readiness tool", url: "https://www.calpnetwork.org/publication/organizational-cash-readiness-tool-ocrt-process-guide/" }],
  },
  {
    slug: "responsible-data-cva-digital-systems",
    category: "Digital CVA", title: "Responsible data must be designed into CVA systems",
    dek: "A practical way to connect data minimisation, access controls and community accountability across the transfer cycle.", date: "12 August 2026", readTime: "7 min read",
    takeaways: ["Collect only data tied to a defined decision.", "Map access across every system and partner.", "Plan retention, deletion and incident response early."],
    sections: [
      { heading: "Start with purpose", paragraphs: ["Every field in a registration form should have a clear operational purpose. Data minimisation reduces exposure, simplifies workflows and makes it easier to explain processing to affected people.", "Consent is not a substitute for good system design. Teams must consider power imbalances, legal bases, retention and the realistic choices available to people seeking assistance."] },
      { heading: "Follow the data journey", paragraphs: ["Risk often appears at hand-offs: spreadsheets exported for verification, files shared with providers or accounts that remain active after staff move roles. A data-flow map exposes these points and makes ownership visible.", "Role-based access, audit trails, encryption and tested incident procedures are most effective when matched with staff practice and partner agreements."] },
      { heading: "Accountability includes explanation", paragraphs: ["People should be able to understand what is collected, why, who receives it and how to raise a concern. Feedback mechanisms need to cover digital and data harms—not only payment problems."] },
    ],
    sources: [{ label: "CALP Data Responsibility Toolkit", url: "https://www.calpnetwork.org/collection/data-responsibility-toolkit-and-case-studies/" }, { label: "Cash Hub IM and technology resources", url: "https://cash-hub.org/resources/im-and-technology/" }],
  },
  {
    slug: "anticipatory-action-cash-design-questions",
    category: "Anticipatory action", title: "Cash before a crisis: the design questions that matter",
    dek: "Anticipatory cash succeeds when triggers, financing, delivery readiness and community communication work as one system.", date: "5 August 2026", readTime: "5 min read",
    takeaways: ["Link triggers to feasible delivery timelines.", "Pre-position decisions—not only contracts.", "Explain uncertainty clearly to communities."],
    sections: [
      { heading: "Timing changes the design", paragraphs: ["Anticipatory action works within a narrow window between forecast and impact. Transfer value, targeting and delivery choices must therefore be tested against the time genuinely available.", "A technically accurate trigger is not enough if approvals, lists or provider onboarding cannot move at the same speed."] },
      { heading: "Prepared systems make early action possible", paragraphs: ["Pre-agreed roles, financing rules, communication templates and fallback mechanisms reduce delay. Teams also need to understand how markets and household priorities may change as a threat becomes more certain."] },
      { heading: "Build trust around uncertainty", paragraphs: ["Forecast-based action involves uncertainty. Clear communication about selection, timing and what happens if a forecast changes is essential for accountability and trust."] },
    ],
    sources: [{ label: "Cash Hub", url: "https://cash-hub.org/" }, { label: "CALP key resources", url: "https://www.calpnetwork.org/uk/key-resources/" }],
  },
];
