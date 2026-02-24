import { useRef } from 'react';

/** Stub: scroll reveal was removed. Kept so Tailwind content scan does not fail. */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>() {
  return useRef<T>(null);
}
