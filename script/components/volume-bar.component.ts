import { IComponent } from '../interfaces/i-component';

// VolumeBarComponent
export class VolumeBarComponent implements IComponent {
  private mediaElement: HTMLMediaElement;
  private volumeSliderEl: HTMLElement;
  private volumeBarContainer: HTMLElement;

  constructor(mediaElement: HTMLMediaElement) {
    this.mediaElement = mediaElement;
  };

  // rendering method for DOM
  public render(): HTMLElement {
    
    // create HTML-elements
    this.volumeSliderEl = document.createElement('div');
    this.volumeSliderEl.classList.add('volume-slider');

    this.volumeBarContainer = document.createElement('div');
    this.volumeBarContainer.classList.add('volume-bar-container');
    this.volumeBarContainer.appendChild(this.volumeSliderEl);

    // add mousedown using an anonymous function // method for install volume
    this.volumeBarContainer.addEventListener('mousedown',(e) => {
      
      // update for click
      this.setVolume(e);

      // function for mousemove
      const mouseMoveHandler = (e: MouseEvent) => {
        this.setVolume(e);
      };

      // follow mousemove
      window.addEventListener('mousemove', mouseMoveHandler);

      // unfollow on mouseup
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', mouseMoveHandler);
      }, { once: true });
    });

    return this.volumeBarContainer;
  };

  // main method for control volume
  private setVolume(e: MouseEvent): void {
    const volumeBar = this.volumeBarContainer;

    const offsetX = e.pageX - volumeBar.getBoundingClientRect().left;
    const totalWidth = volumeBar.offsetWidth;
    const newVolume = Math.min(Math.max(offsetX / totalWidth, 0), 1);

    this.mediaElement.volume = newVolume; // Update volume
    this.updateVolumeSlider(); // Update slider position
  };

  // method for updating slider position
  public updateVolumeSlider(): void {
    this.volumeSliderEl.style.width = `${this.mediaElement.volume * 100}%`; // Set the width based on volume
  };
};