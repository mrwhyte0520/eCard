'use client';

import { MotionConfig, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-line bg-white/70 px-3 py-1 text-xs font-medium text-brand-muted backdrop-blur">
      {children}
    </span>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className={cn(
        'pressable btn-shine group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold',
        'bg-gradient-to-b from-brand-accent via-brand-accent to-brand-accent/90 text-black shadow-soft',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift',
        'focus:outline-none focus:ring-2 focus:ring-brand-accent/60 focus:ring-offset-2'
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </button>
  );
}

function DarkButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className={cn(
        'pressable btn-shine group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold',
        'bg-brand-ink text-white shadow-soft',
        'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift',
        'focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:ring-offset-2'
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </button>
  );
}

function GhostButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className={cn(
        'pressable inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold',
        'border border-brand-line bg-white/60 text-brand-ink backdrop-blur',
        'transition-all duration-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-soft',
        'focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:ring-offset-2'
      )}
    >
      {children}
    </button>
  );
}

function Nav() {
  return (
    <div className="sticky top-0 z-50 border-b border-brand-line bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-ink text-white">H</div>
            <span className="text-sm font-semibold tracking-tight text-brand-ink">Hello eCard</span>
          </div>

          <div className="hidden items-center gap-8 text-sm text-brand-muted md:flex">
            <Link className="group relative font-medium text-brand-ink" href="/">
              Home
              <span className="absolute -bottom-4 left-0 h-[3px] w-full rounded-full bg-brand-accent" />
            </Link>
            <Link className="group relative font-medium hover:text-brand-ink transition-colors" href="/about">
              About Us
              <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link className="group relative font-medium hover:text-brand-ink transition-colors" href="/features">
              Features
              <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link className="group relative font-medium hover:text-brand-ink transition-colors scroll-smooth" href="#plans">
              Plans
              <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </Link>
            <a className="group relative font-medium hover:text-brand-ink transition-colors scroll-smooth" href="#support">
              Support
              <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        animate={{ opacity: [0.85, 1, 0.9] }}
        transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
        style={{
          background:
            'radial-gradient(1200px 600px at 30% 10%, rgba(250,204,21,0.18), rgba(250,204,21,0) 60%), radial-gradient(1000px 600px at 80% 20%, rgba(0,0,0,0.06), rgba(0,0,0,0) 55%), linear-gradient(to bottom, #f3f3f3, #ffffff 65%)',
        }}
      />

      <Container>
        <div className="relative py-16 sm:py-20 lg:py-24">
          <div className="text-center space-y-6">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
              Create your digital
              <br />
              profile in seconds.
            </h1>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureGridSix() {
  const items = [
    {
      title: 'QR Profile',
      body: 'Showcase your digital identity with a dynamic QR that adapts to your brand, content, and purpose.',
      note: 'Instant access to your profile from any device, anywhere.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 21a8 8 0 1 0-16 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Ease Sharing',
      body: 'Share your contact and brand in seconds with just a tap or scan — no app required.',
      note: 'Designed for efficiency, built for speed.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M16 8a3 3 0 1 0-2.83-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 14a3 3 0 1 0 2.83 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.6 16.2 15.4 12.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.4 11.2 8.6 7.8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Quick Save',
      body: 'Enable contacts to instantly save your details into their phone or CRM.',
      note: 'One tap is all it takes to stay remembered.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M9 11.5 11 13.5 15.5 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21a9 9 0 1 0-9-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Manage Leads',
      body: 'Collect, organize, and follow up with contacts using integrated lead management tools.',
      note: 'Never lose a connection again.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 21v-2a4 4 0 0 0-3-3.87"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 3.13a4 4 0 0 1 0 7.75"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: 'Analytics and Reports',
      body: 'Track engagement, link clicks, and connection data with real‑time reporting tools.',
      note: 'Know what works — optimize your results.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path d="M4 20V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 20V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 20v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 20v-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Custom Design',
      body: 'Tailor every element — from colors to fonts — for a link page that matches your personal style.',
      note: 'Your brand, your rules, your look.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 10.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M13 8.5h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M15 14h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section className="pt-14 pb-4 sm:pt-16 sm:pb-4">
      <Container>
        <h2 className="mb-10 text-center text-5xl font-medium tracking-tight text-brand-ink sm:text-6xl">Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="pressable group overflow-hidden rounded-[2.25rem] border-2 border-black bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-full min-h-[250px] flex-col p-7">
                <div className="flex items-center gap-3 text-brand-ink">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black/5">{i.icon}</div>
                  <div className="text-xl font-semibold tracking-tight">{i.title}</div>
                </div>

                <div className="mt-5 h-px w-full bg-black/10" />

                <p className="mt-5 text-sm leading-relaxed text-brand-muted">{i.body}</p>
                <p className="mt-4 text-sm italic text-brand-muted">{i.note}</p>

                <div className="mt-auto pt-7">
                  <button className="pressable btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft">
                    See more <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WalletExtras() {
  const items = [
    {
      title: 'Support Media Files',
      body: 'Upload and showcase images, videos, PDFs, and more right on your biolink.',
      note: 'Bring your content to life with rich media.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M8 13l2.5-2.5 3.5 3.5 2-2L20 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 8h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: 'Apple Wallet',
      body: 'Add your eCard to Apple Wallet for instant access and professional sharing.',
      note: 'Modern, sleek, and always with you.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M16.7 13.1c0 2.8 2.5 3.7 2.5 3.7s-1.9 5-4.4 5c-1.2 0-2.1-.7-3.3-.7s-2.1.7-3.4.7c-2.3 0-5.1-4.7-5.1-8.9C3 9.9 5.2 8 7.4 8c1.2 0 2.3.8 3.1.8s2.1-.9 3.6-.9c.6 0 2.3.1 3.4 1.8-.1.1-2 1.1-2 3.4Z"
            fill="currentColor"
            opacity="0.9"
          />
          <path
            d="M14.7 2c.2 1.3-.4 2.6-1.2 3.4-.9.9-2.3 1.5-3.6 1.4-.2-1.2.4-2.5 1.2-3.3C12 2.6 13.4 2 14.7 2Z"
            fill="currentColor"
            opacity="0.9"
          />
        </svg>
      ),
    },
    {
      title: 'Google Wallet',
      body: 'Integrate your digital card into Google Wallet for fast, contactless sharing on Android devices.',
      note: 'Smart contact sharing built into your phone.',
      icon: (
        <Image
          src="/google-wallet.png"
          alt="Google Wallet"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      ),
    },
  ];

  return (
    <section className="pt-0 pb-14 sm:pt-0 sm:pb-16">
      <Container>
        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((i, idx) => (
            <motion.div
              key={i.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="pressable group overflow-hidden rounded-[2.25rem] border-2 border-black bg-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex h-full min-h-[250px] flex-col p-7">
                <div className="flex items-center gap-3 text-brand-ink">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-black/5">{i.icon}</div>
                  <div className="text-xl font-semibold tracking-tight">{i.title}</div>
                </div>

                <div className="mt-5 h-px w-full bg-black/10" />

                <p className="mt-5 text-sm leading-relaxed text-brand-muted">{i.body}</p>
                <p className="mt-4 text-sm italic text-brand-muted">{i.note}</p>

                <div className="mt-auto pt-7">
                  <button className="pressable btn-shine inline-flex items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-soft">
                    See more <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Steps() {
  const steps = [
    {
      title: 'Build Profile',
      body: 'Create an account, choose a plan, and build your profile with a simple editor.',
    },
    {
      title: 'Scan QR',
      body: 'Show your QR so anyone can scan it with their phone in seconds.',
    },
    {
      title: 'Save Contact',
      body: 'People can save your details instantly and keep them updated over time.',
    },
  ];

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {steps.map((s, idx) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="group rounded-3xl border border-brand-line bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-brand-ink">{s.title}</div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-soft text-brand-ink transition-colors group-hover:bg-brand-accent">
                  {idx + 1}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl">Features</h2>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
              className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-brand-ink to-black px-6 py-10 text-white shadow-lift sm:px-10"
            >
              <div className="pointer-events-none absolute inset-0 opacity-90" style={{ background: 'radial-gradient(900px 300px at 20% 20%, rgba(250,204,21,0.18), rgba(250,204,21,0) 60%)' }} />

              <div className="relative">
                <h3 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                  Powerful Digital Business
                  <br />
                  Card Solutions
                </h3>
                <p className="mt-4 text-lg text-white/80">Transform your networking with cutting-edge features</p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-brand-accent" />
                    <div>
                      <div className="font-semibold text-white">QR Profile Generation</div>
                      <div className="text-sm text-white/70">Create dynamic QR codes that adapt to your brand</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-brand-accent" />
                    <div>
                      <div className="font-semibold text-white">Instant Contact Sharing</div>
                      <div className="text-sm text-white/70">Share your profile with a single tap or scan</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-brand-accent" />
                    <div>
                      <div className="font-semibold text-white">Lead Management</div>
                      <div className="text-sm text-white/70">Collect and organize contacts efficiently</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
              className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-8 shadow-lift"
            >
              <h3 className="text-balance text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">
                Advanced Analytics
                <br />
                & Insights
              </h3>
              <p className="mt-4 text-lg text-brand-muted">Track performance and optimize your networking strategy</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/10 bg-brand-soft p-4">
                  <div className="text-2xl font-bold text-brand-accent">2.5K+</div>
                  <div className="text-sm text-brand-muted">Profile Views</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-brand-soft p-4">
                  <div className="text-2xl font-bold text-brand-accent">180+</div>
                  <div className="text-sm text-brand-muted">New Contacts</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-brand-soft p-4">
                  <div className="text-2xl font-bold text-brand-accent">89%</div>
                  <div className="text-sm text-brand-muted">Engagement Rate</div>
                </div>
                <div className="rounded-2xl border border-black/10 bg-brand-soft p-4">
                  <div className="text-2xl font-bold text-brand-accent">24/7</div>
                  <div className="text-sm text-brand-muted">Real-time Updates</div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            className="mt-8 overflow-hidden rounded-[1.75rem] border border-brand-accent/20 bg-brand-accent/5 shadow-soft"
          >
            <div className="bg-brand-accent px-4 py-8 text-brand-ink sm:px-6 sm:py-10">
              <div className="text-balance text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
                We are <span className="text-brand-ink/90">innovation</span>, we are <span className="text-brand-ink/90">connection</span>.
              </div>
            </div>

            <div className="relative bg-brand-accent/10">
              <div className="relative h-[200px] overflow-hidden bg-brand-accent/20 sm:h-[240px] lg:h-[280px]">
                <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/30 via-brand-accent/20 to-brand-accent/10" />
                <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6">
                  <div className="text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl lg:text-6xl">
                    Connect smart
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop&auto=format" 
                    alt="Technology connection" 
                    fill
                    className="object-cover opacity-20"
                  />
                </div>
              </div>

              <div className="pointer-events-none absolute right-3 top-[160px] hidden -translate-y-1/2 flex-col gap-2 lg:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-brand-ink" />
                <div className="h-2.5 w-2.5 rounded-full bg-brand-ink" />
                <div className="h-2.5 w-2.5 rounded-full bg-brand-ink" />
              </div>

              <div className="grid gap-3 p-4 sm:gap-4 sm:p-6 lg:grid-cols-4 lg:gap-4 lg:p-8">
                <div className="rounded-[1.25rem] bg-brand-accent/30 border border-brand-accent/40 p-4 sm:p-5">
                  <div className="text-sm font-semibold tracking-tight text-brand-ink sm:text-base">Innovation</div>
                  <p className="mt-2 text-xs leading-relaxed text-brand-ink/90 sm:text-sm">
                    Cutting-edge technology for modern networking.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-brand-accent/30 border border-brand-accent/40 p-4 sm:p-5">
                  <div className="text-sm font-semibold tracking-tight text-brand-ink sm:text-base">Simplicity</div>
                  <p className="mt-2 text-xs leading-relaxed text-brand-ink/90 sm:text-sm">
                    Intuitive design that anyone can use instantly.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-brand-accent/30 border border-brand-accent/40 p-4 sm:p-5">
                  <div className="text-sm font-semibold tracking-tight text-brand-ink sm:text-base">Trust</div>
                  <p className="mt-2 text-xs leading-relaxed text-brand-ink/90 sm:text-sm">
                    Secure, reliable, and always available.
                  </p>
                </div>
                <div className="rounded-[1.25rem] bg-brand-accent/30 border border-brand-accent/40 p-4 sm:p-5">
                  <div className="text-sm font-semibold tracking-tight text-brand-ink sm:text-base">Growth</div>
                  <p className="mt-2 text-xs leading-relaxed text-brand-ink/90 sm:text-sm">
                    Tools that help your business expand.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function Plans() {
  const plans = [
    { name: 'Free', price: 'USD 0.00' },
    { name: 'PRO', price: 'USD 18.00' },
    { name: 'PRO+', price: 'USD 36.00' },
    { name: 'Business', price: 'USD 49.99' },
  ];

  return (
    <section id="plans" className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="text-center text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl"
          >
            Plans
          </motion.h2>

          <div className="flex flex-col gap-6">
            {plans.map((p, idx) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.25, 1, 0.5, 1] }}
                className="pressable btn-shine group relative overflow-hidden rounded-[2.25rem] bg-gradient-to-b from-brand-ink to-black px-4 sm:px-6 py-6 sm:py-7 text-white shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-y-0 left-3 sm:left-6 my-auto h-12 w-[3px] sm:w-[5px] rounded-full bg-gradient-to-b from-brand-accent to-brand-accent/70 transition-all duration-300 ease-out group-hover:h-14"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/5 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="pl-5 sm:pl-7">
                    <div className="text-xl font-semibold tracking-tight">{p.name}</div>
                    <div className="mt-1 text-sm text-white/70">Membership plan</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{p.price}</div>
                      <div className="text-sm text-white/70">per month</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  const columns: Array<{ title: string; items: Array<{ label: string; href?: string }> }> = [
    {
      title: 'Links',
      items: [
        { label: 'Home', href: '#' },
        { label: 'About Us', href: '#' },
        { label: 'Features', href: '#features' },
        { label: 'Plans', href: '#plans' },
        { label: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Demo Profile',
      items: [
        { label: 'Doctor', href: '#' },
        { label: 'Business', href: '#' },
        { label: 'Personal', href: '#' },
        { label: 'Lawyer', href: '#' },
        { label: 'Driver', href: '#' },
        { label: 'Gym', href: '#' },
      ],
    },
    {
      title: 'Features',
      items: [
        { label: 'QR Profile', href: '#' },
        { label: 'Lead Generation', href: '#' },
        { label: 'Save Contact', href: '#' },
        { label: 'Customizer', href: '#' },
        { label: 'Templates', href: '#' },
        { label: 'Apple Wallet', href: '#' },
        { label: 'Google Wallet', href: '#' },
      ],
    },
    {
      title: 'Follow Us',
      items: [
        { label: 'Facebook', href: '#' },
        { label: 'Instagram', href: '#' },
        { label: 'X (Twitter)', href: '#' },
      ],
    },
    {
      title: 'Contact Us',
      items: [
        { label: 'Write Us', href: '#' },
        { label: 'Support Chat', href: '#' },
        { label: 'Support WhatsApp', href: '#' },
      ],
    },
  ];

  return (
    <footer id="support" className="border-t border-brand-line py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-ink text-white">H</div>
            <div>
              <div className="text-base font-semibold tracking-tight text-brand-ink">Hello eCard</div>
              <div className="mt-1 text-sm text-brand-muted">Create your digital profile in seconds.</div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {columns.map((col) => (
              <div key={col.title}>
                <div className="text-sm font-semibold text-brand-ink">{col.title}</div>
                <div className="mt-4 space-y-3 text-sm">
                  {col.items.map((i) => (
                    <a
                      key={i.label}
                      className="block text-brand-muted transition-colors hover:text-brand-ink"
                      href={i.href ?? '#'}
                    >
                      {i.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-brand-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-brand-muted">© {new Date().getFullYear()} Hello eCard. All rights reserved.</div>
          <button
            className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-line bg-white text-brand-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            type="button"
          >
            ↑
          </button>
        </div>
      </Container>
    </footer>
  );
}

export default function Page() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen">
        <Nav />
        <Hero />
        <Steps />
        <FeatureGridSix />
        <WalletExtras />
        <Plans />
        <Footer />
      </div>
    </MotionConfig>
  );
}
