import { IMovieData } from "../interfaces";
import { generateSectionId } from "../utils";
import { MovieSectionBaseComponent } from "./movie-section-base.component";

export class MovieSectionComponent extends MovieSectionBaseComponent  {
  constructor(movieData: IMovieData, private isReversed: boolean = false) {
    super(movieData);
  }

  public render(): HTMLElement {
    // main section
    this.section = document.createElement("section");
    // generating unique id for movie
    this.section.id = generateSectionId(this.movieData.id);
    this.section.classList.add("movie-section");

    // Add reverse class if - true
    if (this.isReversed) {
      this.section.classList.add("movie-section-reverse");
    }

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

    container.appendChild(wrapper);
    this.section.appendChild(container);

    return this.section;
  }
}