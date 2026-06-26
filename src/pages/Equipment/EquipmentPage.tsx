// Le Matériel — showcase the gear. Full build in a later step.
// Reference: design-handoff/Materiel OddWave.dc.html.

import { PageHero, PagePlaceholder } from '@/components';
import { usePageMotion } from '@/hooks';

export function EquipmentPage() {
  const ref = usePageMotion<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero title="LE MATÉRIEL" eyebrow="La chaîne analogique" image="/assets/photo-rack.jpg" />
      <PagePlaceholder purpose="Le matériel du studio : hero, détails en gros plan et appel à projet. Contenu en cours d'intégration." />
    </div>
  );
}
