// Route table for vite-react-ssg. Every path is static and pre-rendered.
//
// The same page list is mounted twice: once at the root (French) and once under
// "/en" (English). That is what makes the English site real HTML files rather
// than a client-side toggle, so search engines and AI crawlers can index both.
// Sixteen files come out of the build; keep public/sitemap.xml in step.

import type { RouteRecord } from 'vite-react-ssg';
import { RootLayout } from '@/layout/RootLayout';
import { HomePage } from '@/pages/Home';
import { ServicesPage } from '@/pages/Services';
import { EquipmentPage } from '@/pages/Equipment';
import { GuidancePage } from '@/pages/Guidance';
import { SoundDesignPage } from '@/pages/SoundDesign';
import { PortfolioPage } from '@/pages/Portfolio';
import { ExportsPage } from '@/pages/Exports';
import { ContactPage } from '@/pages/Contact';

/** Paths are relative, so the list can be mounted under any prefix. */
function pages(): RouteRecord[] {
  return [
    { index: true, element: <HomePage /> },
    { path: 'services', element: <ServicesPage /> },
    { path: 'equipment', element: <EquipmentPage /> },
    { path: 'guidance', element: <GuidancePage /> },
    { path: 'sound-design', element: <SoundDesignPage /> },
    { path: 'portfolio', element: <PortfolioPage /> },
    { path: 'exports', element: <ExportsPage /> },
    { path: 'contact', element: <ContactPage /> },
  ];
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [...pages(), { path: 'en', children: pages() }],
  },
];
