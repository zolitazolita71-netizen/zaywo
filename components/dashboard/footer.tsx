"use client"

import { Mail, Phone } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 7.5a2.25 2.25 0 0 0 .126 4.073l3.9 1.205 1.672 5.325a1.5 1.5 0 0 0 2.388.662l2.358-1.966 4.124 3.03a2.25 2.25 0 0 0 3.498-1.194l3.217-16.5a2.25 2.25 0 0 0-2.76-2.35z" />
      <path d="m10.002 14.5 8-7.5" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-foreground">Momentum</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Build better habits, one day at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/zaywo4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com/zolitazolita71"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
            <a
              href="https://t.me/only_ifx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Telegram"
            >
              <TelegramIcon className="h-5 w-5" />
            </a>
            <a
              href="tel:+998507903938"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Phone"
            >
              <Phone className="h-5 w-5" />
            </a>
            <a
              href="mailto:zolitazolita71@gmail.com"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
            <a
              href="tel:+998507903938"
              className="transition-colors hover:text-foreground"
            >
              +998 50 790 39 38
            </a>
            <a
              href="mailto:zolitazolita71@gmail.com"
              className="transition-colors hover:text-foreground"
            >
              zolitazolita71@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Momentum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
