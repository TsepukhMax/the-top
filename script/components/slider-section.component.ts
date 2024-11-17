import { IComponent } from "../interfaces/i-component";
import { IMovieData } from "../interfaces/i-movie-data";
import { SlideMovieComponent } from "./slide-movie.component";

export class SliderSectionComponent implements IComponent {
  private slidsWrapper: HTMLElement;
  private maxSlideIndex: number;
  private currentSlide = 0;

  constructor(private movieDataList: IMovieData[]) {
    this.maxSlideIndex = Math.max(movieDataList.length - 1, 0); // Initialization of the maximum
  }

  public render(): HTMLElement {
    // Create section
    const section = document.createElement("section");
    section.classList.add("slider-section");
  
    const slider = document.createElement("div");
    slider.classList.add("slider");
  
    this.slidsWrapper = document.createElement("div"); // Initialization slidsWrapper
    this.slidsWrapper.classList.add("slids-wrapper");
  
    // Create slide using movieDataList
    this.movieDataList.forEach((movieData) => {
      const slideMovieComponent = new SlideMovieComponent(movieData);
      this.slidsWrapper.appendChild(slideMovieComponent.render());
    });
  
    slider.appendChild(this.slidsWrapper);
  
    // Calculate the number of slides
    const maxSlideIndex = this.movieDataList.length - 1;
  
    // Current slide state (mutable object)
    const currentSlide = { value: 0 };
  
    // Append arrows with functionality
    slider.appendChild(this.createArrowLeft());
    slider.appendChild(this.createArrowRight());
  
    // Add slider to section
    section.appendChild(slider);
  
    return section;
  }


  // Method for arrow left
  private createArrowLeft(): HTMLElement {
    const arrowLeft = document.createElement("a");
    arrowLeft.classList.add("arrow-left");
    arrowLeft.href = "#";

    const arrowLeftImg = document.createElement("img");
    arrowLeftImg.src = "img/arrow.svg";
    arrowLeftImg.alt = "arrow-left";

    arrowLeft.appendChild(arrowLeftImg);
    arrowLeft.setAttribute("aria-label", "Move left");

    // Add event listener for the left arrow
    arrowLeft.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.currentSlide > 0) {
        this.currentSlide--;
        this.slidsWrapper.style.marginLeft = `${this.currentSlide * -100}%`;
      }
    });

    return arrowLeft;
  }

  // Method for arrow right
  private createArrowRight(): HTMLElement {
    const arrowRight = document.createElement("a");
    arrowRight.classList.add("arrow-right");
    arrowRight.href = "#";

    const arrowRightImg = document.createElement("img");
    arrowRightImg.src = "img/arrow.svg";
    arrowRightImg.alt = "arrow-right";

    arrowRight.appendChild(arrowRightImg);
    arrowRight.setAttribute("aria-label", "Move right");

    // Add event listener for the right arrow
    arrowRight.addEventListener("click", (e) => {
      e.preventDefault();
      if (this.currentSlide < this.maxSlideIndex) {
        this.currentSlide++;
        this.slidsWrapper.style.marginLeft = `${this.currentSlide * -100}%`;
      }
    });

    return arrowRight;
  }
}