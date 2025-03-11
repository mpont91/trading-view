export function getFirstSegment(): string {
  return window.location.pathname.split('/').filter(Boolean)[0] || ''
}
