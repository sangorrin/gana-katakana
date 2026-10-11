import React from 'react';

interface Props {
  iconType: string;
  size?: number;
  className?: string;
}

export const KawaiiIllustration: React.FC<Props> = ({ iconType, size = 64, className = '' }) => {
  const w = size;
  const h = size;

  const Face = ({ cx = 50, cy = 52, r = 2, blush = '#FF8DA1' }: { cx?: number; cy?: number; r?: number; blush?: string }) => (
    <>
      <circle cx={cx - 7} cy={cy} r={r} fill="#2E241E" />
      <circle cx={cx + 7} cy={cy} r={r} fill="#2E241E" />
      <path d={`M${cx - 3},${cy + 3} Q${cx},${cy + 6} ${cx + 3},${cy + 3}`} stroke="#2E241E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx={cx - 12} cy={cy + 3} r={2.5} fill={blush} opacity="0.6" />
      <circle cx={cx + 12} cy={cy + 3} r={2.5} fill={blush} opacity="0.6" />
    </>
  );

  switch (iconType) {
    // --- Postres y Dulces ---
    case 'icecream':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,92 32,54 68,54" fill="#E8B878" stroke="#8A5C2A" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M38,62 L62,62 M42,72 L58,72 M46,82 L54,82" stroke="#CA9650" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="50" cy="42" r="24" fill="#FFAEC0" stroke="#8A5C2A" strokeWidth="2.5" />
          <circle cx="58" cy="26" r="3" fill="#FFF" opacity="0.7" />
          <Face cx={50} cy={42} />
        </svg>
      );
    case 'cake':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="48" y="16" width="4" height="14" rx="2" fill="#60A5FA" stroke="#1E40AF" strokeWidth="1" />
          <circle cx="50" cy="12" r="3" fill="#FBBF24" />
          <polygon points="50,30 84,52 16,52" fill="#FBCFE8" stroke="#9D174D" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="16" y="52" width="68" height="26" rx="4" fill="#FDE047" stroke="#9D174D" strokeWidth="2.5" />
          <Face cx={50} cy={65} />
        </svg>
      );
    case 'pancake':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="68" rx="34" ry="12" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="50" cy="52" rx="32" ry="12" fill="#FBBF24" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="50" cy="38" rx="28" ry="10" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <rect x="44" y="26" width="12" height="10" rx="3" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'pudding':
    case 'jelly':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="34,36 66,36 74,74 26,74" fill="#FEF08A" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M34,36 Q50,44 66,36" fill="#78350F" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="50" cy="24" r="5" fill="#EF4444" stroke="#78350F" strokeWidth="1.5" />
          <Face cx={50} cy={56} />
        </svg>
      );
    case 'cookie':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="32" fill="#EAB308" stroke="#713F12" strokeWidth="2.5" />
          <circle cx="36" cy="36" r="3" fill="#713F12" />
          <circle cx="64" cy="38" r="3" fill="#713F12" />
          <circle cx="50" cy="66" r="3" fill="#713F12" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'chocolate':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="24" y="24" width="52" height="56" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <line x1="50" y1="24" x2="50" y2="80" stroke="#451A03" strokeWidth="2" />
          <line x1="24" y1="52" x2="76" y2="52" stroke="#451A03" strokeWidth="2" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'candy':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="18,50 32,38 32,62" fill="#F472B6" stroke="#9D174D" strokeWidth="2" />
          <polygon points="82,50 68,38 68,62" fill="#F472B6" stroke="#9D174D" strokeWidth="2" />
          <circle cx="50" cy="50" r="22" fill="#FDE047" stroke="#9D174D" strokeWidth="2.5" />
          <Face cx={50} cy={50} />
        </svg>
      );

    // --- Comidas y Bebidas ---
    case 'bread':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M30,30 C30,22 42,20 50,25 C58,20 70,22 70,30 C74,45 74,65 68,76 C65,80 35,80 32,76 C26,65 26,45 30,30 Z" fill="#FEF3C7" stroke="#92400E" strokeWidth="2.5" />
          <rect x="44" y="42" width="12" height="10" rx="3" fill="#FDE047" stroke="#B45309" strokeWidth="1.5" />
          <Face cx={50} cy={58} />
        </svg>
      );
    case 'burger':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M25,40 C25,22 75,22 75,40 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
          <rect x="22" y="44" width="56" height="8" rx="3" fill="#22C55E" />
          <rect x="20" y="52" width="60" height="10" rx="4" fill="#78350F" />
          <rect x="23" y="62" width="54" height="6" rx="2" fill="#EF4444" />
          <path d="M25,68 C25,78 75,78 75,68 Z" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
          <Face cx={50} cy={34} r={1.5} />
        </svg>
      );
    case 'pizza':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,18 84,78 16,78" fill="#FDE047" stroke="#B45309" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M16,78 Q50,86 84,78" stroke="#B45309" strokeWidth="6" strokeLinecap="round" />
          <circle cx="44" cy="46" r="4" fill="#EF4444" />
          <circle cx="58" cy="60" r="4" fill="#EF4444" />
          <Face cx={50} cy={58} />
        </svg>
      );
    case 'sandwich':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="20,78 80,78 50,22" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="28" y="60" width="44" height="6" fill="#22C55E" />
          <rect x="26" y="66" width="48" height="6" fill="#EF4444" />
          <Face cx={50} cy={48} />
        </svg>
      );
    case 'salad':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M22,46 L78,46 C78,74 66,82 50,82 C34,82 22,74 22,46 Z" fill="#BBF7D0" stroke="#166534" strokeWidth="2.5" />
          <circle cx="36" cy="38" r="9" fill="#4ADE80" stroke="#166534" strokeWidth="2" />
          <circle cx="64" cy="38" r="9" fill="#4ADE80" stroke="#166534" strokeWidth="2" />
          <circle cx="50" cy="32" r="11" fill="#86EFAC" stroke="#166534" strokeWidth="2" />
          <Face cx={50} cy={64} />
        </svg>
      );
    case 'noodles':
    case 'food':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M25,24 L75,14 M30,28 L78,20" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M45,20 Q48,32 50,42 M53,19 Q55,30 54,42" stroke="#FDE047" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M24,42 L76,42 C76,72 64,80 50,80 C36,80 24,72 24,42 Z" fill="#F87171" stroke="#991B1B" strokeWidth="2.5" />
          <line x1="22" y1="42" x2="78" y2="42" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={60} />
        </svg>
      );
    case 'curry':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="58" rx="42" ry="24" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="40" cy="56" rx="26" ry="16" fill="#B45309" />
          <ellipse cx="62" cy="56" rx="20" ry="16" fill="#FFF" />
          <Face cx={50} cy={56} />
        </svg>
      );
    case 'meat':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <line x1="16" y1="50" x2="84" y2="50" stroke="#E2E8F0" strokeWidth="8" strokeLinecap="round" />
          <circle cx="16" cy="46" r="5" fill="#E2E8F0" />
          <circle cx="16" cy="54" r="5" fill="#E2E8F0" />
          <circle cx="84" cy="46" r="5" fill="#E2E8F0" />
          <circle cx="84" cy="54" r="5" fill="#E2E8F0" />
          <ellipse cx="50" cy="50" rx="24" ry="20" fill="#EF4444" stroke="#78350F" strokeWidth="2.5" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'cheese':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="18,72 82,72 70,36 18,72" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="42" cy="60" r="4" fill="#CA8A04" opacity="0.4" />
          <Face cx={46} cy={56} />
        </svg>
      );
    case 'tomato':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M48,22 Q50,14 56,12 M46,24 L40,16 M54,24 L62,18" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="54" r="30" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'fruits':
    case 'orange':
    case 'melon':
    case 'lemon':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="52" r="30" fill={iconType === 'lemon' ? '#FDE047' : iconType === 'melon' ? '#86EFAC' : '#FB923C'} stroke="#78350F" strokeWidth="2.5" />
          <path d="M50,22 C50,16 56,16 56,12" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'banana':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M24,70 C36,78 68,74 80,34 C76,32 72,34 68,38 C56,66 36,66 24,70 Z" fill="#FDE047" stroke="#713F12" strokeWidth="2.5" />
          <Face cx={52} cy={60} r={1.5} />
        </svg>
      );
    case 'nuts':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M30,38 C30,30 70,30 70,38 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <path d="M30,38 C30,70 50,82 50,82 C50,82 70,70 70,38 Z" fill="#D97706" stroke="#451A03" strokeWidth="2.5" />
          <Face cx={50} cy={56} />
        </svg>
      );
    case 'coffee':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M42,20 Q44,14 42,8 M50,20 Q52,14 50,8 M58,20 Q60,14 58,8" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M28,30 L72,30 C72,58 64,68 50,68 C36,68 28,58 28,30 Z" fill="#FED7AA" stroke="#7C2D12" strokeWidth="2.5" />
          <path d="M72,38 C82,38 82,54 70,56" stroke="#7C2D12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="74" rx="30" ry="6" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2" />
          <Face cx={50} cy={48} />
        </svg>
      );
    case 'tea':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="30" y="32" width="40" height="42" rx="10" fill="#BBF7D0" stroke="#166534" strokeWidth="2.5" />
          <ellipse cx="50" cy="76" rx="28" ry="6" fill="#86EFAC" stroke="#166534" strokeWidth="2" />
          <path d="M50,18 Q54,24 50,30" stroke="#166534" strokeWidth="2" fill="none" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'milk':
    case 'yogurt':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="32,32 50,20 68,32" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2" />
          <rect x="32" y="32" width="36" height="48" rx="4" fill="#F0F9FF" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="32" y="52" width="36" height="12" fill="#7DD3FC" />
          <Face cx={50} cy={44} />
        </svg>
      );
    case 'juice':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="32" y="28" width="36" height="54" rx="6" fill="#FED7AA" stroke="#C2410C" strokeWidth="2.5" />
          <path d="M48,12 L44,28" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'glass':
    case 'water':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="32,24 68,24 62,80 38,80" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="34,42 66,42 61,78 39,78" fill="#38BDF8" opacity="0.6" />
          <path d="M56,12 L50,44" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={58} />
        </svg>
      );
    case 'beer':
    case 'wine':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="30" y="32" width="36" height="46" rx="6" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" />
          <path d="M66,40 C76,40 76,64 66,66" stroke="#854D0E" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M26,32 Q50,22 74,32" fill="#FFF" stroke="#854D0E" strokeWidth="2" />
          <Face cx={48} cy={52} />
        </svg>
      );
    case 'jam':
    case 'ketchup':
    case 'sauce':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="38" y="20" width="24" height="12" rx="3" fill="#FFF" stroke="#991B1B" strokeWidth="2" />
          <rect x="30" y="32" width="40" height="48" rx="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <Face cx={50} cy={56} />
        </svg>
      );

    // --- Animales ---
    case 'cat':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="28,42 22,22 42,32" fill="#FDE047" stroke="#713F12" strokeWidth="2" />
          <polygon points="72,42 78,22 58,32" fill="#FDE047" stroke="#713F12" strokeWidth="2" />
          <circle cx="50" cy="52" r="26" fill="#FEF08A" stroke="#713F12" strokeWidth="2.5" />
          <Face cx={50} cy={52} />
          <path d="M26,50 L34,52 M26,56 L34,55 M74,50 L66,52 M74,56 L66,55" stroke="#713F12" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case 'dog':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="26" cy="46" rx="8" ry="16" fill="#A16207" />
          <ellipse cx="74" cy="46" rx="8" ry="16" fill="#A16207" />
          <circle cx="50" cy="52" r="26" fill="#EAB308" stroke="#713F12" strokeWidth="2.5" />
          <ellipse cx="50" cy="58" rx="5" ry="4" fill="#713F12" />
          <Face cx={50} cy={48} />
        </svg>
      );
    case 'rabbit':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="38" cy="26" rx="7" ry="20" fill="#FFF" stroke="#94A3B8" strokeWidth="2" />
          <ellipse cx="62" cy="26" rx="7" ry="20" fill="#FFF" stroke="#94A3B8" strokeWidth="2" />
          <circle cx="50" cy="56" r="24" fill="#FFF" stroke="#94A3B8" strokeWidth="2.5" />
          <Face cx={50} cy={56} />
        </svg>
      );
    case 'bird':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="26" fill="#FEF08A" stroke="#854D0E" strokeWidth="2.5" />
          <polygon points="46,52 50,58 54,52" fill="#F97316" />
          <Face cx={50} cy={48} />
        </svg>
      );
    case 'fish':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="46" cy="50" rx="26" ry="18" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <polygon points="70,50 86,34 86,66" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
          <Face cx={40} cy={50} />
        </svg>
      );

    // --- Tecnología, Hogar y Utensilios ---
    case 'computer':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="20" y="20" width="60" height="46" rx="8" fill="#E6EEF8" stroke="#334155" strokeWidth="2.5" />
          <rect x="25" y="25" width="50" height="34" rx="4" fill="#93C5FD" stroke="#334155" strokeWidth="2" />
          <path d="M46,66 L44,78 L56,78 L54,66" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" strokeLinejoin="round" />
          <rect x="36" y="78" width="28" height="6" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <Face cx={50} cy={40} />
        </svg>
      );
    case 'tv':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M42,24 L32,12 M58,24 L68,12" stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="20" y="24" width="60" height="52" rx="10" fill="#FEF08A" stroke="#854D0E" strokeWidth="2.5" />
          <rect x="26" y="30" width="38" height="40" rx="6" fill="#BAE6FD" stroke="#854D0E" strokeWidth="2" />
          <circle cx="71" cy="38" r="4" fill="#FDE047" stroke="#854D0E" strokeWidth="2" />
          <circle cx="71" cy="50" r="4" fill="#FDE047" stroke="#854D0E" strokeWidth="2" />
          <path d="M30,76 L26,88 M70,76 L74,88" stroke="#854D0E" strokeWidth="3" strokeLinecap="round" />
          <Face cx={45} cy={48} />
        </svg>
      );
    case 'camera':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="36" y="22" width="16" height="8" rx="2" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <rect x="62" y="24" width="10" height="6" rx="2" fill="#EF4444" stroke="#334155" strokeWidth="2" />
          <rect x="20" y="30" width="60" height="46" rx="8" fill="#A7F3D0" stroke="#065F46" strokeWidth="2.5" />
          <circle cx="50" cy="53" r="16" fill="#E2E8F0" stroke="#065F46" strokeWidth="2.5" />
          <circle cx="50" cy="53" r="10" fill="#38BDF8" stroke="#065F46" strokeWidth="2" />
          <Face cx={50} cy={53} r={1.5} />
        </svg>
      );
    case 'radio':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <line x1="28" y1="26" x2="20" y2="12" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <rect x="18" y="26" width="64" height="48" rx="8" fill="#FDBA74" stroke="#7C2D12" strokeWidth="2.5" />
          <circle cx="36" cy="50" r="12" fill="#FED7AA" stroke="#7C2D12" strokeWidth="2" />
          <Face cx={62} cy={50} />
        </svg>
      );
    case 'robot':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <line x1="50" y1="14" x2="50" y2="24" stroke="#0284C7" strokeWidth="3" />
          <circle cx="50" cy="14" r="4" fill="#EF4444" />
          <rect x="24" y="24" width="52" height="42" rx="8" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2.5" />
          <Face cx={50} cy={44} />
        </svg>
      );
    case 'clock':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="30" cy="24" r="8" fill="#F59E0B" />
          <circle cx="70" cy="24" r="8" fill="#F59E0B" />
          <circle cx="50" cy="52" r="30" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M34,42 C34,26 66,26 66,42 C66,54 58,58 58,66 L42,66 C42,58 34,54 34,42 Z" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" />
          <rect x="44" y="66" width="12" height="8" rx="2" fill="#94A3B8" />
          <Face cx={50} cy={42} />
        </svg>
      );
    case 'table':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="16" y="38" width="68" height="14" rx="5" fill="#E5B27A" stroke="#5F3A15" strokeWidth="2.5" />
          <path d="M25,52 L22,82 M75,52 L78,82" stroke="#5F3A15" strokeWidth="4" strokeLinecap="round" />
          <Face cx={50} cy={45} r={1.5} />
        </svg>
      );
    case 'bed':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="18" y="32" width="16" height="46" rx="4" fill="#94A3B8" stroke="#334155" strokeWidth="2" />
          <rect x="28" y="44" width="56" height="30" rx="4" fill="#BAE6FD" stroke="#334155" strokeWidth="2.5" />
          <rect x="32" y="38" width="18" height="14" rx="4" fill="#FFF" stroke="#334155" strokeWidth="2" />
          <Face cx={58} cy={58} />
        </svg>
      );
    case 'sofa':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="22" y="36" width="56" height="34" rx="8" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2.5" />
          <rect x="16" y="46" width="14" height="24" rx="6" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
          <rect x="70" y="46" width="14" height="24" rx="6" fill="#93C5FD" stroke="#1E40AF" strokeWidth="2" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'door':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="28" y="18" width="44" height="66" rx="4" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="64" cy="54" r="3" fill="#D97706" />
          <Face cx={50} cy={46} />
        </svg>
      );
    case 'window':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="24" y="24" width="52" height="52" rx="6" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2.5" />
          <line x1="50" y1="24" x2="50" y2="76" stroke="#0369A1" strokeWidth="2" />
          <line x1="24" y1="50" x2="76" y2="50" stroke="#0369A1" strokeWidth="2" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'key':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="36" cy="48" r="18" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" />
          <circle cx="36" cy="48" r="8" fill="#FFF" stroke="#854D0E" strokeWidth="2" />
          <path d="M54,48 L84,48 L84,58 M74,48 L74,56" stroke="#854D0E" strokeWidth="4" strokeLinecap="round" />
          <Face cx={36} cy={48} r={1} />
        </svg>
      );
    case 'knife':
    case 'fork':
    case 'spoon':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="36" rx="18" ry="24" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
          <path d="M50,60 L50,88" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <Face cx={50} cy={36} />
        </svg>
      );
    case 'pen':
    case 'ink':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="30,80 34,64 68,30 76,38 42,72" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2.5" />
          <polygon points="24,86 30,80 42,72 28,78" fill="#FDE047" stroke="#1E40AF" strokeWidth="2" />
          <Face cx={52} cy={50} r={1.5} />
        </svg>
      );
    case 'notebook':
    case 'menu':
    case 'newspaper':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="26" y="20" width="48" height="60" rx="6" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          <line x1="36" y1="34" x2="64" y2="34" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <line x1="36" y1="44" x2="64" y2="44" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <Face cx={50} cy={60} />
        </svg>
      );
    case 'folder':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M22,34 L42,34 L48,40 L78,40 C82,40 82,44 82,46 L82,74 C82,78 78,78 74,78 L26,78 C22,78 22,74 22,70 Z" fill="#FBBF24" stroke="#78350F" strokeWidth="2.5" />
          <Face cx={50} cy={58} />
        </svg>
      );

    // --- Vehículos y Transporte ---
    case 'taxi':
    case 'car':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="42" y="24" width="16" height="8" rx="2" fill="#FDE047" stroke="#854D0E" strokeWidth="1.5" />
          <path d="M22,54 L34,36 L66,36 L78,54 L84,54 L84,72 L16,72 L16,54 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="32" cy="74" r="8" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          <circle cx="68" cy="74" r="8" fill="#334155" stroke="#1E293B" strokeWidth="2" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'bus':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="22" y="22" width="56" height="52" rx="10" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="28" y="30" width="44" height="20" rx="4" fill="#FFF" stroke="#0369A1" strokeWidth="2" />
          <circle cx="34" cy="74" r="6" fill="#1E293B" />
          <circle cx="66" cy="74" r="6" fill="#1E293B" />
          <Face cx={50} cy={60} />
        </svg>
      );
    case 'boat':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,20 50,56 76,56" fill="#F43F5E" stroke="#881337" strokeWidth="2" />
          <path d="M20,62 L80,62 L70,82 L30,82 Z" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={50} cy={72} />
        </svg>
      );
    case 'rocket':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M50,14 C64,28 66,66 66,74 L34,74 C34,66 36,28 50,14 Z" fill="#F1F5F9" stroke="#334155" strokeWidth="2.5" />
          <polygon points="34,64 18,78 34,76" fill="#EF4444" stroke="#334155" strokeWidth="2" />
          <polygon points="66,64 82,78 66,76" fill="#EF4444" stroke="#334155" strokeWidth="2" />
          <circle cx="50" cy="40" r="8" fill="#38BDF8" stroke="#334155" strokeWidth="2" />
          <Face cx={50} cy={56} r={1.5} />
        </svg>
      );
    case 'helicopter':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <line x1="20" y1="26" x2="80" y2="26" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <rect x="28" y="36" width="46" height="34" rx="16" fill="#FDE047" stroke="#713F12" strokeWidth="2.5" />
          <line x1="74" y1="52" x2="90" y2="52" stroke="#334155" strokeWidth="3" />
          <Face cx={50} cy={52} />
        </svg>
      );

    // --- Ropa y Accesorios ---
    case 'shirt':
    case 'sweater':
    case 'apron':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M38,22 L50,30 L62,22 L82,34 L74,50 L68,44 L68,80 L32,80 L32,44 L26,50 L18,34 Z" fill="#FED7AA" stroke="#9A3412" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'pants':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M30,22 L70,22 L74,80 L54,80 L50,48 L46,80 L26,80 Z" fill="#60A5FA" stroke="#1E40AF" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={50} cy={34} />
        </svg>
      );
    case 'boots':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M32,24 L52,24 L52,56 L72,56 C76,56 78,64 74,74 L26,74 L26,30 Z" fill="#A16207" stroke="#451A03" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={42} cy={42} />
        </svg>
      );
    case 'tie':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="44,20 56,20 54,30 46,30" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <polygon points="46,30 54,30 60,66 50,78 40,66" fill="#F87171" stroke="#991B1B" strokeWidth="2.5" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'ribbon':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="10" fill="#F43F5E" stroke="#881337" strokeWidth="2" />
          <polygon points="50,50 20,32 20,68" fill="#FDA4AF" stroke="#881337" strokeWidth="2" />
          <polygon points="50,50 80,32 80,68" fill="#FDA4AF" stroke="#881337" strokeWidth="2" />
          <Face cx={50} cy={50} r={1.5} />
        </svg>
      );
    case 'helmet':
    case 'mask':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M24,54 C24,30 76,30 76,54 L76,64 L24,64 Z" fill="#FDE047" stroke="#713F12" strokeWidth="2.5" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'bag':
    case 'pocket':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M38,36 C38,24 62,24 62,36" stroke="#78350F" strokeWidth="3" fill="none" />
          <rect x="26" y="36" width="48" height="46" rx="8" fill="#FBBF24" stroke="#78350F" strokeWidth="2.5" />
          <Face cx={50} cy={58} />
        </svg>
      );

    // --- Lugares y Espacios ---
    case 'hotel':
    case 'building':
    case 'school':
    case 'hospital':
    case 'restaurant':
    case 'shop':
    case 'center':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="26" y="20" width="48" height="64" rx="6" fill="#BAE6FD" stroke="#0369A1" strokeWidth="2.5" />
          <rect x="32" y="28" width="8" height="8" rx="2" fill="#FFF" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="60" y="28" width="8" height="8" rx="2" fill="#FFF" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="44" y="66" width="12" height="18" rx="3" fill="#FDE047" stroke="#0369A1" strokeWidth="2" />
          <Face cx={50} cy={48} />
        </svg>
      );
    case 'tent':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,22 84,78 16,78" fill="#38BDF8" stroke="#0369A1" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="50,22 50,78 32,78" fill="#0284C7" />
          <Face cx={60} cy={60} />
        </svg>
      );

    // --- Música y Deportes ---
    case 'music':
    case 'piano':
    case 'organ':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="36" fill="#DDD6FE" stroke="#5B21B6" strokeWidth="2.5" />
          <ellipse cx="38" cy="64" rx="7" ry="5" fill="#7C3AED" />
          <ellipse cx="62" cy="56" rx="7" ry="5" fill="#7C3AED" />
          <path d="M45,64 L45,34 L69,26 L69,56" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'sports':
    case 'ball':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="32" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" />
          <line x1="18" y1="50" x2="82" y2="50" stroke="#9A3412" strokeWidth="2" />
          <line x1="50" y1="18" x2="50" y2="82" stroke="#9A3412" strokeWidth="2" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'game':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="18" y="32" width="64" height="42" rx="14" fill="#818CF8" stroke="#3730A3" strokeWidth="2.5" />
          <circle cx="34" cy="53" r="6" fill="#C7D2FE" />
          <circle cx="66" cy="48" r="4" fill="#EF4444" />
          <circle cx="74" cy="56" r="4" fill="#F59E0B" />
          <Face cx={50} cy={53} />
        </svg>
      );

    // --- Naturaleza y Simbología ---
    case 'sun':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="24" fill="#FDE047" stroke="#D97706" strokeWidth="2.5" />
          <path d="M50,12 L50,20 M50,80 L50,88 M12,50 L20,50 M80,50 L88,50" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'flower':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="34" r="12" fill="#F472B6" />
          <circle cx="66" cy="50" r="12" fill="#F472B6" />
          <circle cx="50" cy="66" r="12" fill="#F472B6" />
          <circle cx="34" cy="50" r="12" fill="#F472B6" />
          <circle cx="50" cy="50" r="14" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'tree':
    case 'palm':
    case 'leaf':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M50,18 C28,34 32,70 50,82 C68,70 72,34 50,18 Z" fill="#4ADE80" stroke="#166534" strokeWidth="2.5" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'gem':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,22 78,40 50,82 22,40" fill="#67E8F9" stroke="#0E7490" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'heart':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M50,80 C20,55 16,35 32,24 C44,16 50,30 50,30 C50,30 56,16 68,24 C84,35 80,55 50,80 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="2.5" />
          <Face cx={50} cy={46} />
        </svg>
      );
    case 'flame':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M50,18 C58,32 72,48 72,64 C72,78 62,86 50,86 C38,86 28,78 28,64 C28,48 42,32 50,18 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2.5" />
          <Face cx={50} cy={64} />
        </svg>
      );
    case 'mailbox':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="28" y="24" width="44" height="48" rx="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <line x1="50" y1="72" x2="50" y2="88" stroke="#334155" strokeWidth="6" />
          <line x1="36" y1="36" x2="64" y2="36" stroke="#FFF" strokeWidth="3" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'gift':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="24" y="38" width="52" height="46" rx="6" fill="#F43F5E" stroke="#881337" strokeWidth="2.5" />
          <rect x="20" y="30" width="60" height="12" rx="3" fill="#FDA4AF" stroke="#881337" strokeWidth="2" />
          <line x1="50" y1="30" x2="50" y2="84" stroke="#FDE047" strokeWidth="6" />
          <Face cx={50} cy={58} />
        </svg>
      );

    case 'wool':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="52" r="32" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />
          <path d="M28,40 Q50,25 72,40 Q50,55 28,40" stroke="#D97706" strokeWidth="2" fill="none" />
          <path d="M32,60 Q50,75 68,60 Q50,45 32,60" stroke="#D97706" strokeWidth="2" fill="none" />
          <line x1="22" y1="20" x2="65" y2="75" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <line x1="78" y1="20" x2="35" y2="75" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'elevator':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="24" y="20" width="52" height="64" rx="6" fill="#E2E8F0" stroke="#475569" strokeWidth="2.5" />
          <rect x="30" y="28" width="40" height="52" rx="4" fill="#CBD5E1" stroke="#64748B" strokeWidth="1.5" />
          <line x1="50" y1="28" x2="50" y2="80" stroke="#475569" strokeWidth="2" />
          <polygon points="44,24 47,22 50,24" fill="#3B82F6" />
          <polygon points="50,24 53,22 56,24" fill="#EF4444" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'shower':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M30,22 L45,22 Q58,22 58,35 L58,45" stroke="#64748B" strokeWidth="4" strokeLinecap="round" fill="none" />
          <ellipse cx="58" cy="46" rx="14" ry="6" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <circle cx="52" cy="58" r="2.5" fill="#38BDF8" />
          <circle cx="58" cy="64" r="3" fill="#38BDF8" />
          <circle cx="64" cy="58" r="2.5" fill="#38BDF8" />
          <circle cx="55" cy="74" r="2.5" fill="#38BDF8" />
          <circle cx="61" cy="74" r="2.5" fill="#38BDF8" />
          <Face cx={58} cy={44} r={1.5} />
        </svg>
      );
    case 'towel':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="22" y="36" width="56" height="38" rx="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M22,50 Q50,56 78,50" stroke="#38BDF8" strokeWidth="2" fill="none" />
          <path d="M22,60 Q50,66 78,60" stroke="#38BDF8" strokeWidth="2" fill="none" />
          <Face cx={50} cy={45} />
        </svg>
      );
    case 'tour':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="20" y="32" width="60" height="38" rx="10" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2.5" />
          <rect x="26" y="38" width="14" height="12" rx="2" fill="#BAE6FD" />
          <rect x="44" y="38" width="14" height="12" rx="2" fill="#BAE6FD" />
          <rect x="62" y="38" width="14" height="12" rx="2" fill="#BAE6FD" />
          <circle cx="34" cy="70" r="7" fill="#334155" stroke="#0F172A" strokeWidth="2" />
          <circle cx="66" cy="70" r="7" fill="#334155" stroke="#0F172A" strokeWidth="2" />
          <Face cx={50} cy={58} />
        </svg>
      );
    case 'toilet':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="28" y="24" width="44" height="26" rx="6" fill="#F1F5F9" stroke="#64748B" strokeWidth="2.5" />
          <ellipse cx="50" cy="56" rx="22" ry="16" fill="#FFFFFF" stroke="#64748B" strokeWidth="2.5" />
          <rect x="38" y="66" width="24" height="16" rx="4" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
          <circle cx="64" cy="28" r="2.5" fill="#38BDF8" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'globe':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="46" r="26" fill="#67E8F9" stroke="#0E7490" strokeWidth="2.5" />
          <path d="M38,36 Q46,42 42,54 Q36,60 44,66" fill="#86EFAC" />
          <path d="M56,34 Q66,40 60,50 Q66,60 58,68" fill="#86EFAC" />
          <path d="M22,46 Q22,74 50,74 Q78,74 78,46" stroke="#0E7490" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="50" y1="74" x2="50" y2="86" stroke="#0E7490" strokeWidth="3" />
          <line x1="36" y1="86" x2="64" y2="86" stroke="#0E7490" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={46} />
        </svg>
      );
    case 'hero':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M30,34 L22,78 L38,68 L50,82 L62,68 L78,78 L70,34 Z" fill="#EF4444" />
          <circle cx="50" cy="40" r="22" fill="#FED7AA" stroke="#C2410C" strokeWidth="2.5" />
          <path d="M34,36 Q50,42 66,36 Q64,46 50,46 Q36,46 34,36 Z" fill="#3B82F6" />
          <Face cx={50} cy={48} />
        </svg>
      );
    case 'mic':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="40" y="20" width="20" height="32" rx="10" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
          <path d="M32,38 Q32,60 50,60 Q68,60 68,38" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
          <line x1="50" y1="60" x2="50" y2="80" stroke="#334155" strokeWidth="3" />
          <line x1="36" y1="80" x2="64" y2="80" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={34} r={1.5} />
        </svg>
      );
    case 'film':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="30" fill="#64748B" stroke="#1E293B" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="12" fill="#E2E8F0" stroke="#1E293B" strokeWidth="2" />
          <circle cx="34" cy="34" r="5" fill="#1E293B" />
          <circle cx="66" cy="34" r="5" fill="#1E293B" />
          <circle cx="34" cy="66" r="5" fill="#1E293B" />
          <circle cx="66" cy="66" r="5" fill="#1E293B" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'sparkles':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M50,18 Q50,45 25,50 Q50,55 50,82 Q50,55 75,50 Q50,45 50,18 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <path d="M72,22 Q72,32 62,35 Q72,38 72,48 Q72,38 82,35 Q72,32 72,22 Z" fill="#F472B6" />
          <path d="M26,62 Q26,70 18,72 Q26,74 26,82 Q26,74 34,72 Q26,70 26,62 Z" fill="#60A5FA" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'star':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,16 60,38 84,40 66,56 72,80 50,66 28,80 34,56 16,40 40,38" fill="#FBBF24" stroke="#B45309" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'smile':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="32" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <circle cx="38" cy="44" r="4" fill="#713F12" />
          <circle cx="62" cy="44" r="4" fill="#713F12" />
          <path d="M36,54 Q50,72 64,54" stroke="#713F12" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="30" cy="52" r="3" fill="#F472B6" opacity="0.6" />
          <circle cx="70" cy="52" r="3" fill="#F472B6" opacity="0.6" />
        </svg>
      );
    case 'rule':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="18" y="38" width="64" height="24" rx="4" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />
          <line x1="28" y1="38" x2="28" y2="48" stroke="#B45309" strokeWidth="2" />
          <line x1="38" y1="38" x2="38" y2="44" stroke="#B45309" strokeWidth="1.5" />
          <line x1="48" y1="38" x2="48" y2="48" stroke="#B45309" strokeWidth="2" />
          <line x1="58" y1="38" x2="58" y2="44" stroke="#B45309" strokeWidth="1.5" />
          <line x1="68" y1="38" x2="68" y2="48" stroke="#B45309" strokeWidth="2" />
          <Face cx={50} cy={52} />
        </svg>
      );
    case 'search':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="44" cy="44" r="22" fill="#E0F2FE" stroke="#0369A1" strokeWidth="3" />
          <line x1="60" y1="60" x2="80" y2="80" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
          <Face cx={44} cy={44} />
        </svg>
      );
    case 'scale':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <line x1="50" y1="26" x2="50" y2="80" stroke="#475569" strokeWidth="3" />
          <line x1="24" y1="36" x2="76" y2="36" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <path d="M22,36 L16,56 Q28,62 40,56 L34,36" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <path d="M58,36 L52,56 Q64,62 76,56 L70,36" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <line x1="38" y1="80" x2="62" y2="80" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
          <Face cx={50} cy={46} />
        </svg>
      );
    case 'soap':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="24" y="38" width="52" height="34" rx="14" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2.5" />
          <circle cx="70" cy="28" r="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
          <circle cx="78" cy="20" r="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" opacity="0.8" />
          <Face cx={50} cy={55} />
        </svg>
      );
    case 'chat':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M22,46 C22,30 35,22 50,22 C65,22 78,30 78,46 C78,58 68,66 54,68 L44,78 L46,68 C32,66 22,58 22,46 Z" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.5" strokeLinejoin="round" />
          <Face cx={50} cy={44} />
        </svg>
      );
    case 'trophy':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <path d="M30,24 L70,24 L64,54 Q50,64 36,54 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
          <path d="M30,28 C20,28 18,44 32,46" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
          <path d="M70,28 C80,28 82,44 68,46" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
          <line x1="50" y1="60" x2="50" y2="74" stroke="#CA8A04" strokeWidth="3" />
          <rect x="36" y="74" width="28" height="12" rx="3" fill="#A16207" />
          <Face cx={50} cy={38} />
        </svg>
      );
    case 'number':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="22" y="24" width="24" height="24" rx="4" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2" />
          <rect x="54" y="24" width="24" height="24" rx="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <rect x="38" y="54" width="24" height="24" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          <text x="34" y="42" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#BE185D" textAnchor="middle">1</text>
          <text x="66" y="42" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#0369A1" textAnchor="middle">2</text>
          <text x="50" y="72" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#A16207" textAnchor="middle">3</text>
        </svg>
      );
    case 'map':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="20,30 40,24 60,30 80,24 80,72 60,78 40,72 20,78" fill="#FEF08A" stroke="#B45309" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="40" y1="24" x2="40" y2="72" stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="60" y1="30" x2="60" y2="78" stroke="#B45309" strokeWidth="2" strokeDasharray="3 2" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'belt':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="20" y="40" width="60" height="20" rx="4" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
          <rect x="38" y="36" width="16" height="28" rx="3" fill="#FDE047" stroke="#78350F" strokeWidth="2" />
          <circle cx="68" cy="50" r="2" fill="#FDE047" />
          <Face cx={60} cy={50} r={1.5} />
        </svg>
      );
    case 'button':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="28" fill="#F472B6" stroke="#9D174D" strokeWidth="2.5" />
          <circle cx="50" cy="50" r="20" stroke="#FBCFE8" strokeWidth="1.5" fill="none" />
          <circle cx="44" cy="44" r="2.5" fill="#831843" />
          <circle cx="56" cy="44" r="2.5" fill="#831843" />
          <circle cx="44" cy="56" r="2.5" fill="#831843" />
          <circle cx="56" cy="56" r="2.5" fill="#831843" />
          <Face cx={50} cy={50} r={1} />
        </svg>
      );
    case 'pool':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="54" rx="36" ry="24" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="50" cy="52" rx="28" ry="16" fill="#7DD3FC" />
          <ellipse cx="44" cy="50" rx="14" ry="8" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
          <ellipse cx="44" cy="50" rx="6" ry="3" fill="#7DD3FC" />
          <Face cx={62} cy={52} />
        </svg>
      );
    case 'art':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="52" rx="34" ry="26" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="68" cy="56" r="5" fill="#FFF" stroke="#B45309" strokeWidth="2" />
          <circle cx="34" cy="42" r="4" fill="#EF4444" />
          <circle cx="48" cy="36" r="4" fill="#3B82F6" />
          <circle cx="62" cy="40" r="4" fill="#10B981" />
          <circle cx="34" cy="56" r="4" fill="#F59E0B" />
          <Face cx={50} cy={54} />
        </svg>
      );
    case 'box':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,22 78,34 78,68 50,82 22,68 22,34" fill="#D97706" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
          <polygon points="50,22 78,34 50,46 22,34" fill="#FBBF24" stroke="#78350F" strokeWidth="2" />
          <line x1="50" y1="46" x2="50" y2="82" stroke="#78350F" strokeWidth="2" />
          <Face cx={36} cy={54} />
        </svg>
      );
    case 'check':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <circle cx="50" cy="50" r="30" fill="#86EFAC" stroke="#16A34A" strokeWidth="2.5" />
          <path d="M36,52 L46,62 L66,38" stroke="#15803D" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <Face cx={50} cy={66} />
        </svg>
      );
    case 'party':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <polygon points="50,20 26,76 74,76" fill="#F472B6" stroke="#9D174D" strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx="50" cy="18" r="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M32,60 Q50,68 68,60" stroke="#FDE047" strokeWidth="3" fill="none" />
          <circle cx="20" cy="36" r="3" fill="#60A5FA" />
          <circle cx="80" cy="40" r="3" fill="#34D399" />
          <circle cx="76" cy="64" r="2.5" fill="#FBBF24" />
          <Face cx={50} cy={50} />
        </svg>
      );
    case 'fax':
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <rect x="24" y="40" width="52" height="34" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="2.5" />
          <rect x="34" y="24" width="32" height="20" rx="2" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <line x1="38" y1="30" x2="62" y2="30" stroke="#94A3B8" strokeWidth="1.5" />
          <line x1="38" y1="36" x2="56" y2="36" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="28" y="46" width="16" height="12" rx="2" fill="#94A3B8" />
          <Face cx={60} cy={56} />
        </svg>
      );

    default:
      // Cute kawaii smiling mochi buddy
      return (
        <svg width={w} height={h} viewBox="0 0 100 100" fill="none" className={className}>
          <ellipse cx="50" cy="54" rx="30" ry="26" fill="#FED7AA" stroke="#9A3412" strokeWidth="2.5" />
          <Face cx={50} cy={52} />
        </svg>
      );
  }
};
