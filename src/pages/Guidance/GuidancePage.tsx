// Accompagnement — artist guidance: 4 phases, formules table, request form.
// Full build in a later step (read this one carefully, docs/pages.md).
// Reference: design-handoff/Accompagnement OddWave.dc.html.

import { PageHero, PagePlaceholder } from '@/components';
import { usePageMotion } from '@/hooks';

export function GuidancePage() {
  const ref = usePageMotion<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero title="ACCOMPAGNEMENT" eyebrow="La méthode" image="/assets/photo-engineer.jpg" />
      <PagePlaceholder purpose="L'accompagnement d'artistes : méthode en 4 phases, formules et demande. Contenu en cours d'intégration." />
    </div>
  );
}
