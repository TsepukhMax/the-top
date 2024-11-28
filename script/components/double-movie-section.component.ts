import { IMovieData } from "../interfaces";
import { generateSectionId } from "../utils";
import { MovieSectionBaseComponent } from "./movie-section-base.component";

export class DoubleMovieSectionComponent extends MovieSectionBaseComponent {
  constructor(movieData: IMovieData) {
    super(movieData);
  }

  public render(): HTMLElement {
    // main section
    this.section = document.createElement("section");
    // generating unique id for movie
    this.section.id = generateSectionId(this.movieData.id);
    this.section.classList.add("movie-section", "double-section");

    // Set dynamic background images
    this.setBackgroundImages(this.section);

    // HTML for container
    const container = document.createElement("div");
    container.classList.add("container");

    // HTML for wrapper
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    // Added description and button to wrapper
    wrapper.appendChild(this.createWrapperDescription());

    container.appendChild(wrapper);
    this.section.appendChild(container);

    return this.section;
  }

  //dynamic background images
  private setBackgroundImages(section: HTMLElement): void {
    section.style.backgroundImage = this.movieData.imageUrls.map((url) => `url(${url})`).join(", ");
  }
}