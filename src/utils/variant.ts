export type Variant = 'success' | 'error' | 'warning' | 'info' | 'neutral'

export const BADGE_STYLES: Record<Variant, string> = {
  success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  error: 'bg-red-500/10 text-red-500 border-red-500/20',
  warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  info: 'bg-sky-500/10 text-sky-500 border-sky-500/20',
  neutral: 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20',
}

export const PANEL_STYLES: Record<Variant, string> = {
  success: 'bg-emerald-950/30 border-emerald-900/50',
  error: 'bg-red-950/30 border-red-900/50',
  warning: 'bg-yellow-950/30 border-yellow-900/50',
  info: 'bg-sky-950/30 border-sky-900/50',
  neutral: 'bg-zinc-900/50 border-zinc-800',
}

export const TEXT_STYLES: Record<Variant, string> = {
  success: 'text-emerald-300',
  error: 'text-red-300',
  warning: 'text-yellow-300',
  info: 'text-sky-300',
  neutral: 'text-zinc-300',
}
