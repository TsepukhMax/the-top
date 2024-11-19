import { movieDataList } from "../data";
import { MovieSectionComponent } from "./movie-section.component";
import { DoubleMovieSectionComponent } from "./double-movie-section.component";
import { SliderSectionComponent } from "./slider-section.component";

export class RootComponent {
  private rootElement: HTMLElement;

  constructor() {
    this.rootElement = document.createElement("div"); // Root element
  }

  render(): HTMLElement {
    const sectionsBuffer: HTMLElement[] = []; // Temporary buffer

    for (let i = 0; i < movieDataList.length; i++) {
      const movieData = movieDataList[i];
      const section = this.createSection(i, movieData);

      sectionsBuffer.push(section); // Save the section to the buffer

      // Add slider after every three sections
      if ((i + 1) % 3 === 0 && sectionsBuffer.length === 3) {
        this.addSlider(sectionsBuffer); // Call the addSlider method
        sectionsBuffer.length = 0; // Clean the buffer after adding the slider
      }
    }

    // Add any remaining sections if no slider was added
    sectionsBuffer.forEach((section) => {
      this.rootElement.appendChild(section);
    });

    return this.rootElement;
  }

  // Method for section construction pattern
  private createSection(i: number, movieData: any): HTMLElement {
    if (i % 3 === 0) {
      return new MovieSectionComponent(movieData).render();
    } else if (i % 3 === 1) {
      return new MovieSectionComponent(movieData, true).render();
    } else if (i % 3 === 2) {
      return new DoubleMovieSectionComponent(movieData).render();
    }
  }

  private addSlider(sectionsBuffer: HTMLElement[]): void {
    const sliderData = sectionsBuffer.map((sectionElement) =>
      movieDataList.find((movie) => sectionElement.innerHTML.includes(movie.title))
    );

    const slider = new SliderSectionComponent(sliderData);
    this.addSectionsToDOM(sectionsBuffer); // Add sections to the DOM
    this.rootElement.appendChild(slider.render());
    
  }

  private addSectionsToDOM(sectionsBuffer: HTMLElement[]): void {
    sectionsBuffer.forEach((sectionElement) => {
      this.rootElement.appendChild(sectionElement);
    });
  }
}
