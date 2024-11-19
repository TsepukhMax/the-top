import { WrapperDescriptionComponent } from "./wrapper-description.component";
import { ListenButtonComponent } from "./listen-button.components";
import { PopupComponent } from "./popup.component";
import { IComponent, IMovieData } from "../interfaces";

export abstract class MovieSectionBaseComponent implements IComponent {
  constructor(protected movieData: IMovieData) {}

  public abstract render(): HTMLElement;

  // Method for WrapperDescriptionComponent
  protected createWrapperDescription(): HTMLElement {
    const wrapperDescription = new WrapperDescriptionComponent(
      this.movieData.title,
      this.formatRating(this.movieData.rating),
      this.movieData.description
    ).render();
    wrapperDescription.classList.add("wrapper-description");
    return wrapperDescription;
  }

  // Method for ListenButtonComponent
  protected createListenButton(): HTMLElement {
    const listenButton = new ListenButtonComponent(() => {
      // stop video in slider
      document.querySelectorAll(".slid-video").forEach((video: HTMLVideoElement) => {
        video.pause();
        const closestSlide = video.closest(".slid");
        closestSlide.classList.remove("playing");
        closestSlide.querySelector(".button-play").classList.remove("button-stop");
      });

      // create POPUP
      const popup = new PopupComponent(
        this.movieData.title,
        this.formatRating(this.movieData.rating),
        this.movieData.audioUrl
      );

      document.body.appendChild(popup.render());
      document.body.classList.add("body-wrapper");
    }).render();

    listenButton.classList.add("button");
    return listenButton;
  }

  // Method for format rating
  private formatRating(rating: number): string {
    return `.${rating.toString().padStart(2, '0')}`;
  }
}