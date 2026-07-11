// Route table for vite-react-ssg. Every path is static and pre-rendered.

import type { RouteRecord } from 'vite-react-ssg';
import { RootLayout } from '@/layout/RootLayout';
import { HomePage } from '@/pages/Home';
import { StudioPage } from '@/pages/Studio';
import { EquipmentPage } from '@/pages/Equipment';
import { GuidancePage } from '@/pages/Guidance';
import { SoundDesignPage } from '@/pages/SoundDesign';
import { PortfolioPage } from '@/pages/Portfolio';
import { ExportsPage } from '@/pages/Exports';
import { ContactPage } from '@/pages/Contact';

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'studio', element: <StudioPage /> },
      { path: 'equipment', element: <EquipmentPage /> },
      { path: 'guidance', element: <GuidancePage /> },
      { path: 'sound-design', element: <SoundDesignPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'exports', element: <ExportsPage /> },
      { path: 'contact', element: <ContactPage /> },
    ],
  },
];
