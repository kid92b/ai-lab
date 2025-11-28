export const en = {
  hero: {
    badge: "AI Lab",
    title: "Build experiments without leaving the command line.",
    subtitle:
      "Next.js App Router + Tailwind CSS are prewired. Use this workspace to sketch UI ideas, wire up API routes, and ship proof-of-concepts quickly on a dark canvas.",
  },
  tags: {
    next: "Next.js 16 · App Router",
    tailwind: "Tailwind CSS v4",
    typescript: "TypeScript ready",
  },
  quickLinks: {
    setup: {
      title: "Project setup",
      description:
        "Explore the App Router, shared layouts, and routing patterns tailored for experiments.",
      linkLabel: "App Router docs",
    },
    styling: {
      title: "Styling",
      description:
        "Tailwind CSS v4 is ready to go. Add design tokens or layer in utility-first styling anywhere.",
      linkLabel: "Tailwind docs",
    },
    api: {
      title: "APIs & data",
      description:
        "Edge-ready routes, caching, and streaming responses help you ship fast backends alongside UI.",
      linkLabel: "Route handlers",
    },
    deploy: {
      title: "Deployment",
      description:
        "Deploy to Vercel or your own infra. Preview builds keep experiments moving without friction.",
      linkLabel: "Vercel platform",
    },
  },
  checklist: {
    label: "First steps",
    title: "Your starter checklist",
    item1: "Sketch your first route in app/ and iterate with the dev server.",
    item2: "Drop shared UI into components/ and keep styling lean with Tailwind utilities.",
    item3: "Keep design tokens or additional layers inside styles/ as the system grows.",
    cta: "Browse examples →",
  },
  about: {
    title: "Why this lab exists",
    body: "A focused sandbox to ship experiments fast. Mix UI sketches, AI prototypes, and data routes without context switching. Keep everything minimal, with just the essentials you need to move.",
  },
  projects: {
    title: "Sample tracks",
    items: {
      pulse: {
        name: "Pulse Console",
        description: "Craft rapid interface ideas with shared tokens and reusable blocks.",
      },
      stream: {
        name: "Streamline APIs",
        description: "Streamlined API routes, caching, and webhooks for quick integrations.",
      },
      synth: {
        name: "Synth Demos",
        description: "Wire up LLM-powered flows, chat UIs, and evaluation loops in minutes.",
      },
      ops: {
        name: "Ops Surface",
        description: "Dashboards for shipping, observability, and experiment tracking.",
      },
    },
  },
  aiAssistant: {
    title: "AI assistant",
    body: "Use an embedded agent to scaffold routes, generate prompts, or batch-create UI states. Keep humans in the loop and ship confidently.",
    cta: "Open the assistant",
    inputPlaceholder: "Type a message...",
    send: "Send",
    replies: [
      "Here's a starting point. Adjust the prompt and iterate.",
      "Consider caching the response to speed up your flow.",
      "Try streaming partial results to keep the UI responsive.",
      "Ship the simplest version first, then harden the edge cases.",
    ],
  },
  contact: {
    title: "Stay in touch",
    body: "Questions, ideas, or collaboration? Drop a note and let's move your experiment forward.",
    cta: "Say hello",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      placeholders: {
        name: "Your name",
        email: "you@example.com",
        message: "Tell us about your idea…",
      },
      success: "Message ready! (No backend yet—add your endpoint to send.)",
      errors: {
        name: "Name is required.",
        email: "Valid email is required.",
        message: "Please add a short message.",
      },
    },
  },
} as const;
