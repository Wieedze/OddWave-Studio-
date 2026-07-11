// A Sound Design gallery entry. Renders a real <video> player when `src` is set,
// otherwise a simulated poster + progress tile (placeholder awaiting client media).

export class VideoEntry {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly cat: string,
    readonly dur: string,
    readonly note: string,
    readonly posterImg: string,
    /** Real media path; absent for placeholder tiles. */
    readonly src?: string,
    /** YouTube video id; when set, the modal embeds the YouTube player. */
    readonly youtubeId?: string,
  ) {}

  /** True when a real, playable video is available. */
  get isPlayable(): boolean {
    return Boolean(this.src || this.youtubeId);
  }
}
