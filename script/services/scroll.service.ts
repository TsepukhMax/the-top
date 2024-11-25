export class ScrollService {
  
  private movieSections: Map<number, HTMLElement> = new Map();

  /**
   * Registers an HTML section for a movie
   * @param movieId - ID movie.
   * @param section - HTML-section.
   * @param durationScroll - Scroll animation duration (in ms).
   * @param targetPosition - Final position.
   */

  public registerSection(movieId: number, section: HTMLElement): void {
    this.movieSections.set(movieId, section);
  }

  // Returns the section by its ID
  public getSection(movieId: number): HTMLElement {
    return this.movieSections.get(movieId);
  }

  // Deletes a registered section
  public removeSection(movieId: number): void {
    this.movieSections.delete(movieId);
  }

  // Smoothly scrolls to the section related to the movie ID
  public scrollToMovieSection(movieId: number, durationScroll: number): void {
    const section = this.getSection(movieId);

    const targetPosition = section.offsetTop;
    this.smoothScrollTo(targetPosition, durationScroll);
  }

  // Smoothly scrolls to a certain position
  private smoothScrollTo(targetPosition: number, durationScroll: number): void {
    const startPosition = document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animationScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / durationScroll, 1);

      document.documentElement.scrollTop = startPosition + distance * progress;

      if (timeElapsed < durationScroll) {
        requestAnimationFrame(animationScroll);
      }
    };

    requestAnimationFrame(animationScroll);
  }
}