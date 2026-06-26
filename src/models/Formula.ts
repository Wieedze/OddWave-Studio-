// A guidance "formule" row. Clicking it pre-fills the request form.

export class Formula {
  constructor(
    readonly id: string,
    readonly name: string,
    /** What the formula covers ("Ce que ça comprend"). */
    readonly description: string,
    /** Format label ("Format"), e.g. "Visio · 1h30". */
    readonly format: string,
  ) {}
}
