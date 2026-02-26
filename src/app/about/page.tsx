'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion } from 'framer-motion';

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
}

function TiltCard(
  props: React.ComponentProps<typeof motion.div> & {
    tilt?: boolean;
  }
) {
  const { tilt = true, className, onMouseMove, onMouseLeave, style, ...rest } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const currentRef = useRef({ rx: 0, ry: 0, active: false });
  const targetRef = useRef({ rx: 0, ry: 0 });

  return (
    <motion.div
      {...rest}
      className={tilt ? `tilt-card ${className ?? ''}` : className}
      style={{
        ...style,
        ...(tilt
          ? ({
              ['--mx' as unknown as string]: '50%',
              ['--my' as unknown as string]: '45%',
            } as React.CSSProperties)
          : null),
      }}
      onMouseMove={(e) => {
        if (tilt) {
          const el = ref.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;
            const py = (e.clientY - rect.top) / rect.height;

            const mx = Math.max(0, Math.min(1, px));
            const my = Math.max(0, Math.min(1, py));

            const ry = (mx - 0.5) * 7;
            const rx = -(my - 0.5) * 7;

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

                node.style.transform = `translate3d(0, -2px, 0) rotateX(${cur.rx}deg) rotateY(${cur.ry}deg) scale(var(--tiltScale))`;

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
          }

          const target = e.currentTarget;
          const rect = target.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          target.style.setProperty('--mx', `${x}%`);
          target.style.setProperty('--my', `${y}%`);
        }
        onMouseMove?.(e);
      }}
      onMouseLeave={(e) => {
        if (tilt) {
          const el = ref.current;
          if (el) {
            targetRef.current.rx = 0;
            targetRef.current.ry = 0;
          }

          const target = e.currentTarget;
          target.style.setProperty('--mx', '50%');
          target.style.setProperty('--my', '45%');
        }
        onMouseLeave?.(e);
      }}
      ref={ref}
    />
  );
}

function DarkButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="pressable btn-shine group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold bg-brand-ink text-white shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:ring-offset-2"
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
    </button>
  );
}

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-transparent">
        <div className="sticky top-0 z-50 border-b border-brand-line bg-white/90 backdrop-blur">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link className="group flex items-center gap-3" href="/">
                <div className="relative h-9 w-9 overflow-hidden rounded-xl bg-brand-ink ring-1 ring-black/10 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.04] group-hover:rotate-1 group-hover:shadow-[0_16px_40px_rgba(250,204,21,0.28)]">
                  <Image src="/logo.png" alt="Hello eCard" fill className="object-contain p-1 transition-transform duration-300 group-hover:scale-[1.03]" priority={false} />
                </div>
                <span className="text-sm font-semibold tracking-tight text-brand-ink">Hello eCard</span>
              </Link>

              <div className="hidden items-center gap-2 text-sm text-brand-muted md:flex">
                <Link
                  className="group relative rounded-full px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:text-brand-ink hover:shadow-soft"
                  href="/"
                >
                  Home
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
                </Link>
                <span className="group relative rounded-full px-4 py-2 font-medium text-brand-ink">
                  About Us
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-brand-accent" />
                </span>
                <Link
                  className="group relative rounded-full px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:text-brand-ink hover:shadow-soft"
                  href="/#plans"
                >
                  Plans
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
                </Link>
                <Link
                  className="group relative rounded-full px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/15 hover:text-brand-ink hover:shadow-soft"
                  href="/#support"
                >
                  Support
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-[calc(100%-1.5rem)]" />
                </Link>
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
                    <Link
                      className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10"
                      href="/"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10"
                      href="/about"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      About Us
                    </Link>
                    <a
                      className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10"
                      href="/#plans"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Plans
                    </a>
                    <a
                      className="block rounded-xl px-3 py-2 text-base font-medium text-brand-ink transition-colors hover:bg-brand-accent/10"
                      href="#support"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Support
                    </a>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </div>

        <main>
          <section className="py-10 sm:py-12">
            <Container>
              <TiltCard
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
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
                    animate={{ opacity: 1, x: 0 }}
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
                animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 shadow-soft backdrop-blur"
              >
                <div className="grid gap-10 p-8 sm:p-10 lg:grid-cols-[1fr_1.25fr] lg:items-stretch">
                  <div className="flex flex-col justify-between">
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

                    <div className="mt-8">
                      <Link
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink transition-colors hover:text-black"
                        href="/"
                      >
                        Back to Home <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                      </Link>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[1.25rem] bg-black/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/15" />
                    <div className="absolute inset-0">
                      <Image
                        src="/Captura de pantalla 2026-01-22 a la(s) 20.19.59.png"
                        alt=""
                        fill
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  </div>
                </div>

              </TiltCard>

              <TiltCard
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
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

              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="relative mt-10 rounded-[1.75rem] border border-black/10 bg-white/85 p-8 shadow-soft backdrop-blur sm:p-10"
              >
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.2em] text-brand-ink">LINKS</div>
                    <div className="mt-4 space-y-3 text-sm text-brand-ink">
                      <Link className="block border-b border-black/10 pb-3" href="/">
                        Home
                      </Link>
                      <Link className="block border-b border-black/10 pb-3" href="/about">
                        About Us
                      </Link>
                      <Link className="block border-b border-black/10 pb-3" href="/#plans">
                        Plans
                      </Link>
                      <Link className="block" href="/#resources">
                        Resources
                      </Link>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold tracking-[0.2em] text-brand-ink">DEMO PROFILE</div>
                    <div className="mt-4 space-y-3 text-sm text-brand-ink">
                      <a className="block border-b border-black/10 pb-3" href="#">
                        Doctor
                      </a>
                      <a className="block border-b border-black/10 pb-3" href="#">
                        Business
                      </a>
                      <a className="block border-b border-black/10 pb-3" href="#">
                        Personal
                      </a>
                      <a className="block border-b border-black/10 pb-3" href="#">
                        Lawyer
                      </a>
                      <a className="block border-b border-black/10 pb-3" href="#">
                        Driver
                      </a>
                      <a className="block" href="#">
                        Gym
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold tracking-[0.2em] text-brand-ink">FOLLOW US</div>
                    <div className="mt-4 space-y-3 text-sm text-brand-ink">
                      <a className="block border-b border-black/10 pb-3" href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        Facebook
                      </a>
                      <a className="block border-b border-black/10 pb-3" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        Instagram
                      </a>
                      <a className="block" href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        X (Twitter)
                      </a>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-semibold tracking-[0.2em] text-brand-ink">CONTACT US</div>
                    <div className="mt-4 space-y-3 text-sm text-brand-ink">
                      <a className="block border-b border-black/10 pb-3" href="mailto:hello@herlloecard.com">
                        Write Us
                      </a>
                      <a className="block border-b border-black/10 pb-3" href="#">
                        Support Chat
                      </a>
                      <a className="block" href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                        Support WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                              </motion.footer>
            </Container>
          </section>
        </main>
      </div>
    </MotionConfig>
  );
}
