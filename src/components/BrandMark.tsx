interface BrandMarkProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

const LOGO_SRC = '/assets/aistudio/Aerospace_Orbit_Logo_Set_7386ba3f.png';

/**
 * Official AKASH VAYU logo lockup using the uploaded brand asset verbatim,
 * framed larger with high-contrast clarity enhancement for crisp legibility.
 */
export function BrandMark({ size = 'md', variant = 'dark' }: BrandMarkProps) {
  const frameDimensions =
    size === 'lg'
      ? 'h-[76px] w-[248px] sm:h-[84px] sm:w-[274px]'
      : size === 'sm'
        ? 'h-[48px] w-[156px]'
        : 'h-[58px] w-[190px] sm:h-[64px] sm:w-[216px]';

  const clarityClass =
    'h-full w-full object-cover object-[50%_48%] brightness-[1.08] contrast-[1.35]';

  if (variant === 'light') {
    return (
      <span className="inline-flex items-center bg-white px-4 py-2.5 shadow-sm whitespace-nowrap shrink-0">
        <span className={`relative block overflow-hidden ${frameDimensions}`}>
          <img
            src={LOGO_SRC}
            alt="AKASH VAYU — Reach Beyond"
            className={clarityClass}
          />
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center whitespace-nowrap shrink-0">
      <span className={`relative block overflow-hidden ${frameDimensions}`}>
        <img
          src={LOGO_SRC}
          alt="AKASH VAYU — Reach Beyond"
          className={`${clarityClass} mix-blend-multiply`}
        />
      </span>
    </span>
  );
}
