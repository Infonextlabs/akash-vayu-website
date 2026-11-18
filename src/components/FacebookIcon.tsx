interface FacebookIconProps {
  className?: string;
}

export function FacebookIcon({ className = 'h-4 w-4' }: FacebookIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect
        x="2.5"
        y="2.5"
        width="19"
        height="19"
        rx="5.2"
        stroke="currentColor"
        strokeWidth={1.85}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6 21.2v-7.1h2.38l.36-2.78H13.6V9.55c0-.8.22-1.35 1.38-1.35h1.47V5.72c-.26-.04-1.13-.12-2.14-.12-2.12 0-3.57 1.3-3.57 3.68v2.04H8.36v2.78h2.38v7.1h2.86Z"
        fill="currentColor"
      />
    </svg>
  );
}
