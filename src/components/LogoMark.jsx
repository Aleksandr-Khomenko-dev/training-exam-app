import { useId } from 'react'

// "CB" monogram on a rounded gradient badge — a clean, brand-mark style consistent with
// how products like Stripe/Linear render their initials, used everywhere the app logo
// appears (nav bar, dashboard header).
export default function LogoMark({ size = 30 }) {
  const gradientId = useId()

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CertBrew"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563eb" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      <text
        x="16"
        y="16.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="13.5"
        letterSpacing="0.3"
        fill="#fff"
      >
        CB
      </text>
    </svg>
  )
}
