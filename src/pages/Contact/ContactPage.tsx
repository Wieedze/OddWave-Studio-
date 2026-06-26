// Contact — form (Nom/Email, "besoin" chips, Projet) + direct channels.
// Full build in a later step (wires ContactService). Reference:
// design-handoff/Contact OddWave.dc.html.

import { PageHero, PagePlaceholder } from '@/components';
import { usePageMotion } from '@/hooks';

export function ContactPage() {
  const ref = usePageMotion<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero title="CONTACT" eyebrow="Parlons de votre projet" image="/assets/photo-monitor.jpg" />
      <PagePlaceholder purpose="Le formulaire de contact et les canaux directs (email, Instagram, studio). Contenu en cours d'intégration." />
    </div>
  );
}
