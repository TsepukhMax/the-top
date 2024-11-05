import { IComponent } from '../interfaces/i-component';
import { PlayButtonComponent } from './play-button.component';
import { DisplayTimeComponent } from './display-time.component';
import { VolumeBarComponent } from './volume-bar.component';
import { ProgressBarComponent } from './progress-bar.component';

//PopupComponent
export class PopupComponent implements IComponent {
  private audioElement: HTMLAudioElement;
  private playButton: PlayButtonComponent;
  private displayTime: DisplayTimeComponent;
  private progressBar: ProgressBarComponent;
  private popupElement: HTMLElement;
  private closeButton: HTMLElement;
  private progressAnimationFrame: number;
  private titleText: string;
  private topText: string;
  private audioSource: string;


  constructor(titleText: string, topText: string, audioSource: string) {
    this.titleText = titleText;
    this.topText = topText;
    this.audioSource = audioSource;
  }

  public render(): HTMLElement {
    // Main container for popup
    this.popupElement = document.createElement('div');
    this.popupElement.classList.add('popup');

    // Content area
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-content');
    this.popupElement.appendChild(popupContent);

    // Close button
    this.closeButton = document.createElement('button');
    this.closeButton.classList.add('popup-close');
    this.closeButton.innerHTML = '&#x2715;';
    popupContent.appendChild(this.closeButton);

    // Title container
    const titleContainer = document.createElement('div');
    titleContainer.classList.add('popup-title');
    popupContent.appendChild(titleContainer);

    // Optional top text
    const topTextSpan = document.createElement('span');
    topTextSpan.textContent = this.topText;
    titleContainer.appendChild(topTextSpan);

    // Title
    const title = document.createElement('h2');
    title.textContent = this.titleText;
    titleContainer.appendChild(title);

    // Container for audio
    const popupAudio = document.createElement('div');
    popupAudio.classList.add('popup-audio');
    popupContent.appendChild(popupAudio);

    // Create audio element
    this.audioElement = document.createElement('audio');
    this.audioElement.classList.add('popup-audio-files');
    this.audioElement.setAttribute('src', this.audioSource);
    popupAudio.appendChild(this.audioElement);

    // Add "Play" button
    this.playButton = new PlayButtonComponent((playing: boolean) => {
      if (playing) {
        this.audioElement.play(); // 'Play' audio if playing
      } else {
        this.audioElement.pause(); // 'Stop' audio if not playing
      }
    });
    popupAudio.appendChild(this.playButton.render());

    this.displayTime = new DisplayTimeComponent(this.audioElement);
    popupAudio.appendChild(this.displayTime.render());

    const volumeBar = new VolumeBarComponent(this.audioElement);
    popupAudio.appendChild(volumeBar.render());

    this.progressBar = new ProgressBarComponent(this.audioElement, () => {
      this.displayTime.updateDisplayTime();
    });
    popupAudio.appendChild(this.progressBar.render());

    // use methods for audio and close
    this.setupAudioEvents();
    this.setupCloseEvents();

    return this.popupElement;
  }

  // Method for audio events
  private setupAudioEvents(): void {
    // preparation for the start
    this.audioElement.addEventListener('loadedmetadata', () => {
      this.displayTime.updateDisplayTime();
      this.progressBar.updateProgressBar();
    });

    this.audioElement.addEventListener('play', () => {
      this.updateProgressWithAnimationFrame(); // start progress updates
    });

    this.audioElement.addEventListener('pause', () => {
      cancelAnimationFrame(this.progressAnimationFrame); // stop progress updates
    });

    this.audioElement.addEventListener('ended', () => {
      this.audioElement.currentTime = 0;
      this.displayTime.updateDisplayTime();
      this.progressBar.updateProgressBar(); // reset
      this.playButton.reset(); // reset
    });
  }

  // Method for close
  private setupCloseEvents(): void {
    this.closeButton.addEventListener('click', () => this.close());
    this.popupElement.addEventListener('click', (e: MouseEvent) => {
      if (e.target === this.popupElement) {
        this.close();
      }
    });
  }
  
  // Method for updating progress with animation frame
  private updateProgressWithAnimationFrame(): void {
    this.progressBar.updateProgressBar();
    this.displayTime.updateDisplayTime();

    this.progressAnimationFrame = requestAnimationFrame(() => {
      this.updateProgressWithAnimationFrame();
    });
  }

  // Method for closing popup
  private close(): void {
      document.body.removeChild(this.popupElement);
      document.body.classList.remove('body-wrapper');
  }
}