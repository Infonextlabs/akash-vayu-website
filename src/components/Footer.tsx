import { BrandMark } from './BrandMark';
import { FacebookIcon } from './FacebookIcon';
import { InstagramIcon } from './InstagramIcon';
import { OFFICIAL_FACEBOOK, OFFICIAL_INSTAGRAM } from '../data/akashVayuData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

const FOOTER_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Technology', path: '/technology' },
  { label: 'Projects', path: '/projects' },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#231F20] py-16 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <a
              href="/"
              onClick={(e) => handleNav(e, '/')}
              aria-label="AKASH VAYU"
              className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"
            >
              <BrandMark size="lg" variant="light" />
            </a>
            <p className="mt-3 text-sm text-slate-300">
              &ldquo;Beyond Earth. Beyond Imagination.&rdquo;
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-7 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleNav(e, link.path)}
                className="font-display text-xs font-semibold tracking-wider text-slate-200 uppercase transition-colors hover:text-[#38BDF8] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} AKASH VAYU. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 font-mono-tech">
            <a
              href={OFFICIAL_INSTAGRAM.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-9 items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 text-slate-100 transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <InstagramIcon className="h-4 w-4 shrink-0 text-[#38BDF8] transition-transform duration-200 group-hover:scale-105" />
              <span>{OFFICIAL_INSTAGRAM.username}</span>
              <span className="sr-only">on Instagram (opens in a new tab)</span>
            </a>
            <a
              href={OFFICIAL_FACEBOOK.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-9 items-center gap-2 border border-white/20 bg-white/5 px-3 py-1.5 text-slate-100 transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400"
            >
              <FacebookIcon className="h-4 w-4 shrink-0 text-[#38BDF8] transition-transform duration-200 group-hover:scale-105" />
              <span>{OFFICIAL_FACEBOOK.label}</span>
              <span className="sr-only">on Facebook (opens in a new tab)</span>
            </a>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="transition-colors hover:text-white"
            >
              LinkedIn (Placeholder)
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="transition-colors hover:text-white"
            >
              X (Placeholder)
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/contact"
              onClick={(e) => handleNav(e, '/contact')}
              className="transition-colors hover:text-white"
            >
              GitHub (Placeholder)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
