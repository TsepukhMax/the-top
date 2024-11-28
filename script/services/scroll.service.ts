import { MovieSectionBaseComponent } from "../components/movie-section-base.component";

export class ScrollService {
  private movieSections: Map<number, MovieSectionBaseComponent> = new Map();

  private static readonly DURATION_SCROLL = 800; // Static constant for duration

  /**
   * Registers an HTML section for a movie
   * @param movieId - ID movie.
   * @param sectionComponent - section component
   * @param targetPosition - Final position.
   */

  public registerSection(movieId: number, sectionComponent: MovieSectionBaseComponent): void {
    this.movieSections.set(movieId, sectionComponent);
  }

  // Smoothly scrolls to the section related to the movie ID
  public scrollToMovieSection(movieId: number): void {
    const component = this.movieSections.get(movieId);

    this.smoothScrollTo(component.section.offsetTop);
  }

  // Smoothly scrolls to a certain position
  private smoothScrollTo(targetPosition: number): void {
    const startPosition = document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animationScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / ScrollService.DURATION_SCROLL, 1);

      document.documentElement.scrollTop = startPosition + distance * progress;

      if (timeElapsed < ScrollService.DURATION_SCROLL) {
        requestAnimationFrame(animationScroll);
      }
    };

    requestAnimationFrame(animationScroll);
  }
}