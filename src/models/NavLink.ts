// Navigation entry. Side decides which group of the floating pill it belongs to.

export type NavSide = 'left' | 'right';

export class NavLink {
  constructor(
    readonly label: string,
    /** Internal route ("/services") or, when `external`, an absolute URL. */
    readonly to: string,
    readonly side: NavSide,
    /** External link → renders a plain <a> opening in a new tab. */
    readonly external: boolean = false,
  ) {}
}
