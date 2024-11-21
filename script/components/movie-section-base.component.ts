import { WrapperDescriptionComponent } from "./wrapper-description.component";
import { ListenButtonComponent } from "./listen-button.components";
import { PopupComponent } from "./popup.component";
import { IComponent, IMovieData, Services} from "../interfaces";
import { DataService } from "../services/data.service";
import { ServiceContainer } from "../services/service-container";

export abstract class MovieSectionBaseComponent implements IComponent {
  private dataService: DataService = ServiceContainer.inject<DataService>(Services.DataService)

  constructor(protected movieData: IMovieData) {}

  public abstract render(): HTMLElement;

  // Method for WrapperDescriptionComponent
  protected createWrapperDescription(): HTMLElement {
    const wrapperDescription = new WrapperDescriptionComponent(
      this.movieData.title,
      this.formatRating(this.movieData.rating),
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
      document.querySelectorAll(".slid-video").forEach((video: HTMLVideoElement) => {
        video.pause();
        const closestSlide = video.closest(".slid");
        closestSlide.classList.remove("playing");
        closestSlide.querySelector(".button-play").classList.remove("button-stop");
      });

      const movieAudioData = this.dataService.getMovieAudioData(this.movieData.id);

      // create POPUP
      const popup = new PopupComponent(
        this.movieData.title,
        this.formatRating(this.movieData.rating),
        movieAudioData.audioUrl
      );

      document.body.appendChild(popup.render());
      document.body.classList.add("body-wrapper");
    });
  }

  // Method for format rating
  private formatRating(rating: number): string {
    return `.${rating.toString().padStart(2, '0')}`;
  }
}