import { IComponent } from "../interfaces";
import { DataService } from "../services/data.service";
import { ServiceContainer } from "../services/service-container";
import { Services } from "../interfaces";
import { generateSectionId } from "../utils";

export class MainTitleComponent implements IComponent {
  private dataService: DataService;
  private anchorId: string;

  constructor() {
    //  injecting DataService from ServiceContainer
    this.dataService = ServiceContainer.inject<DataService>(Services.DataService);
    const movieData = this.dataService.getMovieData();
    this.anchorId = generateSectionId(movieData[0].id); // generate an ID for the first movie
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
    p.textContent = "Awesome movie soundtracks can turn a good movie like Guardians Of The Galaxy or Star Wars into iconic ones.";
    return p;
  }

  private createArrowLink(): HTMLElement {
    const link = document.createElement("a");
    link.classList.add("arrow");
    link.href = `#${this.anchorId}`; // dynamic link for 1-st section

    const img = document.createElement("img");
    img.src = "img/arrow.svg";
    img.alt = "arrow";
    link.appendChild(img);

    // Attach click event for smooth scrolling
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetElement = document.getElementById(this.anchorId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop;
        this.smoothScrollTo(targetPosition, 800);
      }
    });

    return link;
  }

  // Smooth scroll method
  private smoothScrollTo(targetPosition: number, durationScroll: number): void {
    const startPosition = document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    const startTime = performance.now();

    const animationScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / durationScroll, 1);

      document.documentElement.scrollTop = startPosition + distance * progress;
      document.body.scrollTop = startPosition + distance * progress;

      if (timeElapsed < durationScroll) {
        requestAnimationFrame(animationScroll);
      }
    };

    requestAnimationFrame(animationScroll);
  }
}