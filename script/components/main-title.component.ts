import { IComponent } from "../interfaces";
import { generateSectionId } from "../utils";
import { ScrollService } from "../services/scroll.service";
import { ServiceContainer } from "../services/service-container";
import { Services } from "../interfaces";

export class MainTitleComponent implements IComponent {
  private anchorId: string;
  private scrollService: ScrollService; // ScrollService injected

  constructor(private movieId: number) {
    this.anchorId = generateSectionId(movieId); // generate an ID for the first movie
    this.scrollService = ServiceContainer.inject<ScrollService>(Services.ScrollService); // Inject ScrollService
  }

  public render(): HTMLElement {

    const section = document.createElement("section");
    section.classList.add("main-title");

    const container = document.createElement("div");
    container.classList.add("container");

    container.appendChild(this.createTitle());
    container.appendChild(this.createSubtitle());
    container.appendChild(this.createArrowLink());

    section.appendChild(container);

    return section;
  }

  private createTitle(): HTMLElement {
    const h1 = document.createElement("h1");
    const span = document.createElement("span");
    span.textContent = "The 10";
    h1.appendChild(span);
    h1.append(" Best Movie Soundtracks of All-Time");
    return h1;
  }

  private createSubtitle(): HTMLElement {
    const p = document.createElement("p");
    p.textContent =
      "Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.";
    return p;
  }

  private createArrowLink(): HTMLElement {
    const link = document.createElement("a");
    link.classList.add("arrow");
    link.href = `#${this.anchorId}`; // dynamic link for the first section

    const img = document.createElement("img");
    img.src = "img/arrow.svg";
    img.alt = "arrow";
    link.appendChild(img);

    // Attach click event for smooth scrolling
    link.addEventListener("click", (event) => {
      event.preventDefault();
      this.scrollService.scrollToMovieSection(this.movieId, 800); // Pass correct movieId
    });

    return link;
  }
}