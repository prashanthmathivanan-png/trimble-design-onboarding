export type Person = {
  id: string;
  name: string;
  role: string;
  note?: string;
  avatarSeed?: string;
};

export type ChecklistItem = {
  id: string;
  label: string;
  hint?: string;
  children?: ChecklistItem[];
};

export type ChecklistGroup = {
  id: string;
  title: string;
  blurb?: string;
  items: ChecklistItem[];
};

export type Chapter = {
  slug: "learn" | "level" | "lead";
  number: "01" | "02" | "03";
  duration: string;
  title: string;
  verb: "Learn" | "Level" | "Lead";
  tagline: string;
  summary: string;
  heroImage: string;
  groups: ChecklistGroup[];
};

export type OnboardingPlan = {
  person: {
    firstName: string;
    title: string;
    reportsTo: Person;
    buddies: Person[];
  };
  team: {
    name: string;
    about: string;
    mission: { title: string; body: string };
    vision: { title: string; body: string };
    strategy: { title: string; body: string; pillars: { name: string; body: string }[] };
  };
  leaders: {
    tuxGlobal: Person[];
    indiaLeadership: Person[];
  };
  chapters: Chapter[];
};

export const jayPlan: OnboardingPlan = {
  person: {
    firstName: "Jay",
    title: "Senior UX Design Manager — Trimble Design APAC",
    reportsTo: {
      id: "victor",
      name: "Victor Solano",
      role: "Global Director, Trimble UX",
      avatarSeed: "victor-solano",
    },
    buddies: [
      { id: "nawaz", name: "Nawaz", role: "Trimble Design APAC", avatarSeed: "nawaz" },
      { id: "prashanth", name: "Prashanth", role: "Trimble Design APAC", avatarSeed: "prashanth" },
    ],
  },
  team: {
    name: "Trimble Design APAC",
    about:
      "We are a group of strategic thinkers and high-talent creators who believe that design bridges between vision and reality for Trimble. Based in the heart of the world's most dynamic region, we bring together diverse perspectives to solve complex problems with precision. We don't just make — we strategize. By blending deep user insights and domain expertise with a global standard of excellence, we transform fragmented challenges into unified, world-class product experiences.",
    mission: {
      title: "Accelerate Trimble's impact through radical collaboration and high-velocity shipping.",
      body: "We innovate with intentionality. We leverage diverse backgrounds and a rigorous culture of design critiques to ensure what we ship is not only functional but transformative. We bridge the gap between 'what is' and 'what's next' by moving fast, staying lean, and prioritizing cohesive user journeys.",
    },
    vision: {
      title: "Define the North Star for Trimble's digital ecosystem through timeless, unified design.",
      body: "We envision a future where the APAC Team is the catalyst for a seamless Trimble experience. We look through a strategic lens to create design solutions that transcend individual products — shaping a cohesive, intuitive, and enduring ecosystem that empowers our customers to work better, faster, and more sustainably.",
    },
    strategy: {
      title: "Evolving at the speed of the world to set the global standard.",
      body: "To achieve our vision, we focus on three strategic pillars:",
      pillars: [
        {
          name: "The Power of Perspective",
          body: "Cultivating a multidisciplinary environment where design critiques and diverse viewpoints elevate our output to a global standard.",
        },
        {
          name: "Unified Velocity",
          body: "Streamlining our ways of working to ensure that speed never compromises cohesion. We build systems that allow us to ship at pace without losing the 'big picture' intent.",
        },
        {
          name: "Continuous Evolution",
          body: "Committing to a growth mindset where we adapt our craft daily, ensuring our design language and technical execution remain at the forefront of the global design landscape.",
        },
      ],
    },
  },
  leaders: {
    tuxGlobal: [
      { id: "jessica-betha", name: "Jessica Betha", role: "TUX Global Leadership", avatarSeed: "jessica-betha" },
      { id: "chris-peppler", name: "Chris Peppler", role: "Executive Leadership", note: "Sync on design impact across the org.", avatarSeed: "chris-peppler" },
      { id: "mark", name: "Mark", role: "AECO Platform Team — Ask Mark Anything", avatarSeed: "mark-aeco" },
    ],
    indiaLeadership: [
      { id: "rajan-iyer", name: "Rajan Iyer", role: "Vice President, Managing Director", avatarSeed: "rajan-iyer" },
      { id: "sudhir-kamath", name: "Sudhir Kamath", role: "Senior Director, Finance", avatarSeed: "sudhir-kamath" },
      { id: "murari-krishnan", name: "Murari Krishnan", role: "CPD", avatarSeed: "murari-krishnan" },
      { id: "vetrivel-shanmugam", name: "Vetrivel Shanmugam", role: "O&PS", avatarSeed: "vetrivel-shanmugam" },
      { id: "hari-kishore-sekar", name: "Hari Kishore Sekar", role: "HR", avatarSeed: "hari-kishore" },
      { id: "dhanujnath", name: "Dhanujnath", role: "HR", avatarSeed: "dhanujnath" },
    ],
  },
  chapters: [
    {
      slug: "learn",
      number: "01",
      duration: "30 Days",
      verb: "Learn",
      title: "The Listening Tour & Immersion",
      tagline: "Introduction and understanding internal culture.",
      summary:
        "Step into the studio, meet the people, and absorb how Trimble Design APAC thinks. Less doing, more listening — deliberately.",
      heroImage: "/images/learn.jpeg",
      groups: [
        {
          id: "access",
          title: "Access & Hardware",
          blurb: "Make sure Jay can simply do the work on day one.",
          items: [
            { id: "drives-chat", label: "Access to all drives and chat spaces" },
            { id: "calendar", label: "Calendar" },
            { id: "gmail", label: "Gmail" },
            { id: "gchat", label: "Google Chat" },
            { id: "okta", label: "Trimble Okta login", hint: "Confirm access to tools & software" },
            { id: "hardware", label: "Ensure the manager has the specific hardware" },
            { id: "charlie", label: "Introduction to Charlie" },
            { id: "robs-updates", label: "Rob's Updates" },
            { id: "aeco", label: "AECO" },
          ],
        },
        {
          id: "welcome",
          title: "Welcome to the Team",
          items: [
            { id: "studio-prep", label: "Welcoming Jay to the team", hint: "Prep the studio space and welcoming arrangements" },
            { id: "team-intros", label: "Introduction to team members" },
            { id: "studio-tour", label: "Tour around the studio and office space", hint: "Studio etiquettes and culture" },
            {
              id: "chat-spaces",
              label: "Adding Jay to the chat spaces",
              children: [
                { id: "cs-tdi", label: "Trimble Design India" },
                { id: "cs-tdg", label: "Trimble Design Global" },
                { id: "cs-tux", label: "Trimble UX Group" },
                { id: "cs-modus", label: "Modus Design System" },
              ],
            },
          ],
        },
        {
          id: "tux-global",
          title: "Welcome to TUX Global",
          items: [
            { id: "tux-intro", label: "Introduction to TUX Global" },
            { id: "tux-leadership", label: "Leadership meeting — TUX Global" },
            { id: "tux-1-1s", label: "1:1 with the leaders of TUX Global" },
          ],
        },
        {
          id: "engagement",
          title: "Engagement with Global Leadership",
          items: [
            { id: "eng-jessica", label: "Jessica Betha" },
            { id: "eng-chris", label: "Chris Peppler — Executive sync", hint: "Align on the impact of design within the organization" },
            { id: "eng-allhands", label: "All hands — AECO Platform team" },
            { id: "eng-mark", label: "Ask Mark Anything" },
          ],
        },
        {
          id: "regional",
          title: "Regional Leadership — India",
          items: [
            { id: "reg-rajan", label: "Rajan Iyer — Vice President Managing Director" },
            { id: "reg-sudhir", label: "Sudhir Kamath — Senior Director Finance" },
            { id: "reg-murari", label: "CPD: Murari Krishnan" },
            { id: "reg-vetrivel", label: "O&PS: Vetrivel Shanmugam" },
            { id: "reg-hari", label: "HR: Hari Kishore Sekar" },
            { id: "reg-dhanujnath", label: "HR: Dhanujnath" },
          ],
        },
        {
          id: "team-engagement",
          title: "Team Engagement — Trimble Design APAC",
          items: [
            {
              id: "team-1-1s",
              label: "1:1s with all team members",
              hint: "Schedule at mutually convenient times with advance notice to help the team manage their daily schedules.",
            },
            { id: "team-coffee", label: "Team outing or coffee times", hint: "Initiated by Jay — get to know the team pulse." },
            { id: "team-lunch", label: "Arrange for team lunch and informal activities" },
          ],
        },
        {
          id: "audit",
          title: "Fresh Eyes Audit & Understanding Users",
          items: [
            { id: "audit-review", label: "Perform a high-level review of our current design language and product strategy" },
            { id: "audit-users", label: "Understanding Trimble's users, customers, and operational sectors" },
            { id: "audit-fly", label: "Fly on the wall observation" },
          ],
        },
      ],
    },
    {
      slug: "level",
      number: "02",
      duration: "60 Days",
      verb: "Level",
      title: "Mastering the Tools, Rituals & Team Health",
      tagline: "Get fluent in the systems that let the team ship.",
      summary:
        "Fully onboarded to every portal, tool, and ritual. Now we're looking for the first quick wins that raise the floor for everyone.",
      heroImage: "/images/level.jpg",
      groups: [
        {
          id: "employee-portal",
          title: "Employee Portal & Tools",
          items: [
            { id: "ep-workday", label: "Workday" },
            { id: "ep-gps-sync", label: "GPS Sync" },
            { id: "ep-gsuite", label: "Google Suite" },
            { id: "ep-is", label: "IS Helpdesk" },
            { id: "ep-license", label: "Licensing" },
            { id: "ep-reimburse", label: "Reimbursement" },
            { id: "ep-bravo", label: "Bravo" },
            { id: "ep-drive", label: "Team's Google Drive" },
          ],
        },
        {
          id: "design-tools",
          title: "Design Tools",
          items: [
            { id: "dt-miro", label: "Miro" },
            { id: "dt-figma", label: "Figma" },
            { id: "dt-cursor", label: "Cursor" },
          ],
        },
        {
          id: "studio-resources",
          title: "Studio & System",
          items: [
            { id: "sr-ds", label: "Design system" },
            { id: "sr-folders", label: "Team folders" },
            { id: "sr-etiquette", label: "Studio etiquettes" },
            { id: "sr-figma", label: "Figma libraries" },
            { id: "sr-brand", label: "Brand guidelines" },
            { id: "sr-repo", label: "Access to resource repository" },
          ],
        },
        {
          id: "operational-audit",
          title: "Operational Audit",
          items: [
            {
              id: "oa-tools",
              label: "Ensure the team has the right hardware, software, and tools to succeed",
            },
          ],
        },
        {
          id: "quick-wins",
          title: "Quick Wins",
          items: [
            {
              id: "qw-handoff",
              label: "Identify opportunities for quick wins",
              hint: "e.g. a simple, clean solution for the \"Design-to-Dev\" handoff.",
            },
          ],
        },
      ],
    },
    {
      slug: "lead",
      number: "03",
      duration: "90 Days",
      verb: "Lead",
      title: "Empowering Leader, Strategic Ownership & Long-term Vision",
      tagline: "Set the direction. Ship the quarter.",
      summary:
        "From informed observer to empowered leader. Jay owns the roadmap, runs the rituals, and defines what great looks like for the next quarter.",
      heroImage: "/images/lead.jpg",
      groups: [
        {
          id: "dev",
          title: "Professional Development",
          items: [
            {
              id: "dev-upgrade",
              label: "Leverage upgrade and professional development materials",
              hint: "Drive team participation and craft excellence.",
            },
          ],
        },
        {
          id: "check-in",
          title: "Team Check-in",
          items: [
            {
              id: "ci-survey",
              label: "Issue User Surveys to the design team",
              hint: "Gather feedback and continuously improve internal processes.",
            },
          ],
        },
        {
          id: "roadmap",
          title: "Quarter Roadmap",
          items: [
            { id: "rm-roadmap", label: "Design roadmap for the team for the upcoming quarter" },
          ],
        },
      ],
    },
  ],
};

export type Plan = typeof jayPlan;
