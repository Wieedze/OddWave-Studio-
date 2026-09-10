// Reads the current language straight off the router path, and resolves the
// localized content modules against it.
//
// No context and no provider: the locale is in the URL, so every pre-rendered
// page already knows its language before a single effect runs.

import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { localeFromPath, pathForLocale, type Locale, type Localized } from '@/helpers';

/** The language of the page being rendered. */
export function useLocale(): Locale {
  return localeFromPath(useLocation().pathname);
}

/** Picks the current language out of a localized content module. */
export function useText<T>(dictionary: Localized<T>): T {
  return dictionary[useLocale()];
}

/** Prefixes an app path for the current language: "/contact" → "/en/contact". */
export function useLocalePath(): (path: string) => string {
  const locale = useLocale();
  return useCallback((path: string) => pathForLocale(path, locale), [locale]);
}
