import { IComponent, IMovieData } from "../interfaces";
import { SlideMovieComponent } from "./slide-movie.component";

export class SliderSectionComponent implements IComponent {
  private slidsWrapper: HTMLElement;
  private maxSlideIndex: number;
  private currentSlide: number;

  constructor(private movieDataList: IMovieData[], initialSlideIndex: number = 1) {
    this.maxSlideIndex = this.movieDataList.length - 1;
    this.currentSlide = initialSlideIndex;
  }

  public render(): HTMLElement {
    // Create section
    const section = document.createElement("section");
    section.classList.add("slider-section");

    const slider = document.createElement("div");
    slider.classList.add("slider");

    this.slidsWrapper = document.createElement("div");
    this.slidsWrapper.classList.add("slids-wrapper");

    // Create slides using movieDataList
    this.movieDataList.forEach((movieData) => {
      const slideMovieComponent = new SlideMovieComponent(movieData);
      this.slidsWrapper.appendChild(slideMovieComponent.render());
    });

    slider.appendChild(this.slidsWrapper);

    // Append arrows with functionality
    slider.appendChild(this.createArrowLeft());
    slider.appendChild(this.createArrowRight());

    // Set the initial margin to show the correct slide
    this.setSlideMargin();

    // Add slider to section
    section.appendChild(slider);

    return section;
  }

  private createArrowLeft(): HTMLElement {
    const arrowLeft = document.createElement("a");
    arrowLeft.classList.add("arrow-left");
    arrowLeft.href = "#";

    const arrowLeftImg = document.createElement("img");
    arrowLeftImg.src = "img/arrow.svg";
    arrowLeftImg.alt = "arrow-left";

    arrowLeft.appendChild(arrowLeftImg);

    arrowLeft.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.setSlideMargin();
      }
    });

    return arrowLeft;
  }

  private createArrowRight(): HTMLElement {
    const arrowRight = document.createElement("a");
    arrowRight.classList.add("arrow-right");
    arrowRight.href = "#";

    const arrowRightImg = document.createElement("img");
    arrowRightImg.src = "img/arrow.svg";
    arrowRightImg.alt = "arrow-right";

    arrowRight.appendChild(arrowRightImg);

    arrowRight.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.currentSlide < this.maxSlideIndex) {
        this.currentSlide++;
        this.setSlideMargin();
      }
    });

    return arrowRight;
  }

  // initial margin for the slides wrapper
  private setSlideMargin(): void {
    this.slidsWrapper.style.marginLeft = `${this.currentSlide * -100}%`;
  }
}