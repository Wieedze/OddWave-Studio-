// FR / EN toggle. Two languages means a toggle, not a dropdown, and text
// labels, never flags: a flag names a country, not a language.
//
// It links to the SAME page in the other language, so a visitor reading
// /services lands on /en/services rather than being dropped on the home page.
// Plain <Link> on purpose: the target path is already locale-resolved here, so
// LocaleLink (which prefixes for the CURRENT locale) would undo the switch.

import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LOCALES, LOCALE_LABEL, LOCALE_NAME, localeFromPath, pathForLocale } from '@/helpers';
import './LocaleSwitch.css';

interface LocaleSwitchProps {
  /** Accessible name of the group, in the page's language. */
  label: string;
  /** Where it is rendered; drives size and chrome. */
  place: 'nav' | 'menu' | 'footer';
}

export function LocaleSwitch({ label, place }: LocaleSwitchProps) {
  const { pathname } = useLocation();
  const current = localeFromPath(pathname);

  return (
    <div className={`ow-locale ow-locale--${place}`} role="group" aria-label={label}>
      {LOCALES.map((locale, i) => {
        const active = locale === current;
        return (
          <Fragment key={locale}>
            {i > 0 && (
              <span className="ow-locale-sep" aria-hidden="true">
                /
              </span>
            )}
            <Link
              to={pathForLocale(pathname, locale)}
              className={active ? 'ow-locale-link is-active' : 'ow-locale-link'}
              hrefLang={locale}
              lang={locale}
              aria-label={LOCALE_NAME[locale]}
              {...(active ? { 'aria-current': 'true' as const } : {})}
            >
              {LOCALE_LABEL[locale]}
            </Link>
          </Fragment>
        );
      })}
    </div>
  );
}
