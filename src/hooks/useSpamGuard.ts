// useSpamGuard — client half of the contact-form bot filter (server half in
// worker/contact.ts). It provides two signals that a human never trips:
//   - `trap`: value of a hidden honeypot field (<HoneypotField/>). People never
//     see it; form-filling bots fill every input they find.
//   - `elapsedMs()`: time since the form mounted. Scripts post in well under a
//     second; nobody types a name, an email and a message that fast.
// The Worker answers a fake success when either signal fires, so the bot never
// learns it was dropped.

import { useEffect, useRef, useState } from 'react';

export interface SpamGuard {
  trap: string;
  setTrap: (value: string) => void;
  elapsedMs: () => number;
}

export function useSpamGuard(): SpamGuard {
  const [trap, setTrap] = useState('');
  // Set in an effect, not at render: the page is pre-rendered, and the clock
  // must start when the form is live in the visitor's browser.
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  return {
    trap,
    setTrap,
    elapsedMs: () => (startedAt.current === null ? 0 : Date.now() - startedAt.current),
  };
}
