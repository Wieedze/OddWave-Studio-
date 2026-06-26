// Le Studio — present the space and the engineer. Full build in a later step
// (see docs/pages.md). Reference: design-handoff/Studio OddWave.dc.html.

import { PageHero, PagePlaceholder } from '@/components';
import { usePageMotion } from '@/hooks';

export function StudioPage() {
  const ref = usePageMotion<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero title="LE STUDIO" eyebrow="Le lieu · L'ingénieur" image="/assets/console.jpg" />
      <PagePlaceholder purpose="Le studio, l'espace et l'ingénieur Théo Grozdanic : bio, résidence, pédagogie. Contenu en cours d'intégration." />
    </div>
  );
}
