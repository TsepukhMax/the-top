import { IComponent } from '../interfaces';

//DisplayTimeComponent
export class DisplayTimeComponent implements IComponent {
  private mediaElement: HTMLMediaElement;
  private currentTimeEl: HTMLElement;
  private totalTimeEl: HTMLElement;

  constructor(mediaElement: HTMLMediaElement) {
    this.mediaElement = mediaElement;
  }

  public render(): HTMLElement {

    // create HTML-elements for DisplayTimeComponent
    this.currentTimeEl = document.createElement('span');
    this.currentTimeEl.classList.add('current-time');
    this.currentTimeEl.textContent = '00:00';

    this.totalTimeEl = document.createElement('span');
    this.totalTimeEl.classList.add('total-time');
    this.totalTimeEl.textContent = '00:00';

    // create container
    const container = document.createElement('div');
    container.classList.add('display-time');
    container.appendChild(this.currentTimeEl);
    container.appendChild(document.createTextNode(' / '));
    container.appendChild(this.totalTimeEl);

    // return container
    return container;
  }

  public updateDisplayTime(): void {
    this.currentTimeEl.textContent = this.formatTime(this.mediaElement.currentTime);
    this.totalTimeEl.textContent = this.formatTime(this.mediaElement.duration || 0);
  }

  // private method for updateDisplayTime
  private formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${minutes}:${sec < 10 ? '0' : ''}${sec}`;
  }
}