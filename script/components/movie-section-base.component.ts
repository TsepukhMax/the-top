import { WrapperDescriptionComponent } from "./wrapper-description.component";
import { ListenButtonComponent } from "./listen-button.component";
import { PopupComponent } from "./popup.component";
import { IComponent, IMovieData, Services} from "../interfaces";
import { DataService } from "../services/data.service";
import { ServiceContainer } from "../services/service-container";
import { SlidesService } from "../services/slides.service";
import { formatRating } from "../utils";

export abstract class MovieSectionBaseComponent implements IComponent {
  private dataService: DataService = ServiceContainer.inject<DataService>(Services.DataService)
  private slidesService: SlidesService = ServiceContainer.inject<SlidesService>(Services.SlidesService);

  constructor(protected movieData: IMovieData) {}

  public abstract render(): HTMLElement;

  // stop video
  private stopAllVideos(): void {
    this.slidesService.stop();
  }

  // Method for WrapperDescriptionComponent
  protected createWrapperDescription(): HTMLElement {
    const wrapperDescription = new WrapperDescriptionComponent(
      this.movieData.title,
      formatRating(this.movieData.rating),
      this.movieData.description,
      this.createListenButton() // Передаємо сам компонент
    ).render();

    wrapperDescription.classList.add("wrapper-description");
    return wrapperDescription;
  }

  // Method for ListenButtonComponent
  private createListenButton(): ListenButtonComponent {
    return new ListenButtonComponent(() => {
      // stop video in slider
      this.stopAllVideos();

      const movieAudioData = this.dataService.getMovieAudioData(this.movieData.id);

      // create POPUP
      const popup = new PopupComponent(
        this.movieData.title,
        formatRating(this.movieData.rating),
        movieAudioData.audioUrl
      );

      document.body.appendChild(popup.render());
      document.body.classList.add("body-wrapper");
    });
  }
}