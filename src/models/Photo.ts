// A photograph shown in a gallery tile and enlarged in the PhotoLightbox.
// Two sources: `src` is sized for the tile, `full` (when supplied) is the
// higher-resolution copy the lightbox loads on demand.

export class Photo {
  constructor(
    /** Tile-sized image path under /assets. */
    readonly src: string,
    /** Described for screen readers and crawlers; never rendered on screen. */
    readonly alt: string,
    /** Fullscreen copy; falls back to `src` when the tile image is enough. */
    readonly full?: string,
  ) {}

  /** The source the lightbox should load. */
  get large(): string {
    return this.full ?? this.src;
  }
}
