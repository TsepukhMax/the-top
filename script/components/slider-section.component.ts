import { IComponent } from "../interfaces/i-component";
import { IMovieData } from "../interfaces/i-movie-data";
import { SlideMovieComponent } from "./slide-movie.component";

export class SliderSectionComponent implements IComponent {
  constructor(private movieDataList: IMovieData[]) {}

  public render(): HTMLElement {
    // Create section
    const section = document.createElement("section");
    section.classList.add("slider-section");
  
    const slider = document.createElement("div");
    slider.classList.add("slider");
  
    const slidsWrapper = document.createElement("div");
    slidsWrapper.classList.add("slids-wrapper");
  
    // Create slide using movieDataList
    this.movieDataList.forEach((movieData) => {
      const slideMovieComponent = new SlideMovieComponent(movieData);
      slidsWrapper.appendChild(slideMovieComponent.render());
    });
  
    slider.appendChild(slidsWrapper);
  
    // Calculate the number of slides
    const maxSlideIndex = this.movieDataList.length - 1;
  
    // Current slide state (mutable object)
    const currentSlide = { value: 0 };
  
    // Append arrows with functionality
    slider.appendChild(this.createArrowLeft(slidsWrapper, currentSlide));
    slider.appendChild(this.createArrowRight(slidsWrapper, maxSlideIndex, currentSlide));
  
    // Add slider to section
    section.appendChild(slider);
  
    return section;
  }


  // Method for arrow left
  private createArrowLeft(slidsWrapper: HTMLElement, currentSlide: { value: number }): HTMLElement {
    const arrowLeft = document.createElement("a");
    arrowLeft.classList.add("arrow-left");
    arrowLeft.href = "#";

    const arrowLeftImg = document.createElement("img");
    arrowLeftImg.src = "img/arrow.svg";
    arrowLeftImg.alt = "arrow-left";

    arrowLeft.appendChild(arrowLeftImg);

    // Add event listener for the left arrow
    arrowLeft.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentSlide.value > 0) {
        currentSlide.value--;
        slidsWrapper.style.marginLeft = `${currentSlide.value * -100}%`;
      }
    });

    return arrowLeft;
  }

  // Method for arrow right
  private createArrowRight(slidsWrapper: HTMLElement, maxSlideIndex: number, currentSlide: { value: number }): HTMLElement {
    const arrowRight = document.createElement("a");
    arrowRight.classList.add("arrow-right");
    arrowRight.href = "#";

    const arrowRightImg = document.createElement("img");
    arrowRightImg.src = "img/arrow.svg";
    arrowRightImg.alt = "arrow-right";

    arrowRight.appendChild(arrowRightImg);

    // Add event listener for the right arrow
    arrowRight.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentSlide.value < maxSlideIndex) {
        currentSlide.value++;
        slidsWrapper.style.marginLeft = `${currentSlide.value * -100}%`;
      }
    });

    return arrowRight;
  }
}