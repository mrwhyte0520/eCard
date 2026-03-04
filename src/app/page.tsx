'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div aria-hidden="true" className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-black/10 blur-2xl" />
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black shadow-[0_26px_70px_rgba(0,0,0,0.55)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(500px 260px at 30% 20%, rgba(250,204,21,0.20), rgba(250,204,21,0) 60%), radial-gradient(600px 320px at 80% 80%, rgba(255,255,255,0.10), rgba(255,255,255,0) 62%)',
          }}
        />

        <div className="relative px-6 pb-7 pt-6">
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80"
              aria-label="Back"
            >
              ←
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/80"
              aria-label="More"
            >
              ⋯
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-brand-accent/70">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/50 via-brand-accent/10 to-white/10" />
              <div className="absolute inset-1 overflow-hidden rounded-full bg-black/60">
                <Image
                  src="/a.png"
                  alt=""
                  fill
                  className="object-cover [object-position:50%_18%] scale-[1.24]"
                  priority={false}
                />
              </div>
            </div>
            <div className="mt-4 text-sm font-semibold tracking-[0.22em] text-white/80">MR. STEVEN DOE</div>
            <div className="mt-1 text-xs font-medium text-white/55">CEO</div>
          </div>

          <div className="mt-6 grid gap-3">
            {[
              { label: 'Website', icon: '⌂' },
              { label: 'Instagram', icon: '◎' },
              { label: 'Facebook', icon: 'f' },
              { label: 'Text me', icon: '✉' },
            ].map((i) => (
              <button
                key={i.label}
                type="button"
                className="pressable inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 text-sm font-semibold text-white shadow-[0_10px_26px_rgba(0,0,0,0.45)] transition-colors duration-300 hover:border-brand-accent/40 hover:bg-black/55"
              >
                <span aria-hidden="true" className="text-brand-accent">{i.icon}</span>
                {i.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 gap-2 md:grid">
        <span className="h-2 w-2 rounded-full bg-brand-accent" />
        <span className="h-2 w-2 rounded-full bg-brand-accent/60" />
        <span className="h-2 w-2 rounded-full bg-brand-accent/30" />
      </div>
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    if (media.addEventListener) {
      media.addEventListener('change', update);
      return () => media.removeEventListener('change', update);
    }
    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return reduced;
}

function TypewriterText({
  text,
  speedMs = 34,
  startDelayMs = 200,
  className,
}: {
  text: string;
  speedMs?: number;
  startDelayMs?: number;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [shown, setShown] = useState(reducedMotion ? text : '');
  const lastTextRef = useRef(text);

  useEffect(() => {
    if (reducedMotion) {
      setShown(text);
      return;
    }

    if (lastTextRef.current !== text) {
      lastTextRef.current = text;
      setShown('');
    }

    let raf = 0;
    let start = 0;
    let prevCount = -1;
    let canceled = false;

    const tick = (now: number) => {
      if (canceled) return;

      if (!start) start = now;
      const elapsed = now - start;

      if (elapsed < startDelayMs) {
        raf = window.requestAnimationFrame(tick);
        return;
      }

      const msPerChar = Math.max(12, speedMs);
      const typingElapsed = elapsed - startDelayMs;
      const count = Math.min(text.length, Math.floor(typingElapsed / msPerChar));

      if (count !== prevCount) {
        prevCount = count;
        setShown(text.slice(0, count));
      }

      if (count < text.length) {
        raf = window.requestAnimationFrame(tick);
      } else {
        setShown(text);
      }
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      canceled = true;
      window.cancelAnimationFrame(raf);
    };
  }, [reducedMotion, speedMs, startDelayMs, text]);

  const done = shown.length >= text.length;

  return (
    <span className={className} style={{ whiteSpace: 'pre-line' }}>
      {shown}
      {!done && <span aria-hidden="true" className="type-caret" />}
    </span>
  );
}

function SectionDivider() {
  return (
    <section className="group relative my-10 overflow-hidden bg-black py-10 sm:my-14 sm:py-14">
      <div className="absolute inset-0">
        <Image
          src="/deo.png"
          alt=""
          fill
          className="object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.02] [filter:saturate(1.2)_contrast(1.12)]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(900px 320px at 20% 30%, rgba(250,204,21,0.18), rgba(250,204,21,0) 62%)' }}
        />
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(700px_240px_at_80%_60%,rgba(255,255,255,0.10),rgba(255,255,255,0)_65%)]" />
      </div>

      <Container>
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-[2.75rem] opacity-80 blur-2xl" style={{ background: 'radial-gradient(700px 260px at 25% 35%, rgba(250,204,21,0.18), rgba(250,204,21,0) 62%)' }} />
          <TiltCard className="relative grid gap-6 rounded-[2.25rem] border border-white/15 bg-white/7 p-8 shadow-[0_22px_70px_rgba(0,0,0,0.55)] backdrop-blur sm:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.25em] text-white/70">HELLO eCARD</div>
            <h2 className="font-display mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Everything you need to share your profile.
            </h2>
            <p className="mt-4 max-w-prose text-sm leading-relaxed text-white/75 sm:text-base">
              A modern digital identity that looks premium, works instantly, and helps you connect faster.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 shadow-soft">
              <div className="text-sm font-semibold text-white">Fast</div>
              <div className="mt-1 text-sm text-white/70">Share with a QR in seconds</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 shadow-soft">
              <div className="text-sm font-semibold text-white">Beautiful</div>
              <div className="mt-1 text-sm text-white/70">Clean yellow/black style</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/35 p-4 shadow-soft">
              <div className="text-sm font-semibold text-white">Smart</div>
              <div className="mt-1 text-sm text-white/70">Save, update, and grow</div>
            </div>
          </div>
          </TiltCard>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-brand-accent/40 bg-brand-accent/10 blur-[1px]"
          />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-8 left-10 h-px w-2/3 bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
        </div>
      </Container>
    </section>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-line bg-white/70 px-3 py-1 text-xs font-medium text-brand-muted backdrop-blur">
      {children}
    </span>
  );
}

function TiltCard(
  props: React.ComponentProps<typeof motion.div> & {
    children: React.ReactNode;
    tilt?: boolean;
  }
) {
  const { children, className, tilt = true, style, onMouseMove, onMouseLeave, ...rest } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef({ rx: 0, ry: 0, active: false });
  const targetRef = useRef({ rx: 0, ry: 0 });

  const handleEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      el.setAttribute('data-hovered', 'true');
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '45%');
    }
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt) {
        onMouseMove?.(e);
        return;
      }

      const el = ref.current;
      if (!el) {
        onMouseMove?.(e);
        return;
      }

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const mx = Math.max(0, Math.min(1, px));
      const my = Math.max(0, Math.min(1, py));

      const ry = (mx - 0.5) * 7;
      const rx = -(my - 0.5) * 7;

      el.style.setProperty('--mx', `${mx * 100}%`);
      el.style.setProperty('--my', `${my * 100}%`);

      targetRef.current.rx = rx;
      targetRef.current.ry = ry;

      if (!currentRef.current.active) {
        currentRef.current.active = true;

        const tick = () => {
          const node = ref.current;
          if (!node) {
            currentRef.current.active = false;
            rafRef.current = null;
            return;
          }

          const cur = currentRef.current;
          const tar = targetRef.current;

          const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
          cur.rx = lerp(cur.rx, tar.rx, 0.12);
          cur.ry = lerp(cur.ry, tar.ry, 0.12);

          node.style.transform = `translate3d(0, 0, 0) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) scale(var(--tiltScale))`;

          const settled = Math.abs(cur.rx - tar.rx) + Math.abs(cur.ry - tar.ry) < 0.02;
          if (settled && tar.rx === 0 && tar.ry === 0) {
            node.style.transform = 'translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg) scale(var(--tiltScale))';
            currentRef.current.active = false;
            rafRef.current = null;
            return;
          }

          rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
      }

      onMouseMove?.(e);
    },
    [onMouseMove, tilt]
  );

  const handleLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (el) {
        el.removeAttribute('data-hovered');
        targetRef.current.rx = 0;
        targetRef.current.ry = 0;
      }
      onMouseLeave?.(e);
    },
    [onMouseLeave]
  );

  return (
    <div className="scene" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        style={style}
        className={cn('tilt-card relative', className)}
        {...rest}
      >
        <span aria-hidden="true" className="tilt-highlight" />
        {children}
      </motion.div>
    </div>
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
          <div className="group flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-brand-ink ring-1 ring-black/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.04] group-hover:rotate-1 group-hover:shadow-[0_16px_40px_rgba(250,204,21,0.28)]">
              <Image src="/logo.png" alt="Hello eCard" fill className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.03]" priority={false} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-brand-ink">Hello eCard</span>
          </div>

          <div className="hidden items-center gap-2 text-sm text-brand-muted md:flex">
            <Link
              className="group relative rounded-full px-4 py-2 font-medium text-brand-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:shadow-soft"
              href="/"
            >
              Home
              <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand-accent" />
            </Link>
            <Link
              className="group relative rounded-full px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:text-brand-ink hover:shadow-soft"
              href="#about"
            >
              About Us
              <span className="absolute inset-x-3 -bottom-0.5 h-[2px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
            </Link>
            <Link
              className="group relative rounded-full px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:text-brand-ink hover:shadow-soft"
              href="#plans"
            >
              Plans
              <span className="absolute inset-x-3 -bottom-0.5 h-[2px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
            </Link>
            <a
              className="group relative rounded-full px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:text-brand-ink hover:shadow-soft"
              href="#support"
            >
              Support
              <span className="absolute inset-x-3 -bottom-0.5 h-[2px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
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
                <Link className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10" href="/" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </Link>
                <a className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10" href="#about" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </a>
                <a className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10" href="#plans" onClick={() => setMobileMenuOpen(false)}>
                  Plans
                </a>
                <a className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10" href="#support" onClick={() => setMobileMenuOpen(false)}>
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
  const heroText = useMemo(() => 'Create your digital\nprofile in seconds.', []);

  return (
    <section className="relative overflow-visible">
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
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6 text-center lg:text-left">
              <div className="text-base font-medium text-brand-muted sm:text-lg">Forget about paper cards.</div>
              <h1 className="font-display min-h-[2.4em] text-5xl font-semibold tracking-tight text-brand-ink sm:min-h-[2.2em] sm:text-6xl lg:min-h-[2.05em] lg:text-7xl">
                <TypewriterText text={heroText} />
              </h1>
              <button
                type="button"
                className="group inline-flex items-center gap-3 text-base font-semibold text-brand-ink"
                onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
              >
                <span className="text-brand-muted">Start here</span>
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-black/10 bg-white/80 shadow-soft transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-brand-accent/15"
                >
                  <span className="grid gap-1">
                    <span className="h-[2px] w-5 rounded-full bg-brand-ink" />
                    <span className="h-[2px] w-5 rounded-full bg-brand-ink" />
                    <span className="h-[2px] w-5 rounded-full bg-brand-ink" />
                  </span>
                </span>
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="relative z-10 mx-auto w-full max-w-[420px] lg:mx-0 lg:-mb-20 lg:translate-y-16 lg:justify-self-end"
            >
              <TiltCard className="rounded-[2.75rem] bg-transparent p-0 shadow-none" style={{ perspective: 1200 }}>
                <PhoneMockup />
              </TiltCard>
            </motion.div>
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
            <TiltCard
              key={s.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.25, 1, 0.5, 1] }}
              className="group rounded-3xl border border-brand-line bg-white/90 p-6 shadow-soft backdrop-blur transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-brand-ink">{s.title}</div>
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-brand-soft text-brand-ink transition-colors group-hover:bg-brand-accent">
                  {idx + 1}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-brand-muted">{s.body}</p>
            </TiltCard>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FeaturesSection() {
  const items = [
    {
      title: 'QR Profile',
      body: 'Showcase your digital identity with a dynamic QR that adapts to your brand, content, and purpose.',
      note: 'Instant access to your profile from any device, anywhere.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 21a8 8 0 0 0-16 0"
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
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M10 13a5 5 0 0 0 7.07 0l1.41-1.41a5 5 0 0 0-7.07-7.07L10.7 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 11a5 5 0 0 0-7.07 0L5.52 12.41a5 5 0 0 0 7.07 7.07L13.3 19"
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
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 8v4l3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12a9 9 0 1 1-9-9 9 9 0 0 1 9 9Z"
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
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M16 11a4 4 0 1 0-8 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 21a9 9 0 0 1 18 0"
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
      body: 'Track engagement, link clicks, and connection data with real-time reporting tools.',
      note: 'Know what works — optimize your results.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M4 19V5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8 19v-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 19v-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M16 19v-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M20 19v-12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: 'Custom Design',
      body: 'Tailor every element — from colors to fonts — for a link page that matches your personal style.',
      note: 'Your brand, your rules, your look.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path
            d="M12 3a9 9 0 1 0 9 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 12h9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 12V3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 420px at 50% 0%, rgba(250,204,21,0.12), rgba(250,204,21,0) 60%)',
        }}
      />
      <Container>
        <div className="relative flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-display text-center text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl"
          >
            Features
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              <TiltCard
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-[2rem] border border-black/40 bg-white/90 p-7 shadow-lift ring-1 ring-brand-accent/20"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-accent/10 text-brand-ink">
                    {item.icon}
                  </div>
                  <div className="text-base font-semibold tracking-tight text-brand-ink">{item.title}</div>
                </div>

                <div className="mt-4 h-px w-full bg-black/10" />

                <p className="mt-4 text-sm leading-relaxed text-brand-muted">{item.body}</p>
                <p className="mt-4 text-sm italic leading-relaxed text-brand-muted">{item.note}</p>

                <button
                  type="button"
                  className="pressable mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
                >
                  See more
                  <span aria-hidden="true">→</span>
                </button>
              </TiltCard>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const TEMPLATE_CARDS = ['/h.jpeg', '/lo.jpeg', '/ol.jpeg', '/oll.jpeg'];

function TemplatesShowcaseSection() {
  const reducedMotion = usePrefersReducedMotion();
  const scrollingTemplates = useMemo(() => [...TEMPLATE_CARDS, ...TEMPLATE_CARDS], []);

  return (
    <section id="examples" className="relative overflow-hidden py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_520px_at_50%_-10%,rgba(250,204,21,0.18),transparent_62%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_520px_at_15%_110%,rgba(0,0,0,0.07),transparent_60%)]" />

      <Container>
        <div className="relative mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-semibold text-brand-ink shadow-soft backdrop-blur">
              Examples
            </div>
            <div className="mt-4 font-display text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl">
              Artistic card templates
            </div>
            <div className="mt-5 text-pretty text-base font-medium leading-relaxed text-brand-muted sm:text-lg">
              Change colors, rearrange sections, add your own images, and enjoy full customization in every card.
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="#plans"
                className="pressable inline-flex items-center justify-center rounded-2xl bg-brand-ink px-6 py-4 text-base font-semibold text-brand-accent shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                View Plans
              </a>
              <a
                href="#support"
                className="pressable inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white/70 px-6 py-4 text-base font-semibold text-brand-ink shadow-soft backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                Contact
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 0.85, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
            className="relative mt-10"
          >
            <div aria-hidden="true" className="pointer-events-none absolute -inset-10 rounded-[3rem] bg-brand-accent/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.75rem] border border-black/10 bg-white/75 p-6 shadow-lift backdrop-blur sm:p-8">
              <div className="text-sm font-semibold tracking-tight text-brand-ink">Template runway</div>

              <div className="mt-6 relative min-h-[360px] overflow-hidden rounded-[2.25rem] border border-black/10 bg-white/60">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white/90 via-white/40 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white/90 via-white/40 to-transparent" />
                <div
                  className={cn(
                    'runway-track flex gap-5 p-5',
                    reducedMotion && 'runway-track-paused'
                  )}
                >
                  {scrollingTemplates.map((src, idx) => (
                    <TiltCard
                      key={`${idx}-${src}`}
                      className="relative w-[220px] shrink-0 overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-soft"
                    >
                      <motion.div
                        animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                        transition={{ duration: 5.5 + (idx % 3) * 0.6, ease: 'easeInOut', repeat: Infinity }}
                        className="relative"
                      >
                        <div className="relative aspect-[9/16]">
                          <Image src={src} alt="" fill className="object-cover" priority={false} />
                        </div>
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent px-4 pb-4 pt-10 text-white">
                          <div className="flex w-full justify-end">
                            <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur">Template</div>
                          </div>
                        </div>
                      </motion.div>
                    </TiltCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function AboutUsSection() {
  return (
    <section id="about" className="py-10 sm:py-12">
      <Container>
        <TiltCard
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2.25rem] bg-black/5"
        >
          <div className="grid items-stretch gap-0 lg:grid-cols-2">
            <div className="px-8 py-10 sm:px-10 sm:py-12">
              <div className="font-display text-5xl font-medium tracking-tight text-brand-ink sm:text-6xl">
                <div className="text-brand-ink/70">More</div>
                <div>About Us</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-120px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="relative min-h-[260px] overflow-hidden lg:min-h-[360px]"
            >
              <div className="absolute inset-0 flex items-end justify-end px-8 pt-10 sm:px-10">
                <div className="relative h-full w-full max-w-[580px]">
                  <Image
                    src="/image-from-rawpixel-id-12065257-png-1.png.webp"
                    alt=""
                    fill
                    className="object-contain object-right-bottom [filter:drop-shadow(0_28px_44px_rgba(0,0,0,0.18))] [mask-image:radial-gradient(ellipse_at_75%_40%,black_0%,black_58%,transparent_82%)]"
                    priority={false}
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-black/15" />
            </motion.div>
          </div>
        </TiltCard>

        <TiltCard
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mt-6 rounded-[1.75rem] border border-black/10 bg-white/85 p-7 shadow-soft backdrop-blur sm:mt-8 sm:p-8"
        >
          <div className="text-2xl font-semibold tracking-tight text-brand-ink">Who we are?</div>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Hello eCard is a professional digital platform developed by DevShalom LLC, a technology-driven company dedicated to delivering innovative digital identity solutions. Our application empowers individuals and businesses to create dynamic, shareable digital profiles that can be scanned and saved in seconds using QR codes, mobile wallets, and customizable templates.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Whether you&apos;re a freelancer, entrepreneur, or corporate professional, Hello eCard helps you stand out with a modern, eco-friendly alternative to traditional business cards — enhancing visibility, boosting engagement, and making meaningful connections easier than ever.
          </p>
        </TiltCard>

        <TiltCard
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 overflow-hidden rounded-[1.75rem] border border-brand-accent/20 bg-brand-accent/10 shadow-soft backdrop-blur"
        >
          <div className="bg-brand-accent px-4 py-8 text-brand-ink sm:px-6 sm:py-10">
            <div className="text-balance text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
              We are <span className="text-brand-ink/90">innovation</span>
            </div>
          </div>
        </TiltCard>

        <TiltCard
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="mt-8 overflow-hidden rounded-[1.75rem] bg-black text-white shadow-soft"
        >
          <div className="grid gap-10 px-8 py-12 sm:px-10 lg:grid-cols-2">
            <div>
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">Our History</div>
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-white/80">
                Founded with the vision to bridge the gap between traditional networking and the digital age, Hello eCard was created to modernize the way professionals connect. What began as a simple contact-sharing tool has evolved into a comprehensive platform for lead generation, digital branding, and mobile integration.
              </p>
            </div>

            <div>
              <div className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Philosophy</div>
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-white/80">
                At Hello eCard, we believe that connections drive growth. Our philosophy centers around simplicity, speed, and smart design — making it easier for you to present yourself or your brand in the most efficient and memorable way possible.
              </p>
            </div>
          </div>
        </TiltCard>

        <TiltCard
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 shadow-soft backdrop-blur"
        >
          <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
            <div>
              <div className="text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">Mission</div>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                To revolutionize personal and business networking through cutting-edge digital tools that simplify and enhance how information is shared.
              </p>

              <div className="mt-10 text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">Vision</div>
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                To become the global standard in digital identity and profile sharing by providing a seamless, secure, and eco-friendly alternative to traditional business cards.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[1.25rem] bg-black/5">
              <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/15" />
              <div className="absolute inset-0">
                <Image src="/Captura de pantalla 2026-01-22 a la(s) 20.19.59.png" alt="" fill className="object-cover" priority={false} />
              </div>
            </div>
          </div>
        </TiltCard>

        <TiltCard
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-black text-white shadow-soft"
        >
          <div className="grid items-center gap-8 px-8 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto]">
            <div>
              <div className="font-display text-center text-3xl font-medium tracking-tight sm:text-4xl lg:text-left lg:text-5xl">
                Let’s Build Your Professional
                <br />
                Profile Together
              </div>
              <div className="mx-auto mt-6 h-px w-4/5 bg-white/15 lg:mx-0 lg:w-[520px]" />
              <div className="mt-5 text-center text-xl font-medium tracking-tight text-white/90 sm:text-2xl lg:text-left">
                Attract More Customers with Ease&quot;
              </div>
            </div>

            <div className="mx-auto w-[140px] shrink-0 sm:w-[160px] lg:mx-0 lg:w-[180px]">
              <div className="relative aspect-[9/16] overflow-visible">
                <Image
                  src="/WhatsApp Image 2026-01-22 at 20.33.37.jpeg"
                  alt=""
                  fill
                  className="object-contain [filter:drop-shadow(0_18px_28px_rgba(0,0,0,0.55))] [mix-blend-mode:screen]"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </TiltCard>
      </Container>
    </section>
  );
}

function Plans() {
  return (
    <section id="plans" className="relative py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(900px 420px at 50% 0%, rgba(250,204,21,0.14), rgba(250,204,21,0) 60%), radial-gradient(1000px 520px at 30% 80%, rgba(0,0,0,0.05), rgba(0,0,0,0) 60%)',
        }}
      />
      <Container>
        <div className="relative flex flex-col gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-display text-center text-6xl font-semibold tracking-tight text-brand-ink sm:text-7xl"
          >
            Plans
          </motion.h2>

          <div className="mx-auto -mt-4 max-w-2xl text-pretty text-center text-base font-medium leading-relaxed text-brand-muted sm:text-lg">
            Choose the plan that fits your goals. Upgrade anytime and start sharing your profile in seconds.
          </div>

          <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-2">
            <TiltCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] border border-black/10 bg-white/90 p-8 shadow-soft backdrop-blur sm:p-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_20%_0%,rgba(250,204,21,0.14),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-display text-3xl font-semibold tracking-tight text-brand-ink sm:text-4xl">Basic Plan</div>
                    <div className="mt-2 text-base font-semibold text-brand-ink">Best for getting started</div>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full border border-black/10 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-ink">
                    Start
                  </span>
                </div>

                <div className="mt-7 flex items-end gap-2">
                  <div className="font-display text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl">$0</div>
                  <div className="pb-2 text-sm font-medium text-brand-muted">/ year</div>
                </div>
                <div className="mt-1 text-sm text-brand-muted">Explore the platform with a controlled experience.</div>

                <button
                  type="button"
                  className="pressable mt-7 inline-flex w-full items-center justify-center rounded-2xl bg-brand-ink px-6 py-4 text-base font-semibold text-brand-accent shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  Continue with Basic
                </button>

                <div className="mt-8 border-t border-black/10 pt-6">
                  <div className="text-sm font-semibold text-brand-ink">Basic features</div>
                  <div className="mt-4 space-y-3 text-sm text-brand-muted sm:text-base">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-ink">✓</span>
                      Create a single item
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-ink">✓</span>
                      Limited functionality across tools
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-ink">✓</span>
                      Ideal for testing and learning the platform
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent/15 text-brand-ink">✓</span>
                      Restrictions on customization and advanced modules
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>

            <TiltCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="relative overflow-hidden rounded-[2.5rem] border border-brand-accent/45 bg-black p-8 text-white shadow-lift sm:p-10"
            >
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_320px_at_20%_0%,rgba(250,204,21,0.38),transparent_60%)]" />
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-white/0 to-white/0" />
              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Premium Plan</div>
                    <div className="mt-2 text-base font-semibold text-white">Best for professionals</div>
                  </div>
                  <span className="inline-flex shrink-0 items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                    Best value
                  </span>
                </div>

                <div className="mt-7 flex items-end gap-2">
                  <div className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl">$39.96</div>
                  <div className="pb-2 text-sm font-medium text-white/70">/ year</div>
                </div>
                <div className="mt-1 text-sm text-white/70">Full access and complete freedom inside the platform.</div>

                <div className="mt-7 grid gap-3">
                  <button
                    type="button"
                    className="pressable inline-flex w-full items-center justify-center rounded-2xl bg-brand-accent px-6 py-4 text-base font-semibold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    39.96 USD / 1 year
                  </button>
                  <button
                    type="button"
                    className="pressable inline-flex w-full items-center justify-center rounded-2xl bg-white/10 px-6 py-4 text-base font-semibold text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-lift"
                  >
                    59.76 USD / 2 years
                  </button>
                  <div className="text-center text-xs text-white/60 sm:text-sm">Annual billing. Cancel anytime.</div>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="text-sm font-semibold text-white">Premium advanced features</div>
                  <div className="mt-4 space-y-3 text-sm text-white/80 sm:text-base">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent text-black">✓</span>
                      Create and manage multiple items
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent text-black">✓</span>
                      Full access to all tools and modules
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent text-black">✓</span>
                      Customize every detail
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-accent text-black">✓</span>
                      Smooth professional experience without limits
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
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
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Plans', href: '#plans' },
        { label: 'Resources', href: '#' },
      ],
    },
    {
      title: 'Follow Us',
      items: [
        { label: 'Facebook', href: 'https://facebook.com' },
        { label: 'Instagram', href: 'https://instagram.com' },
        { label: 'X (Twitter)', href: 'https://twitter.com' },
      ],
    },
  ];

  return (
    <footer id="support" className="relative overflow-hidden bg-black/75 py-12 text-white backdrop-blur">
      <Container>
        <div className="grid min-w-0 gap-10 md:grid-cols-[220px_1fr]">
          <div className="flex items-start gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-2xl bg-brand-ink">
              <Image src="/logo.png" alt="Hello eCard" fill className="object-contain p-1.5" priority={false} />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight text-white">Hello eCard</div>
              <div className="mt-1 text-sm text-white/70">Create your digital profile in seconds.</div>
            </div>
          </div>

          <div className="grid min-w-0 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title} className="min-w-0">
                <div className="text-sm font-semibold text-white">{col.title}</div>
                <div className="mt-4 space-y-3 text-sm">
                  {col.items.map((i) => (
                    <a
                      key={i.label}
                      className="block text-white/70 transition-colors hover:text-white"
                      href={i.href ?? '#'}
                      target={i.href?.startsWith('http') ? '_blank' : undefined}
                      rel={i.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {i.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/60">© {new Date().getFullYear()} Hello eCard. All rights reserved.</div>
          <button
            className="pressable inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lift"
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
        <SectionDivider />
        <FeaturesSection />
        <TemplatesShowcaseSection />
        <AboutUsSection />
        <Plans />
        <Footer />
      </div>
    </MotionConfig>
  );
}
