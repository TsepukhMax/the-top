import { SlideMovieComponent } from "../components/slide-movie.component";

export class SlidesService {
  private slidesContainer: Record<number, SlideMovieComponent> = {};

  /** Тимчасово прописуватиму коментарі детально, щоб нічого не пропустити
   * Додає слайд-компонент у контейнер.
   * @param movieId - ID фільму.
   * @param slideComponent - Інстанс SlideMovieComponent.
   */
  public add(movieId: number, slideComponent: SlideMovieComponent): void {
    this.slidesContainer[movieId] = slideComponent;
  }

  /**
   * Зупиняє всі слайди, крім зазначеного.
   * @param excludeMovieId - (опціонально) ID фільму, який не повинен зупинятися.
   */
  public stop(excludeMovieId?: number): void {
    Object.entries(this.slidesContainer).forEach(([id, slideComponent]) => {
      if (id !== excludeMovieId?.toString()) {
        slideComponent.reset();
      }
    });
  }
}
