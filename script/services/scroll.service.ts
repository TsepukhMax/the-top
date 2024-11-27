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
  public scrollToMovieSection(movieId: number, durationScroll: number = ScrollService.DURATION_SCROLL): void {
    const component = this.movieSections.get(movieId);

    const targetPosition = component.offsetTop;
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