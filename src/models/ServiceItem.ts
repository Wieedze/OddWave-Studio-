// A landing "prestation" panel: alternating image / text glass card.

export type ImageSide = 'left' | 'right';

export class ServiceItem {
  constructor(
    readonly id: string,
    readonly title: string,
    /** Full body copy (verbatim French from the handoff). */
    readonly body: string,
    /** Background image path under /assets. */
    readonly image: string,
    /** Which side the media block sits on. */
    readonly imageSide: ImageSide,
    /** CSS background-position for the media. */
    readonly imageFocus: string,
    readonly ctaLabel: string = 'Demander un devis →',
    readonly ctaHref: string = '/#contact',
  ) {}
}
