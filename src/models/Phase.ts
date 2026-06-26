// A guidance "méthode" phase card (with the giant ghost number).

export class Phase {
  constructor(
    /** Two-digit label, e.g. "01". Also the ghost number. */
    readonly number: string,
    /** Eyebrow sentence (copper). */
    readonly eyebrow: string,
    /** One-line title. */
    readonly title: string,
    /** Dash-bulleted list items. */
    readonly bullets: readonly string[],
  ) {}
}
