export type Person = {
  id: string;
  name: string;
  role: string;
  note?: string;
  avatarSeed?: string;
  email?: string;
  photo?: string;
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
      email: "victor_solano@trimble.com",
      photo: "/people/victor.webp",
    },
    buddies: [
      {
        id: "nawaz",
        name: "Mohammed Nawaz",
        role: "Staff UI/UX Designer",
        avatarSeed: "nawaz",
        email: "mohammed_nawaz@trimble.com",
        photo: "/people/nawaz.webp",
      },
      {
        id: "prashanth",
        name: "Prashanth Mathivanan",
        role: "Lead UI/UX Designer",
        avatarSeed: "prashanth",
        email: "prashanth_mathivanan@trimble.com",
        photo: "/people/prashanth.webp",
      },
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
      {
        id: "jessica-betha",
        name: "Jessica Bethá",
        role: "Sr. PX Business Partner",
        avatarSeed: "jessica-betha",
        email: "jessica_betha@trimble.com",
        photo: "/people/jessica-betha.webp",
      },
      {
        id: "chris-peppler",
        name: "Chris Peppler",
        role: "Vice President, Platform",
        note: "Sync on design impact across the org.",
        avatarSeed: "chris-peppler",
        email: "chris_peppler@trimble.com",
        photo: "/people/chris-peppler.webp",
      },
      {
        id: "mark",
        name: "Mark Schwartz",
        role: "Group President, AECO",
        avatarSeed: "mark-aeco",
        email: "mark_schwartz@trimble.com",
        photo: "/people/mark-schwartz.webp",
      },
    ],
    indiaLeadership: [
      {
        id: "rajan-iyer",
        name: "Rajan Aiyer",
        role: "Vice President & Managing Director, India",
        avatarSeed: "rajan-iyer",
        email: "rajan_aiyer@trimble.com",
        photo: "/people/rajan-aiyer.webp",
      },
      {
        id: "sudhir-kamath",
        name: "Sudhir Raghunath Kamath",
        role: "Senior Director, Finance",
        avatarSeed: "sudhir-kamath",
        email: "sudhir_kamath@trimble.com",
        photo: "/people/sudhir-kamath.webp",
      },
      {
        id: "murari-krishnan",
        name: "Murari Krishnan",
        role: "Sr. Director & Distinguished Engineer",
        avatarSeed: "murari-krishnan",
        email: "murari_krishnan@trimble.com",
        photo: "/people/murari-krishnan.webp",
      },
      {
        id: "vetrivel-shanmugam",
        name: "Vetrivel Shanmugasundaram",
        role: "Associate Vice President",
        avatarSeed: "vetrivel-shanmugam",
        email: "vetrivel_shanmugasundaram@trimble.com",
        photo: "/people/vetrivel-shanmugam.webp",
      },
      {
        id: "hari-kishore-sekar",
        name: "Hari Kishore Sekar",
        role: "Senior People Experience Business Partner",
        avatarSeed: "hari-kishore",
        email: "harikishore_sekar@trimble.com",
        photo: "/people/hari-kishore-sekar.webp",
      },
      {
        id: "dhanujnath",
        name: "Dhanujnath MP",
        role: "Director, Head of India PX",
        avatarSeed: "dhanujnath",
        email: "dhanujnath_mp@trimble.com",
        photo: "/people/dhanujnath.webp",
      },
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
            { id: "drives-chat", label: "Access to all drives & chat spaces", hint: "Shared team drives, Google Chat spaces, and any project-specific channels." },
            { id: "calendar", label: "Calendar", hint: "Trimble Google Calendar — recurring meetings and team rituals pre-loaded." },
            { id: "gmail", label: "Gmail", hint: "Trimble email account active and signed in." },
            { id: "gchat", label: "Google Chat", hint: "DMs and team spaces accessible." },
            { id: "okta", label: "Trimble Okta access", hint: "Confirm Jay can sign into all required tools through Okta SSO." },
            { id: "hardware", label: "Set up Jay's hardware", hint: "Laptop, peripherals, and any role-specific kit ready on day one." },
            { id: "charlie", label: "Introduction to Charlie", hint: "Trimble's intranet — leadership updates, org news, and where teams connect." },
            { id: "robs-updates", label: "Rob's Updates", hint: "Rob Painter's (CEO) recurring updates on Trimble's 2026 OKRs." },
            { id: "aeco", label: "AECO", hint: "Trimble's Architecture, Engineering, Construction & Owners segment — the industry vertical this team supports." },
          ],
        },
        {
          id: "welcome",
          title: "Welcome to the Team",
          items: [
            { id: "studio-prep", label: "Prep the studio for Jay's first day" },
            { id: "team-intros", label: "Introduce Jay to team members" },
            { id: "studio-tour", label: "Tour of the studio & office", hint: "Cover studio etiquette and team culture along the way." },
            {
              id: "chat-spaces",
              label: "Add Jay to chat spaces",
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
            { id: "tux-intro", label: "Orientation session", hint: "Trimble UX Global — the worldwide UX org TD APAC sits within." },
            { id: "tux-leadership", label: "Leadership meeting" },
            { id: "tux-1-1s", label: "1:1s with the leads" },
          ],
        },
        {
          id: "engagement",
          title: "Connect with Global Leadership",
          items: [
            { id: "eng-jessica", label: "Jessica Betha", hint: "TUX Global Leadership — meet & align." },
            { id: "eng-chris", label: "Chris Peppler — executive sync", hint: "Talk through how design moves the org forward." },
            { id: "eng-allhands", label: "All-hands — AECO Platform team" },
            { id: "eng-mark", label: "Ask Mark Anything", hint: "Recurring open forum with Mark from the AECO Platform team — bring questions." },
          ],
        },
        {
          id: "regional",
          title: "Regional Leadership — India",
          items: [
            { id: "reg-rajan", label: "Rajan Aiyer — Vice President & Managing Director, India" },
            { id: "reg-sudhir", label: "Sudhir Raghunath Kamath — Senior Director, Finance" },
            { id: "reg-murari", label: "Murari Krishnan — Sr. Director & Distinguished Engineer" },
            { id: "reg-vetrivel", label: "Vetrivel Shanmugasundaram — Associate Vice President" },
            { id: "reg-hari", label: "Hari Kishore Sekar — Senior People Experience Business Partner" },
            { id: "reg-dhanujnath", label: "Dhanujnath MP — Director, Head of India PX" },
          ],
        },
        {
          id: "team-engagement",
          title: "Team Engagement — Trimble Design APAC",
          items: [
            {
              id: "team-1-1s",
              label: "1:1s with each team member",
              hint: "Schedule at mutually convenient times with advance notice so the team can plan around them.",
            },
            { id: "team-coffee", label: "Team outing or coffee catch-up", hint: "Initiated by Jay — get to know the team pulse." },
            { id: "team-lunch", label: "Plan team lunch & informal hangouts" },
          ],
        },
        {
          id: "audit",
          title: "Fresh Eyes Audit & Understanding Users",
          items: [
            { id: "audit-review", label: "Review the current design language & product strategy" },
            { id: "audit-users", label: "Get to know Trimble's users, customers & sectors" },
            { id: "audit-fly", label: "Fly-on-the-wall observation", hint: "Sit in on team rituals — observe, don't interject." },
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
            { id: "ep-workday", label: "Workday", hint: "HR & payroll system — leave, benefits, personal info." },
            { id: "ep-gps-sync", label: "GPS Sync", hint: "Trimble's development & performance check-in — Growth, Priorities, Shared values." },
            { id: "ep-gsuite", label: "Google Workspace", hint: "Gmail, Calendar, Drive, Docs, Meet — the day-to-day collaboration suite." },
            { id: "ep-is", label: "IS Helpdesk", hint: "Information Systems — raise tickets here for IT, network, and software issues." },
            { id: "ep-license", label: "Licensing", hint: "Request and manage software licences." },
            { id: "ep-reimburse", label: "Reimbursements", hint: "Submit expense claims for travel, meals, and approved purchases." },
            { id: "ep-bravo", label: "Bravo", hint: "Trimble's recognition platform — give and receive shout-outs for great work." },
            { id: "ep-drive", label: "Team's Google Drive", hint: "Shared workspace for active and archived team work." },
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
            { id: "sr-ds", label: "Design system", hint: "Modus — Trimble's component library and design language." },
            { id: "sr-folders", label: "Team folders", hint: "Where active projects, archives, and shared assets live." },
            { id: "sr-etiquette", label: "Studio etiquette", hint: "How we work together in the space — meeting norms, focus time, shared rituals." },
            { id: "sr-figma", label: "Figma libraries" },
            { id: "sr-brand", label: "Brand guidelines" },
            { id: "sr-repo", label: "Access the team resource repo", hint: "Templates, references, and shared assets the team draws from." },
          ],
        },
        {
          id: "operational-audit",
          title: "Operational Audit",
          items: [
            {
              id: "oa-tools",
              label: "Audit team hardware, software & tools",
              hint: "Confirm everyone has what they need to do their best work.",
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
              label: "Roll out professional development materials",
              hint: "Boost team participation and lift craft quality.",
            },
          ],
        },
        {
          id: "check-in",
          title: "Team Check-in",
          items: [
            {
              id: "ci-survey",
              label: "Send team surveys",
              hint: "Gather feedback and keep improving how the team works.",
            },
          ],
        },
        {
          id: "roadmap",
          title: "Quarter Roadmap",
          items: [
            { id: "rm-roadmap", label: "Plan the team's quarterly design roadmap" },
          ],
        },
      ],
    },
  ],
};

export type Plan = typeof jayPlan;
