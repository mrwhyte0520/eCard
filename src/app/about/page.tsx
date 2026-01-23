'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion } from 'framer-motion';

function Container({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>;
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
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 border-b border-brand-line bg-white/90 backdrop-blur">
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Link className="flex items-center gap-3" href="/">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-ink text-white">H</div>
                <span className="text-sm font-semibold tracking-tight text-brand-ink">Hello eCard</span>
              </Link>

              <div className="hidden items-center gap-8 text-sm text-brand-muted md:flex">
                <Link className="group relative font-medium hover:text-brand-ink transition-colors" href="/">
                  Home
                  <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
                </Link>
                <span className="group relative font-medium text-brand-ink">
                  About Us
                  <span className="absolute -bottom-4 left-0 h-[3px] w-full rounded-full bg-brand-accent" />
                </span>
                <Link className="group relative font-medium hover:text-brand-ink transition-colors scroll-smooth" href="/#plans">
                  Plans
                  <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
                </Link>
                <Link className="group relative font-medium hover:text-brand-ink transition-colors scroll-smooth" href="#support">
                  Support
                  <span className="absolute -bottom-4 left-0 h-[3px] w-0 rounded-full bg-brand-accent transition-all duration-300 group-hover:w-full" />
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
                    <Link className="block py-2 text-base font-medium text-brand-ink" href="/" onClick={() => setMobileMenuOpen(false)}>
                      Home
                    </Link>
                    <Link className="block py-2 text-base font-medium text-brand-ink" href="/about" onClick={() => setMobileMenuOpen(false)}>
                      About Us
                    </Link>
                    <a className="block py-2 text-base font-medium text-brand-ink" href="/#plans" onClick={() => setMobileMenuOpen(false)}>
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

        <main>
          <section className="py-10 sm:py-12">
            <Container>
              <motion.div
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-[2.25rem] bg-black/5"
              >
                <div className="grid items-stretch gap-0 lg:grid-cols-2">
                  <div className="px-8 py-10 sm:px-10 sm:py-12">
                    <div className="text-5xl font-medium tracking-tight text-brand-ink sm:text-6xl">
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="mt-6 rounded-[1.75rem] border border-black/10 bg-white p-7 shadow-soft sm:mt-8 sm:p-8"
              >
                <div className="text-2xl font-semibold tracking-tight text-brand-ink">Who we are?</div>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Hello eCard is a professional digital platform developed by DevShalom LLC, a technology-driven company dedicated to delivering innovative digital identity solutions. Our application empowers individuals and businesses to create dynamic, shareable digital profiles that can be scanned and saved in seconds using QR codes, mobile wallets, and customizable templates.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Whether you&apos;re a freelancer, entrepreneur, or corporate professional, Hello eCard helps you stand out with a modern, eco-friendly alternative to traditional business cards — enhancing visibility, boosting engagement, and making meaningful connections easier than ever.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="mt-8 overflow-hidden rounded-[1.75rem] border border-brand-accent/20 bg-brand-accent/5 shadow-soft"
              >
                <div className="bg-brand-accent px-4 py-8 text-brand-ink sm:px-6 sm:py-10">
                  <div className="text-balance text-2xl font-medium tracking-tight sm:text-3xl lg:text-4xl">
                    We are <span className="text-brand-ink/90">innovation</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
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
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-soft"
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

                              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-black text-white shadow-soft"
              >
                <div className="grid items-center gap-8 px-8 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto]">
                  <div>
                    <div className="text-center text-3xl font-medium tracking-tight sm:text-4xl lg:text-left lg:text-5xl">
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
              </motion.div>

              <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                className="relative mt-10 rounded-[1.75rem] border border-black/10 bg-white p-8 shadow-soft sm:p-10"
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
