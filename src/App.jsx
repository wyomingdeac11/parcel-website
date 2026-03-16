import React, { useState, useEffect, useCallback } from "react";

// ─── Configuration ───────────────────────────────────────────────
const FORMSPREE_ID = "YOUR_FORMSPREE_ID"; // Replace with your Formspree form ID
const FORMSPREE_URL = `https://formspree.io/f/${FORMSPREE_ID}`;

// ─── Budget Mappings ─────────────────────────────────────────────
const BUDGET_MAP = {
  "Under $5,000/month": {
    traditional: "$750K–$900K",
    parcel: "$1.1M–$1.5M",
  },
  "$5,000–$6,500/month": {
    traditional: "$900K–$1.1M",
    parcel: "$1.5M–$1.8M",
  },
  "$6,500–$8,000/month": {
    traditional: "$1.1M–$1.4M",
    parcel: "$1.8M–$2.2M",
  },
  "$8,000–$9,500/month": {
    traditional: "$1.4M–$1.7M",
    parcel: "$2.2M–$2.6M",
  },
  "$9,500+/month": {
    traditional: "$1.7M+",
    parcel: "$2.6M+",
  },
};

// ─── App ─────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // landing | buyer | owner
  const [transitioning, setTransitioning] = useState(false);
  const [visible, setVisible] = useState(true);

  const navigate = useCallback(
    (to) => {
      if (to === view) return;
      setVisible(false);
      setTransitioning(true);
      setTimeout(() => {
        setView(to);
        window.scrollTo(0, 0);
        setTimeout(() => {
          setVisible(true);
          setTransitioning(false);
        }, 50);
      }, 350);
    },
    [view]
  );

  return (
    <div className="min-h-screen bg-white">
      <div
        className={`transition-opacity duration-[350ms] ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        {view === "landing" && <Landing navigate={navigate} />}
        {view === "buyer" && <BuyerFlow navigate={navigate} />}
        {view === "owner" && <OwnerPanel navigate={navigate} />}
      </div>
    </div>
  );
}

// ─── Landing ─────────────────────────────────────────────────────
function Landing({ navigate }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleWaitlist = async (e) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          inquiry_type: "waitlist_quick",
          submitted_at: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Wordmark */}
      <div className="absolute top-8 left-8 md:top-10 md:left-12">
        <span className="font-display text-[1.5rem] md:text-[1.75rem] tracking-[-0.01em] text-[#1a1a1a]">
          Parcel
        </span>
      </div>

      {/* Center content */}
      <div className="w-full max-w-xl flex flex-col items-center text-center -mt-8">
        {/* Headline */}
        <h1 className="font-display text-[2.25rem] md:text-[3.25rem] leading-[1.1] tracking-[-0.02em] text-[#1a1a1a] mb-4 md:mb-5">
          A new way to own
          <br />
          in Santa Barbara.
        </h1>
        <p className="text-[1rem] md:text-[1.1rem] text-[#888] tracking-[-0.01em] mb-8 md:mb-10">
          Own the home. Rent the land.
        </p>

        {/* Waitlist */}
        {!submitted ? (
          <form
            onSubmit={handleWaitlist}
            className="w-full max-w-md flex flex-col sm:flex-row gap-3 mb-6"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 px-5 py-3.5 border border-[#ddd] rounded-lg text-[0.95rem] font-sans
                         focus:border-[#E8651A] transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3.5 bg-[#E8651A] hover:bg-[#D45A15] text-white rounded-lg
                         text-[0.95rem] font-medium tracking-[-0.01em]
                         transition-colors duration-200 whitespace-nowrap"
            >
              {submitting ? "Joining..." : "Join the Waitlist"}
            </button>
          </form>
        ) : (
          <div className="mb-6 py-3.5 text-[#E8651A] font-medium text-[0.95rem]">
            You're on the list.
          </div>
        )}

        {/* Supporting copy */}
        <p className="text-[0.9rem] md:text-[0.95rem] leading-relaxed text-[#888] max-w-sm mb-12 md:mb-14">
          Join the waitlist for first access to new Parcel homes.
          <br className="hidden sm:block" />{" "}
          If you eventually buy a Parcel home and stay six years,
          <br className="hidden sm:block" /> your seventh year of ground lease
          is on us.
        </p>

        {/* Fork */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
          <button
            onClick={() => navigate("buyer")}
            className="group flex items-center gap-2 text-[#1a1a1a] hover:text-[#E8651A] transition-colors duration-200"
          >
            <span className="text-[0.95rem] tracking-[-0.01em]">
              I want to buy
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
          <button
            onClick={() => navigate("owner")}
            className="group flex items-center gap-2 text-[#1a1a1a] hover:text-[#E8651A] transition-colors duration-200"
          >
            <span className="text-[0.95rem] tracking-[-0.01em]">
              I'm a homeowner
            </span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 text-[0.75rem] text-[#bbb] tracking-[0.08em] uppercase">
        Santa Barbara, CA
      </div>
    </div>
  );
}

// ─── Buyer Flow ──────────────────────────────────────────────────
const BUYER_QUESTIONS = [
  {
    key: "location",
    question: "Where do you want to live?",
    type: "select",
    options: [
      "Santa Barbara",
      "Montecito",
      "Goleta",
      "Carpinteria",
      "Somewhere else nearby",
    ],
  },
  {
    key: "timeframe",
    question: "When are you looking to move?",
    type: "select",
    options: [
      "Within 3 months",
      "3–6 months",
      "6–12 months",
      "No rush — just exploring",
    ],
  },
  {
    key: "budget",
    question: "What monthly payment feels comfortable?",
    subtitle: "All-in — mortgage, ground lease, taxes, insurance.",
    type: "select",
    options: [
      "Under $5,000/month",
      "$5,000–$6,500/month",
      "$6,500–$8,000/month",
      "$8,000–$9,500/month",
      "$9,500+/month",
    ],
  },
  {
    key: "name",
    question: "What's your name?",
    type: "text",
    placeholder: "First and last name",
  },
  {
    key: "email",
    question: "Where can we reach you?",
    type: "email",
    placeholder: "you@email.com",
  },
];

function BuyerFlow({ navigate }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [inputVal, setInputVal] = useState("");
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState("forward");
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const total = BUYER_QUESTIONS.length;
  const current = BUYER_QUESTIONS[step];
  const isLast = step === total - 1;

  const animateTo = useCallback((nextStep, dir = "forward") => {
    setSlideDir(dir);
    setVisible(false);
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setInputVal("");
      setTimeout(() => {
        setVisible(true);
        setAnimating(false);
      }, 50);
    }, 300);
  }, []);

  const selectOption = (val) => {
    const updated = { ...answers, [current.key]: val };
    setAnswers(updated);
    if (step < total - 1) {
      animateTo(step + 1, "forward");
    }
  };

  const handleTextSubmit = async (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const updated = { ...answers, [current.key]: inputVal.trim() };
    setAnswers(updated);

    if (isLast) {
      setSubmitting(true);
      try {
        await fetch(FORMSPREE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...updated,
            inquiry_type: "homebuyer",
            submitted_at: new Date().toISOString(),
          }),
        });
      } catch {}
      setSubmitting(false);
      setVisible(false);
      setTimeout(() => {
        setDone(true);
        setTimeout(() => setVisible(true), 50);
      }, 300);
    } else {
      animateTo(step + 1, "forward");
    }
  };

  const goBack = () => {
    if (step > 0) {
      animateTo(step - 1, "back");
    } else {
      navigate("landing");
    }
  };

  // Done screen
  if (done) {
    const budgetKey = answers.budget;
    const comparison = BUDGET_MAP[budgetKey];

    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center px-6
                     transition-opacity duration-300 ${
                       visible ? "opacity-100" : "opacity-0"
                     }`}
      >
        <div className="w-full max-w-lg text-center">
          {/* Checkmark */}
          <div className="w-14 h-14 rounded-full bg-[#E8651A] flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="font-display text-[2rem] md:text-[2.5rem] tracking-[-0.02em] mb-3">
            You're on the list.
          </h2>
          <p className="text-[#888] text-[0.95rem] leading-relaxed mb-10">
            We'll reach out when a Parcel home
            <br className="hidden sm:block" /> that fits your range becomes
            available.
          </p>

          {/* Budget comparison */}
          {comparison && (
            <div className="mb-6">
              <h3 className="text-[0.85rem] uppercase tracking-[0.08em] text-[#aaa] mb-5">
                How far your budget could go
              </h3>
              <div className="grid grid-cols-2 gap-6 text-left max-w-sm mx-auto">
                <div>
                  <div className="text-[0.8rem] uppercase tracking-[0.06em] text-[#aaa] mb-2">
                    Traditional purchase
                  </div>
                  <div className="text-[1.4rem] md:text-[1.6rem] font-display tracking-[-0.01em]">
                    {comparison.traditional}
                  </div>
                </div>
                <div>
                  <div className="text-[0.8rem] uppercase tracking-[0.06em] text-[#E8651A] mb-2">
                    With Parcel
                  </div>
                  <div className="text-[1.4rem] md:text-[1.6rem] font-display tracking-[-0.01em] text-[#E8651A]">
                    {comparison.parcel}
                  </div>
                </div>
              </div>
              <p className="text-[0.75rem] text-[#bbb] mt-6 leading-relaxed max-w-xs mx-auto">
                Illustrative only. Actual purchasing power depends on the
                property, financing, taxes, insurance, and lease terms.
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("landing")}
            className="mt-8 text-[0.85rem] text-[#aaa] hover:text-[#E8651A] transition-colors duration-200"
          >
            ← Back to Parcel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 md:px-12 pt-8">
        <button
          onClick={goBack}
          className="text-[#999] hover:text-[#1a1a1a] transition-colors duration-200 flex items-center gap-1.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span className="text-[0.85rem]">Back</span>
        </button>
        <span className="text-[0.8rem] text-[#bbb] tabular-nums">
          {step + 1} / {total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-[2px] bg-[#f0f0f0] mt-6">
        <div
          className="h-full bg-[#E8651A] transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div
          className={`w-full max-w-lg transition-all duration-300 ease-out
                      ${
                        visible
                          ? "opacity-100 translate-y-0"
                          : slideDir === "forward"
                          ? "opacity-0 translate-y-4"
                          : "opacity-0 -translate-y-4"
                      }`}
        >
          <h2 className="font-display text-[1.75rem] md:text-[2.25rem] tracking-[-0.02em] mb-2">
            {current.question}
          </h2>
          {current.subtitle && (
            <p className="text-[#999] text-[0.9rem] mb-8">
              {current.subtitle}
            </p>
          )}
          {!current.subtitle && <div className="mb-8" />}

          {current.type === "select" && (
            <div className="flex flex-col gap-3">
              {current.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => selectOption(opt)}
                  className={`w-full text-left px-5 py-4 rounded-lg border text-[0.95rem]
                             transition-all duration-200 hover:border-[#E8651A] hover:bg-[#fdf8f5]
                             ${
                               answers[current.key] === opt
                                 ? "border-[#E8651A] bg-[#fdf8f5]"
                                 : "border-[#e8e8e8]"
                             }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {(current.type === "text" || current.type === "email") && (
            <form onSubmit={handleTextSubmit}>
              <input
                type={current.type}
                required
                autoFocus
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={current.placeholder}
                className="w-full px-0 py-3 border-0 border-b-2 border-[#e8e8e8] focus:border-[#E8651A]
                           text-[1.2rem] md:text-[1.4rem] transition-colors duration-200 bg-transparent"
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-8 px-8 py-3.5 bg-[#E8651A] hover:bg-[#D45A15] text-white rounded-lg
                           text-[0.95rem] font-medium transition-colors duration-200"
              >
                {submitting
                  ? "Submitting..."
                  : isLast
                  ? "Submit"
                  : "Continue"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Owner Panel ─────────────────────────────────────────────────
function OwnerPanel({ navigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          property_address: address,
          inquiry_type: "homeowner",
          submitted_at: new Date().toISOString(),
        }),
      });
    } catch {}
    setSubmitting(false);
    setSubmitted(true);
  };

  const benefits = [
    {
      title: "Potentially tax-efficient cash",
      body: "In some cases, selling only the structure may reduce tax friction compared with selling everything.",
    },
    {
      title: "Passive income from your land",
      body: "Predictable rent, no tenants, no turnover, no repairs.",
    },
    {
      title: "Keep it in the family",
      body: "Retain ownership of the land and pass it on over time.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Close button */}
      <button
        onClick={() => navigate("landing")}
        className="fixed top-8 right-8 md:top-10 md:right-12 z-50 text-[#999] hover:text-[#1a1a1a]
                   transition-colors duration-200 flex items-center gap-1.5"
      >
        <span className="text-[0.85rem]">Close</span>
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Content */}
      <div className="flex-1 flex items-start lg:items-center justify-center px-8 md:px-16 lg:px-20 pt-24 lg:pt-0 pb-12">
        <div className="max-w-lg">
          <h2 className="font-display text-[2rem] md:text-[2.75rem] tracking-[-0.02em] leading-[1.1] mb-6">
            Turn your land
            <br />
            into income.
          </h2>
          <p className="text-[#666] text-[0.95rem] md:text-[1rem] leading-[1.7] mb-10">
            If you've owned your home for years and you're thinking about what
            comes next — selling, simplifying, or planning for your family —
            Parcel offers another option. Keep the land. Sell the house. Collect
            predictable income without tenants, maintenance, or a full
            traditional sale.
          </p>

          {/* Benefits */}
          <div className="flex flex-col gap-7 mb-12">
            {benefits.map((b) => (
              <div key={b.title}>
                <h3 className="text-[0.95rem] font-medium text-[#1a1a1a] mb-1">
                  {b.title}
                </h3>
                <p className="text-[0.88rem] text-[#888] leading-relaxed">
                  {b.body}
                </p>
              </div>
            ))}
          </div>

          {/* CTA + Form */}
          <div>
            <h3 className="font-display text-[1.35rem] md:text-[1.5rem] tracking-[-0.01em] mb-6">
              Interested? Let's talk.
            </h3>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="px-5 py-3.5 border border-[#ddd] rounded-lg text-[0.95rem]
                             focus:border-[#E8651A] transition-colors duration-200"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="px-5 py-3.5 border border-[#ddd] rounded-lg text-[0.95rem]
                             focus:border-[#E8651A] transition-colors duration-200"
                />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Property address"
                  className="px-5 py-3.5 border border-[#ddd] rounded-lg text-[0.95rem]
                             focus:border-[#E8651A] transition-colors duration-200"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 px-8 py-3.5 bg-[#E8651A] hover:bg-[#D45A15] text-white rounded-lg
                             text-[0.95rem] font-medium transition-colors duration-200 self-start"
                >
                  {submitting ? "Sending..." : "Submit"}
                </button>
              </form>
            ) : (
              <p className="text-[#E8651A] font-medium text-[0.95rem] py-3">
                Thanks. Parker will be in touch.
              </p>
            )}

            <p className="mt-6 text-[0.85rem] text-[#aaa]">
              Or email Parker directly:{" "}
              <a
                href="mailto:parker@parcelhomes.co"
                className="text-[#1a1a1a] hover:text-[#E8651A] transition-colors duration-200 underline underline-offset-2 decoration-[#ddd] hover:decoration-[#E8651A]"
              >
                parker@parcelhomes.co
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
