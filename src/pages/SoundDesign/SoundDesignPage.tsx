// Sound Design — cinematic hero video + playable reel grid + modal player.
// Full build in a later step. Reference: design-handoff/Sound Design OddWave.dc.html.

import { PageHero, PagePlaceholder } from '@/components';
import { usePageMotion } from '@/hooks';

export function SoundDesignPage() {
  const ref = usePageMotion<HTMLDivElement>();
  return (
    <div ref={ref}>
      <PageHero title="SOUND DESIGN" eyebrow="Réalisations · Showreel" image="/assets/sd-irradiation-poster.jpg" focus="center 28%" />
      <PagePlaceholder purpose="Le sound design et le re-sound-design : hero vidéo, showreel et grille de réalisations avec lecteur modal. Contenu en cours d'intégration." />
    </div>
  );
}
