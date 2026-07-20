// A "prestation" panel (Services page): alternating image / text glass card.

export type ImageSide = 'left' | 'right';

export class ServiceItem {
  constructor(
    readonly id: string,
    readonly title: string,
    /** Body copy as paragraphs (verbatim French, split only at sentence boundaries). */
    readonly body: readonly string[],
    /** Background image path under /assets. */
    readonly image: string,
    /** Which side the media block sits on. */
    readonly imageSide: ImageSide,
    /** CSS background-position for the media. */
    readonly imageFocus: string,
    readonly ctaLabel: string = 'Demander un devis →',
    readonly ctaHref: string = '/contact',
  ) {}
}
