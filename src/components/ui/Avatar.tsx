import React, { useMemo } from 'react';
import { cn } from '@/utils/cn';

export type AvatarRole = 'student' | 'teacher' | 'admin';
export type AvatarFamily = 'geometric' | 'orbit' | 'grid' | 'pixel' | 'abstract' | 'monogram-symbol';

export interface AvatarProps {
  seed?: string;
  name?: string;
  role?: AvatarRole;
  size?: number | string;
  variant?: AvatarFamily;
  className?: string;
  title?: string;
}

// Simple deterministic integer hash (djb2)
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

// Deterministic PRNG using LCG
class SeededRNG {
  private state: number;
  constructor(seed: number) {
    this.state = seed % 2147483647;
    if (this.state <= 0) this.state += 2147483646;
  }
  next(): number {
    this.state = (this.state * 16807) % 2147483647;
    return (this.state - 1) / 2147483646;
  }
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
  pick<T>(arr: T[]): T {
    return arr[this.nextInt(0, arr.length - 1)];
  }
}

// Curated palettes per role
const STUDENT_PALETTES = [
  { bg: '#0F172A', primary: '#FFC800', secondary: '#38BDF8', accent: '#FFFFFF' },
  { bg: '#1E1B4B', primary: '#818CF8', secondary: '#F472B6', accent: '#E0E7FF' },
  { bg: '#064E3B', primary: '#34D399', secondary: '#FBBF24', accent: '#ECFDF5' },
  { bg: '#172554', primary: '#60A5FA', secondary: '#F87171', accent: '#EFF6FF' },
  { bg: '#3B0764', primary: '#C084FC', secondary: '#38BDF8', accent: '#FAF5FF' },
  { bg: '#431407', primary: '#FB923C', secondary: '#FACC15', accent: '#FFF7ED' },
  { bg: '#134E4A', primary: '#2DD4BF', secondary: '#A78BFA', accent: '#F0FDFA' },
];

const TEACHER_PALETTES = [
  { bg: '#0A192F', primary: '#3B82F6', secondary: '#60A5FA', accent: '#EFF6FF' },
  { bg: '#111827', primary: '#8B5CF6', secondary: '#A78BFA', accent: '#F5F3FF' },
  { bg: '#064E3B', primary: '#10B981', secondary: '#6EE7B7', accent: '#ECFDF5' },
  { bg: '#1E293B', primary: '#0EA5E9', secondary: '#38BDF8', accent: '#F0F9FF' },
  { bg: '#1F2937', primary: '#F59E0B', secondary: '#FCD34D', accent: '#FEF3C7' },
];

const ADMIN_PALETTES = [
  { bg: '#18181B', primary: '#F59E0B', secondary: '#D4D4D8', accent: '#FFFFFF' },
  { bg: '#0F172A', primary: '#94A3B8', secondary: '#E2E8F0', accent: '#FFFFFF' },
  { bg: '#1E1E24', primary: '#D97706', secondary: '#71717A', accent: '#F4F4F5' },
];

const FAMILIES: AvatarFamily[] = ['geometric', 'orbit', 'grid', 'pixel', 'abstract', 'monogram-symbol'];

export const Avatar: React.FC<AvatarProps> = ({
  seed,
  name,
  role = 'student',
  size = 36,
  variant,
  className,
  title,
}) => {
  const effectiveSeed = (seed || name || 'iqora-user').toLowerCase().trim();
  const displayName = name || seed || 'User';

  const avatarData = useMemo(() => {
    const hash = hashString(effectiveSeed);
    const rng = new SeededRNG(hash);

    // Pick family
    const family = variant || rng.pick(FAMILIES);

    // Pick palette based on role
    let palette;
    if (role === 'admin') {
      palette = rng.pick(ADMIN_PALETTES);
    } else if (role === 'teacher') {
      palette = rng.pick(TEACHER_PALETTES);
    } else {
      palette = rng.pick(STUDENT_PALETTES);
    }

    return { family, palette, rng, hash };
  }, [effectiveSeed, role, variant]);

  const { family, palette, hash } = avatarData;
  const rng = new SeededRNG(hash);

  // Render specific SVG geometry based on family
  const renderGeometry = () => {
    switch (family) {
      case 'pixel': {
        // 5x5 Symmetric Identicon (GitHub style with rounded cells)
        const cells: React.ReactNode[] = [];
        const matrix: boolean[][] = [];
        for (let r = 0; r < 5; r++) {
          matrix[r] = [];
          for (let c = 0; c < 3; c++) {
            matrix[r][c] = rng.next() > 0.45;
          }
          // Mirror column 1 & 0 to column 3 & 4
          matrix[r][3] = matrix[r][1];
          matrix[r][4] = matrix[r][0];
        }

        const cellSize = 12;
        const offset = 10;
        for (let r = 0; r < 5; r++) {
          for (let c = 0; c < 5; c++) {
            if (matrix[r][c]) {
              const color = (r + c) % 2 === 0 ? palette.primary : palette.secondary;
              cells.push(
                <rect
                  key={`${r}-${c}`}
                  x={offset + c * cellSize}
                  y={offset + r * cellSize}
                  width={cellSize - 2}
                  height={cellSize - 2}
                  rx={2.5}
                  fill={color}
                />
              );
            }
          }
        }
        return <g>{cells}</g>;
      }

      case 'orbit': {
        // Orbital rings with satellites
        const r1 = rng.nextInt(20, 26);
        const r2 = rng.nextInt(28, 34);
        const satAngle1 = rng.nextInt(0, 360);
        const satAngle2 = (satAngle1 + rng.nextInt(90, 270)) % 360;
        const rad1 = (satAngle1 * Math.PI) / 180;
        const rad2 = (satAngle2 * Math.PI) / 180;

        return (
          <g>
            {/* Outer Ring */}
            <circle cx="40" cy="40" r={r2} stroke={palette.secondary} strokeWidth="2" strokeDasharray="4 3" opacity="0.6" fill="none" />
            {/* Inner Ring */}
            <circle cx="40" cy="40" r={r1} stroke={palette.primary} strokeWidth="2.5" fill="none" />
            {/* Central Nucleus */}
            <circle cx="40" cy="40" r="10" fill={palette.primary} />
            <circle cx="40" cy="40" r="5" fill={palette.accent} />
            {/* Satellites */}
            <circle cx={40 + r1 * Math.cos(rad1)} cy={40 + r1 * Math.sin(rad1)} r="4" fill={palette.accent} />
            <circle cx={40 + r2 * Math.cos(rad2)} cy={40 + r2 * Math.sin(rad2)} r="5" fill={palette.secondary} />
          </g>
        );
      }

      case 'grid': {
        // 3x3 Bauhaus geometric grid
        const elements: React.ReactNode[] = [];
        const gridSize = 16;
        const start = 16;
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const x = start + c * gridSize;
            const y = start + r * gridSize;
            const type = rng.nextInt(0, 3);
            const color = (r + c) % 2 === 0 ? palette.primary : palette.secondary;

            if (type === 0) {
              elements.push(<circle key={`${r}-${c}`} cx={x + 8} cy={y + 8} r="6" fill={color} />);
            } else if (type === 1) {
              elements.push(<rect key={`${r}-${c}`} x={x + 2} y={y + 2} width="12" height="12" rx="3" fill={color} />);
            } else if (type === 2) {
              elements.push(
                <path
                  key={`${r}-${c}`}
                  d={`M ${x + 2} ${y + 14} L ${x + 8} ${y + 2} L ${x + 14} ${y + 14} Z`}
                  fill={color}
                />
              );
            }
          }
        }
        return <g>{elements}</g>;
      }

      case 'abstract': {
        // Overlapping geometric solids
        return (
          <g>
            {/* Angled pill */}
            <rect
              x="18"
              y="32"
              width="44"
              height="16"
              rx="8"
              transform={`rotate(${rng.nextInt(-35, 35)} 40 40)`}
              fill={palette.primary}
            />
            {/* Overlapping circle */}
            <circle cx={rng.nextInt(26, 54)} cy={rng.nextInt(26, 54)} r="14" fill={palette.secondary} opacity="0.85" />
            {/* Accent dot */}
            <circle cx="40" cy="40" r="6" fill={palette.accent} />
          </g>
        );
      }

      case 'monogram-symbol': {
        // Abstract monogram-like sigil
        const symType = rng.nextInt(0, 2);
        return (
          <g>
            {/* Surrounding framing ring / diamond */}
            <rect x="18" y="18" width="44" height="44" rx="10" stroke={palette.secondary} strokeWidth="2.5" fill="none" />
            {symType === 0 ? (
              // Infinity loop
              <g transform="translate(40, 40) scale(0.9)">
                <circle cx="-10" cy="0" r="9" stroke={palette.primary} strokeWidth="3" fill="none" />
                <circle cx="10" cy="0" r="9" stroke={palette.primary} strokeWidth="3" fill="none" />
                <circle cx="0" cy="0" r="3" fill={palette.accent} />
              </g>
            ) : symType === 1 ? (
              // Concentric Hexagon / Diamond
              <polygon
                points="40,24 54,40 40,56 26,40"
                fill={palette.primary}
              />
            ) : (
              // Cross & Circle
              <g>
                <circle cx="40" cy="40" r="12" fill={palette.primary} />
                <rect x="37" y="24" width="6" height="32" rx="3" fill={palette.accent} />
                <rect x="24" y="37" width="32" height="6" rx="3" fill={palette.accent} />
              </g>
            )}
          </g>
        );
      }

      case 'geometric':
      default: {
        // Concentric geometric shapes (Bauhaus/Discord style)
        return (
          <g>
            <circle cx="40" cy="40" r="28" fill={palette.secondary} opacity="0.3" />
            <polygon
              points="40,16 64,40 40,64 16,40"
              fill={palette.primary}
            />
            <circle cx="40" cy="40" r="10" fill={palette.bg} />
            <circle cx="40" cy="40" r="5" fill={palette.accent} />
          </g>
        );
      }
    }
  };

  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      role="img"
      aria-label={displayName}
      title={title || displayName}
      style={{ width: dimension, height: dimension, minWidth: dimension, minHeight: dimension }}
      className={cn(
        'rounded-2xl overflow-hidden flex items-center justify-center select-none shadow-2xs border border-white/20 flex-shrink-0 transition-transform hover:scale-105',
        className
      )}
    >
      <svg
        viewBox="0 0 80 80"
        width="100%"
        height="100%"
        className="w-full h-full block"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Solid background */}
        <rect width="80" height="80" fill={palette.bg} />
        {/* Subtle geometric pattern overlay */}
        <circle cx="0" cy="0" r="40" fill={palette.primary} opacity="0.08" />
        <circle cx="80" cy="80" r="40" fill={palette.secondary} opacity="0.08" />
        {/* Foreground Geometry */}
        {renderGeometry()}
      </svg>
    </div>
  );
};
