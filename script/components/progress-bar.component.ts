import { IComponent } from '../interfaces';

//ProgressBarComponent
export class ProgressBarComponent implements IComponent {
  private mediaElement: HTMLMediaElement;
  private progressBarEl: HTMLElement;
  private progressBarContainer: HTMLElement;
  private cbOnProgressUpdate:() => void;

  constructor(mediaElement: HTMLMediaElement, cbOnProgressUpdate: () => void) {
    // private property for media el.
    this.mediaElement = mediaElement;
    this.cbOnProgressUpdate = cbOnProgressUpdate;
  }

  // rendering method for DOM
  public render(): HTMLElement {

    // create HTML-elements
    this.progressBarEl = document.createElement('div');
    this.progressBarEl.classList.add('progress-bar');

    this.progressBarContainer = document.createElement('div');
    this.progressBarContainer.classList.add('progress-bar-container');
    this.progressBarContainer.appendChild(this.progressBarEl);

    // click for progressBar
    this.progressBarContainer.addEventListener('click', (e: MouseEvent) => {
      this.updateProgressOnClick(e);
    });

    return this.progressBarContainer;
  }

  // method for update ProgressBarComponent
  public updateProgressBar(): void {
    const progress = (this.mediaElement.currentTime / this.mediaElement.duration) * 100;
    this.progressBarEl.style.width = `${progress}%`;
  }

  // method for update on click ProgressBarComponent
  private updateProgressOnClick(e: MouseEvent): void {
    const offsetX = e.offsetX;
    const totalWidth = this.progressBarContainer.offsetWidth;
    const clickPosition = (offsetX / totalWidth) * this.mediaElement.duration;

    // move time according to position
    this.mediaElement.currentTime = clickPosition;

    // update progressBar
    this.updateProgressBar();

    // callback to update time for display
    this.cbOnProgressUpdate();
  }
}