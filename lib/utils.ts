import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LOCALHOST_HOSTNAMES = new Set(['localhost', '127.0.0.1', '::1']);

function isLocalhostHostname(hostname: string): boolean {
  return LOCALHOST_HOSTNAMES.has(hostname);
}

/**
 * Checks whether the app is currently running on localhost.
 * Pass a `hostname` when calling from server-side code (e.g. `proxy.ts`),
 * where `window` isn't available. Falls back to `window.location.hostname`
 * on the client, and returns `false` during SSR when no hostname is given.
 */
export function isLocalhost(hostname?: string): boolean {
  if (hostname) {
    return isLocalhostHostname(hostname);
  }

  if (typeof window === 'undefined') {
    return false;
  }

  return isLocalhostHostname(window.location.hostname);
}
