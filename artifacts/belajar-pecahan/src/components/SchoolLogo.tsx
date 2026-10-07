export function SchoolLogo({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="3"/>
      <polygon points="50,12 82,32 82,68 50,88 18,68 18,32" fill="#1d4ed8" stroke="#60a5fa" strokeWidth="2"/>
      <rect x="36" y="38" width="28" height="30" rx="2" fill="#bfdbfe"/>
      <rect x="38" y="40" width="10" height="14" rx="1" fill="#1e3a8a"/>
      <rect x="52" y="40" width="10" height="14" rx="1" fill="#1e3a8a"/>
      <rect x="44" y="54" width="12" height="14" rx="1" fill="#1e3a8a"/>
      <polygon points="50,20 68,30 68,38 50,38 32,38 32,30" fill="#3b82f6"/>
      <rect x="47" y="20" width="6" height="8" rx="1" fill="#fbbf24"/>
      <text x="50" y="98" textAnchor="middle" fill="#bfdbfe" fontSize="6" fontFamily="sans-serif" fontWeight="bold">SEKOLAH</text>
    </svg>
  );
}
