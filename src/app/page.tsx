'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
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

  useEffect(() => {
    if (reducedMotion) {
      setShown(text);
      return;
    }

    let idx = 0;
    setShown('');
    const timeout = window.setTimeout(() => {
      const timer = window.setInterval(() => {
        idx += 1;
        setShown(text.slice(0, idx));
        if (idx >= text.length) {
          window.clearInterval(timer);
        }
      }, speedMs);
    }, startDelayMs);

    return () => {
      window.clearTimeout(timeout);
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
              href="/about"
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
                <Link className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10" href="/about" onClick={() => setMobileMenuOpen(false)}>
                  About Us
                </Link>
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
            <h1 className="font-display text-balance text-4xl font-semibold tracking-tight text-brand-ink sm:text-5xl">
              <TypewriterText text={heroText} />
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

function Plans() {
  return (
    <section id="plans" className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-display text-center text-5xl font-semibold tracking-tight text-brand-ink sm:text-6xl"
          >
            Plans
          </motion.h2>

          <div className="mx-auto grid w-full max-w-4xl gap-6 md:grid-cols-2">
            <TiltCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="rounded-[2rem] border border-black/10 bg-white/90 p-6 shadow-soft backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-accent/10 text-brand-ink ring-1 ring-black/5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                      <path
                        d="M7 10V8a5 5 0 0 1 10 0v2"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 10h12v10H6V10Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-brand-ink">Free Plan</div>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full border border-black/10 bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-ink">
                  Start
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                1 item per module. Editing is not allowed. You can delete it, but you won&apos;t be able to create another item in that module.
              </p>

              <button
                type="button"
                className="pressable mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-brand-accent shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span aria-hidden="true">→</span>
                Continue with Free
              </button>
            </TiltCard>

            <TiltCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
              className="rounded-[2rem] border border-black/10 bg-white/90 p-6 shadow-soft backdrop-blur"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-accent/10 text-brand-ink ring-1 ring-black/5">
                    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
                      <path
                        d="M12 2l3 6 6 .9-4.4 4.3 1 6.3L12 17.8 6.4 19.5l1-6.3L3 8.9 9 8l3-6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-brand-ink">Premium Plan</div>
                  </div>
                </div>

                <span className="inline-flex items-center rounded-full border border-black/10 bg-brand-accent/15 px-3 py-1 text-xs font-semibold text-brand-ink">
                  Best value
                </span>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-brand-muted">Unlimited access. Annual billing only.</p>
              <div className="mt-3 text-sm font-medium text-brand-ink">Choose your period:</div>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  className="pressable inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  39.96 USD / 1 year
                </button>
                <button
                  type="button"
                  className="pressable inline-flex w-full items-center justify-center rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-black shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  59.76 USD / 2 years
                </button>
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
        <Plans />
        <Footer />
      </div>
    </MotionConfig>
  );
}
