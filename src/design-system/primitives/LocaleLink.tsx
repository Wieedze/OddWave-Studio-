// Internal link that keeps the visitor in their language. Give it the canonical
// French path ("/contact", "/#contact") and it prefixes for the current locale,
// so no caller has to know whether it is rendering the /en tree.

import type { ComponentProps } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { localeFromPath, pathForLocale } from '@/helpers';

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, 'to'> & { to: string };

export function LocaleLink({ to, ...rest }: LocaleLinkProps) {
  const { pathname } = useLocation();
  return <Link to={pathForLocale(to, localeFromPath(pathname))} {...rest} />;
}
