'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import logo from '../../../public/SAFLogo.png';
import { LanguageSwitcher, LanguageSwitcherMobile } from './language-switcher';

export function TabMenu({
  links,
  cta,
}: {
  links: { label: string; path: string }[];
  cta: { label: string; path: string };
}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-anivera-line text-anivera-ink">
      <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto px-3 sm:px-6 h-16">
        <Link
          className="shrink-0 flex items-center gap-2.5 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
          href="/"
        >
          <img className="w-9 h-10 object-contain" alt="" src={logo.src} />
          <span className="text-lg font-bold tracking-tight text-anivera-ink">Anivera</span>
        </Link>

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {links.map(({ label, path }) => (
            <Link
              key={path}
              href={path}
              className={`px-3.5 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                isActive(path)
                  ? 'bg-anivera-line text-anivera-ink font-semibold'
                  : 'text-anivera-body font-medium hover:bg-anivera-bg hover:text-anivera-ink'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={cta.path}
            className="hidden xl:inline-flex items-center rounded-xl bg-anivera-ink px-4 py-2.5 text-sm font-semibold text-white whitespace-nowrap hover:bg-anivera-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai focus-visible:ring-offset-2"
          >
            {cta.label}
          </Link>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <LanguageSwitcherMobile />
          <button
            className="flex items-center justify-center w-10 h-10 rounded-lg text-anivera-ink hover:bg-anivera-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-anivera-ai"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="lg:hidden border-t border-anivera-line bg-white">
          <div className="flex flex-col px-3 py-2 max-w-7xl mx-auto">
            {links.map(({ label, path }) => (
              <Link
                key={path}
                href={path}
                className={`px-3 py-3 rounded-lg text-base ${
                  isActive(path)
                    ? 'bg-anivera-line text-anivera-ink font-semibold'
                    : 'text-anivera-body font-medium hover:bg-anivera-bg'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href={cta.path}
              className="mt-2 mb-1 px-3 py-3 rounded-xl bg-anivera-ink text-center text-base font-semibold text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              {cta.label}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
