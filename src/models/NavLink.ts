// Navigation entry. Side decides which group of the floating pill it belongs to.

export type NavSide = 'left' | 'right';

export class NavLink {
  constructor(
    readonly label: string,
    readonly to: string,
    readonly side: NavSide,
    /** Renders as the copper primary pill (the Contact link). */
    readonly primary: boolean = false,
  ) {}
}
