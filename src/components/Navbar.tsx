import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { SectionRoute } from '../utils/useRouter';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  activeSection: SectionRoute;
  onNavigate: (path: string) => void;
}

const NAV_LINKS: { label: string; path: string; section: SectionRoute }[] = [
  { label: 'About', path: '/about', section: 'about' },
  { label: 'Technology', path: '/technology', section: 'technology' },
  { label: 'Vision', path: '/vision', section: 'vision' },
  { label: 'Projects', path: '/projects', section: 'projects' },
  { label: 'Careers', path: '/careers', section: 'careers' },
];

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-8 px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Zone 1: Crisp Light Header Brand Lockup */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          aria-label="AKASH VAYU"
          className="whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0057FF]"
        >
          <BrandMark size="md" variant="dark" />
        </a>

        {/* Zone 2: 5 clean Orbitron-inspired single-line nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.section;
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1 font-display text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0057FF] ${
                  isActive ? 'text-[#0057FF]' : 'text-[#231F20] hover:text-[#0057FF]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 -bottom-0.5 h-[2px] bg-[#0057FF] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Crisp High-Contrast Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact"
            onClick={(e) => handleLinkClick(e, '/contact')}
            className="hidden md:inline-flex items-center justify-center bg-[#0A0A0A] px-5 py-2.5 font-display text-xs font-bold tracking-[0.12em] text-white uppercase transition-colors duration-200 hover:bg-[#0057FF] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center border border-black/15 text-[#0A0A0A] transition-colors hover:border-[#0057FF] hover:text-[#0057FF] md:hidden focus-visible:outline-2 focus-visible:outline-[#0057FF]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav-drawer"
          className="border-t border-black/10 bg-white px-4 py-4 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex min-h-11 items-center px-3 font-display text-xs font-semibold tracking-wider text-[#231F20] uppercase hover:bg-black/5"
            >
              Home
            </a>
            {NAV_LINKS.map((item) => (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleLinkClick(e, item.path)}
                className={`flex min-h-11 items-center px-3 font-display text-xs font-semibold tracking-wider uppercase transition-colors ${
                  activeSection === item.section
                    ? 'bg-[#0057FF]/10 text-[#0057FF]'
                    : 'text-[#231F20] hover:bg-black/5'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="mt-2 flex min-h-11 items-center justify-center bg-[#0A0A0A] px-4 font-display text-xs font-bold tracking-[0.12em] text-white uppercase hover:bg-[#0057FF]"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
