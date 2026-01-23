'use client';

import { useState } from 'react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 border-b border-brand-line bg-white/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-ink text-white">H</div>
            <span className="text-sm font-semibold tracking-tight text-brand-ink">Hello eCard</span>
          </div>

          <div className="hidden items-center gap-6 text-sm text-brand-muted md:flex lg:gap-8">
            <Link className="group relative font-medium text-brand-ink" href="/">
              Home
              <span className="absolute -bottom-4 left-0 h-[3px] w-full rounded-full bg-brand-accent" />
            </Link>
            <Link className="group relative font-medium hover:text-brand-ink transition-colors" href="/about">
              About Us
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

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              className="pressable flex h-10 w-10 items-center justify-center rounded-xl border border-brand-line bg-white text-brand-ink shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="border-t border-brand-line bg-white/95 backdrop-blur">
              <div className="px-4 py-3 space-y-2">
                <Link className="block py-2 text-base font-medium text-brand-ink" href="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link className="block py-2 text-base font-medium text-brand-ink" href="/about" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
                <a className="block py-2 text-base font-medium text-brand-ink" href="#plans" onClick={() => setMobileMenuOpen(false)}>
                  Plans
                </a>
                <a className="block py-2 text-base font-medium text-brand-ink" href="#support" onClick={() => setMobileMenuOpen(false)}>
                  Support
                </a>
              </div>
            </div>
          </div>
        )}
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
                  className="absolute inset-y-0 left-2 sm:left-6 my-auto h-8 w-[2px] sm:h-12 sm:w-[4px] rounded-full bg-gradient-to-b from-brand-accent/60 to-brand-accent/40 transition-all duration-300 ease-out group-hover:h-10 sm:group-hover:h-14"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/0 via-white/0 to-white/5 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="pl-4 sm:pl-7">
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
        <Plans />
        <Footer />
      </div>
    </MotionConfig>
  );
}
