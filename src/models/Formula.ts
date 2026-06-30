// A guidance "formule" card. Clicking it pre-fills the request form.

export class Formula {
  constructor(
    readonly id: string,
    readonly name: string,
    /** Short qualifier shown as a label (e.g. "Entrée", "Premium"). */
    readonly tag: string,
    /** What the formula includes, as bullet points. */
    readonly bullets: readonly string[],
  ) {}
}
