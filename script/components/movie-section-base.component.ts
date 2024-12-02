import { WrapperDescriptionComponent } from "./wrapper-description.component";
import { ListenButtonComponent } from "./listen-button.component";
import { PopupComponent } from "./popup.component";
import { IComponent, IMovieData, Services} from "../interfaces";
import { DataService } from "../services/data.service";
import { ServiceContainer } from "../services/service-container";
import { SlidesService } from "../services/slides.service";
import { ScrollService } from "../services/scroll.service";
import { formatRating } from "../utils";

export abstract class MovieSectionBaseComponent implements IComponent {
  private dataService: DataService = ServiceContainer.inject<DataService>(Services.DataService)
  private slidesService: SlidesService = ServiceContainer.inject<SlidesService>(Services.SlidesService);
  private scrollService: ScrollService = ServiceContainer.inject<ScrollService>(Services.ScrollService);

  protected section: HTMLElement;

  constructor(protected movieData: IMovieData) {
    this.scrollService.registerSection(this.movieData.id, this);
  }

  public abstract render(): HTMLElement;

  // get for offsetTop
  public get offsetTop(): number {
    return this.section.offsetTop; // Повертає позицію секції
  }

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
      this.createListenButton()
    ).render();

    wrapperDescription.classList.add("wrapper-description");
    return wrapperDescription;
  }

  // Method for ListenButtonComponent
  private createListenButton(): ListenButtonComponent {
    return new ListenButtonComponent(() => {
      // stop video in slider
      this.stopAllVideos();
  
      // get audio data from a callback
      this.dataService.getMovieAudioData(this.movieData.id).then((movieAudioData) => {
        // create POPUP
        const popup = new PopupComponent(
          this.movieData.title,
          formatRating(this.movieData.rating),
          movieAudioData.audioUrl
        );

        document.body.appendChild(popup.render());
        document.body.classList.add("body-wrapper");
      });
    });
  }
}