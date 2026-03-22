"use client"

import type { SiteConfig } from "@/lib/types"
import PageBanner from "@/components/sections/PageBanner"
import FadeIn from "@/components/ui/FadeIn"

export default function ContactClient({ site }: { site: SiteConfig }) {
  return (
    <div className="flex flex-col gap-8 pb-16">
      <PageBanner
        topLabel="Get in touch"
        headline="Let's"
        headlineItalic="talk."
        subtitle="Hiring for a PMM or content role? Want to collaborate? Or just want to say hi? Drop a mail :)"
      />

      {/* ── Primary CTA — big email card ── */}
      <FadeIn delay={0.3}>
        <a
          href={`mailto:${site.email}`}
          className="group block rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            backgroundColor: "var(--color-fg)",
            padding: "clamp(32px, 5vw, 48px)",
          }}
        >
          <p
            className="font-mono tracking-wider uppercase"
            style={{
              color: "rgba(249,248,246,0.4)",
              fontSize: "0.7rem",
              marginBottom: 16,
            }}
          >
            Email
          </p>
          <p
            style={{
              fontFamily: "'EB Garamond', Georgia, serif",
              fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "#F9F8F6",
              lineHeight: 1.2,
            }}
          >
            {site.email}
          </p>
          <div className="flex items-center gap-2 mt-6 transition-transform duration-300 group-hover:translate-x-2">
            <span
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.15rem",
                color: "var(--color-accent)",
              }}
            >
              Send a message
            </span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              style={{ color: "var(--color-accent)" }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </a>
      </FadeIn>

      {/* ── Resume download ── */}
      <FadeIn delay={0.4}>
        <a
          href={site.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
          style={{
            backgroundColor: "var(--color-accent)",
            padding: "clamp(24px, 3vw, 32px)",
          }}
        >
          <div>
            <p
              className="font-mono tracking-wider uppercase"
              style={{
                color: "rgba(17,17,16,0.45)",
                fontSize: "0.7rem",
                marginBottom: 8,
              }}
            >
              Resume
            </p>
            <p
              style={{
                fontFamily: "'EB Garamond', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--color-fg)",
              }}
            >
              Download my CV
            </p>
          </div>
          <svg
            width="22" height="22" viewBox="0 0 24 24" fill="none"
            className="transition-transform duration-300 group-hover:translate-y-1"
            style={{ color: "var(--color-fg)", opacity: 0.7 }}
          >
            <path d="M12 3v13M5 16l7 7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 21h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </a>
      </FadeIn>

      {/* ── Social links — side by side ── */}
      <FadeIn delay={0.5}>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              backgroundColor: "#0A66C2",
              padding: "clamp(24px, 3vw, 32px)",
            }}
          >
            <div>
              <p
                className="font-mono tracking-wider uppercase"
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.7rem",
                  marginBottom: 8,
                }}
              >
                LinkedIn
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                Let&apos;s connect
              </p>
            </div>
            <svg
              width="22" height="22" viewBox="0 0 24 24" fill="currentColor"
              className="transition-transform duration-300 group-hover:-translate-y-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>

          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{
              background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
              padding: "clamp(24px, 3vw, 32px)",
            }}
          >
            <div>
              <p
                className="font-mono tracking-wider uppercase"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontSize: "0.7rem",
                  marginBottom: 8,
                }}
              >
                Instagram
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', Georgia, serif",
                  fontSize: "1.4rem",
                  fontWeight: 400,
                  color: "#fff",
                }}
              >
                Follow along
              </p>
            </div>
            <svg
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              className="transition-transform duration-300 group-hover:-translate-y-1"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
          </a>
        </div>
      </FadeIn>
    </div>
  )
}
