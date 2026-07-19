/**
 * Brand glyphs. lucide-react dropped its brand icon set, so Instagram and
 * Telegram are inlined here as plain SVG paths.
 */

type Props = { size?: number; className?: string };

export function InstagramIcon({ size = 18, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TelegramIcon({ size = 18, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      className={className}
    >
      <path d="M21.94 4.31a1.2 1.2 0 0 0-1.62-1.2L2.68 9.9c-.9.35-.88 1.63.03 1.95l4.4 1.53 1.7 5.42a.9.9 0 0 0 1.5.38l2.46-2.4 4.5 3.3a1.2 1.2 0 0 0 1.89-.73l2.78-14.8Zm-4.4 3.03-7.7 6.8a.9.9 0 0 0-.29.55l-.3 2.2-1.2-3.83 9.49-5.72Z" />
    </svg>
  );
}
