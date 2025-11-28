export const pl = {
  hero: {
    badge: "AI Lab",
    title: "Twórz eksperymenty bez opuszczania terminala.",
    subtitle:
      "Next.js App Router + Tailwind CSS są już gotowe. Wykorzystaj tę przestrzeń, by szkicować interfejsy, podłączać API i szybko dostarczać prototypy na ciemnym płótnie.",
  },
  tags: {
    next: "Next.js 16 · App Router",
    tailwind: "Tailwind CSS v4",
    typescript: "TypeScript gotowy",
  },
  quickLinks: {
    setup: {
      title: "Konfiguracja projektu",
      description:
        "Poznaj App Router, współdzielone layouty i wzorce routingu przygotowane pod eksperymenty.",
      linkLabel: "Dokumentacja App Router",
    },
    styling: {
      title: "Stylowanie",
      description:
        "Tailwind CSS v4 jest gotowy. Dodawaj tokeny designu lub styluj utilitami tam, gdzie potrzebujesz.",
      linkLabel: "Dokumentacja Tailwind",
    },
    api: {
      title: "API i dane",
      description:
        "Trasy edge, cache i strumieniowanie pomagają szybko dostarczać backend razem z UI.",
      linkLabel: "Route handlers",
    },
    deploy: {
      title: "Wdrażanie",
      description:
        "Wdrażaj na Vercel lub własnej infrastrukturze. Podglądy przyspieszają eksperymenty.",
      linkLabel: "Platforma Vercel",
    },
  },
  checklist: {
    label: "Pierwsze kroki",
    title: "Twój zestaw startowy",
    item1: "Zacznij od trasy w app/ i iteruj z dev-serwerem.",
    item2: "Wspólne UI przenieś do components/ i styluj utilitami Tailwind.",
    item3: "Tokeny designu i dodatkowe warstwy trzymaj w styles/ wraz ze wzrostem projektu.",
    cta: "Przeglądaj przykłady →",
  },
  about: {
    title: "Po co jest to laboratorium",
    body: "Skupiona przestrzeń do szybkiego dostarczania eksperymentów. Łącz szkice UI, prototypy AI i trasy danych bez zmiany kontekstu. Tylko to, czego potrzebujesz, aby ruszać naprzód.",
  },
  projects: {
    title: "Przykładowe tory",
    items: {
      pulse: {
        name: "Pulse Console",
        description: "Twórz szybkie pomysły na interfejsy z wspólnymi tokenami i blokami.",
      },
      stream: {
        name: "Streamline APIs",
        description: "Trasy API, cache i webhooks dla szybkich integracji.",
      },
      synth: {
        name: "Synth Demos",
        description: "Podłącz przepływy z LLM, interfejsy czatu i ewaluacje w kilka minut.",
      },
      ops: {
        name: "Ops Surface",
        description: "Pulpity do wdrożeń, obserwowalności i śledzenia eksperymentów.",
      },
    },
  },
  aiAssistant: {
    title: "Asystent AI",
    body: "Użyj wbudowanego agenta do szkicowania tras, generowania promptów i seryjnego tworzenia stanów UI. Człowiek zostaje w pętli, aby dostarczać pewnie.",
    cta: "Otwórz asystenta",
    inputPlaceholder: "Wpisz wiadomość...",
    send: "Wyślij",
    replies: [
      "Oto punkt startowy. Zmień prompt i iteruj.",
      "Spróbuj buforować odpowiedzi, aby przyspieszyć przepływ.",
      "Strumieniowanie częściowych wyników utrzyma szybkie UI.",
      "Najpierw dostarcz najprostszy wariant, potem domknij szczegóły.",
    ],
  },
  contact: {
    title: "Bądźmy w kontakcie",
    body: "Pytania, pomysły, współpraca? Daj znać, pomożemy popchnąć eksperyment dalej.",
    cta: "Napisz",
    form: {
      name: "Imię",
      email: "Email",
      message: "Wiadomość",
      submit: "Wyślij wiadomość",
      placeholders: {
        name: "Twoje imię",
        email: "you@example.com",
        message: "Opowiedz o pomyśle…",
      },
      success: "Wiadomość gotowa! (Backendu brak — dodaj swój endpoint, aby wysłać.)",
      errors: {
        name: "Imię jest wymagane.",
        email: "Podaj poprawny email.",
        message: "Dodaj krótką wiadomość.",
      },
    },
  },
} as const;
