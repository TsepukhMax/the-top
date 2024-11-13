import { WrapperDescriptionComponent } from "./wrapper-description.component";
import { ListenButtonComponent } from "./listen-button.components";
import { PopupComponent } from "./popup.component";
import { IComponent } from "../interfaces/i-component";
import { IMovieData } from "../interfaces/i-movie-data";

export class MovieSectionComponent implements IComponent {
  constructor(private movieData: IMovieData) {}

  public render(): HTMLElement {
    // main section
    const section = document.createElement("section");
    section.id = "movie-01";
    section.classList.add("movie-section");

    // HTML for container
    const container = document.createElement("div");
    container.classList.add("container");

    // HTML for wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    // HTML for img
    const image = document.createElement("img");
    image.src = this.movieData.imageUrls[0];
    image.alt = this.movieData.title;
    wrapper.appendChild(image);

    // Added description and button to wrapper
    wrapper.appendChild(this.createWrapperDescription());
    wrapper.querySelector('.wrapper-text').appendChild(this.createListenButton());
    
    container.appendChild(wrapper);
    section.appendChild(container);

    return section;
  }

  // Method for WrapperDescriptionComponent
  private createWrapperDescription(): HTMLElement {
    const wrapperDescription = new WrapperDescriptionComponent(
      this.movieData.title,
      this.formatRating(this.movieData.rating),
      this.movieData.description
    ).render();
    wrapperDescription.classList.add("wrapper-description");
    return wrapperDescription;
  }
  // Method for ListenButtonComponent 
  private createListenButton(): HTMLElement {
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