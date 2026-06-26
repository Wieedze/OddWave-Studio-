// Portfolio — discography / cover wall. Full build in a later step.
// Reference: design-handoff/Portfolio OddWave.dc.html.

import { PageHero, PagePlaceholder } from '@/components';
import { usePageMotion } from '@/hooks';

export function PortfolioPage() {
  const ref = usePageMotion<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero title="PORTFOLIO" eyebrow="Discographie · Travaux" image="/assets/mastering-bokeh.jpg" />
      <PagePlaceholder purpose="Le portfolio : mur de pochettes et discographie. Contenu en cours d'intégration." />
    </div>
  );
}
