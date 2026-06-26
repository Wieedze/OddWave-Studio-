// A guidance "formule" row. Clicking it pre-fills the request form.

export class Formula {
  constructor(
    readonly id: string,
    readonly name: string,
    /** What the formula covers. */
    readonly scope: string,
    readonly rhythm: string,
    readonly price: string,
  ) {}
}
