import { IComponent, IMovieData, Services } from '../interfaces';
import { PlayButtonComponent } from './play-button.component';
import { DisplayTimeComponent } from './display-time.component';
import { VolumeBarComponent } from './volume-bar.component';
import { ProgressBarComponent } from './progress-bar.component';
import { ServiceContainer } from "../services/service-container";
import { SlidesService } from "../services/slides.service";

export class SlideMovieComponent implements IComponent {
  private progressAnimationFrame: number;
  private slide: HTMLElement;
  private playButton: PlayButtonComponent;
  private displayTime: DisplayTimeComponent;
  private progressBar: ProgressBarComponent;
  private video: HTMLVideoElement;
  private slidesService: SlidesService;

  constructor(private movieData: IMovieData) {
    // Інжектимо SlidesService через enum
    this.slidesService = ServiceContainer.inject<SlidesService>(Services.SlidesService);
  }

  public render(): HTMLElement {
    this.slide = document.createElement("div");
    this.slide.classList.add("slid");

    // Create and append image
    const img = document.createElement("img");
    img.src = this.movieData.coverImageUrl;
    img.alt = this.movieData.title;
    this.slide.appendChild(img);

    // Set up the video element
    this.video = this.createVideo();
    this.slide.appendChild(this.video);

    // Create and append play button
    this.playButton = new PlayButtonComponent((playing: boolean) => {
      this.handlePlayButtonClick(playing);
    });
    this.slide.appendChild(this.playButton.render());

    // Create and append other components
    this.progressBar = new ProgressBarComponent(this.video, () => {
      this.displayTime.updateDisplayTime();
    });
    this.slide.appendChild(this.progressBar.render());

    const volumeBar = new VolumeBarComponent(this.video);
    this.slide.appendChild(volumeBar.render());

    this.displayTime = new DisplayTimeComponent(this.video);
    this.slide.appendChild(this.displayTime.render());

    // Setup video events
    this.setupVideoEvents();

    // add slide in slidesService
    this.slidesService.add(this.movieData.id, this);

    return this.slide;
  }

  public reset(): void {
    this.video.pause();
    this.slide.classList.remove("playing");
    this.playButton.reset();
  }

  private createVideo(): HTMLVideoElement {
    const video = document.createElement("video");
    video.classList.add("slid-video");
    const source = document.createElement("source");
    source.src = this.movieData.videoUrl;
    source.type = "video/mp4";
    video.appendChild(source);
    return video;
  }

  private handlePlayButtonClick(playing: boolean): void {
    // Зупиняємо всі слайди, крім поточного
    this.slidesService.stop(this.movieData.id);

    // Play or pause the current video
    if (playing) {
      this.video.play();
      this.slide.classList.add("playing");
    } else {
      this.video.pause();
      this.slide.classList.remove("playing");
    }
  }

  private setupVideoEvents(): void {
    this.video.addEventListener("loadedmetadata", () => {
      this.displayTime.updateDisplayTime();
      this.progressBar.updateProgressBar();
    });

    this.video.addEventListener("play", () => {
      this.updateProgressWithAnimationFrame();
    });

    this.video.addEventListener("pause", () => {
      cancelAnimationFrame(this.progressAnimationFrame);
    });

    this.video.addEventListener("ended", () => {
      this.video.currentTime = 0;
      this.displayTime.updateDisplayTime();
      this.progressBar.updateProgressBar();
      this.playButton.reset();
      this.slide.classList.remove('playing');
    });
  }

  private updateProgressWithAnimationFrame(): void {
    this.progressBar.updateProgressBar();
    this.displayTime.updateDisplayTime();

    this.progressAnimationFrame = requestAnimationFrame(() => {
      this.updateProgressWithAnimationFrame();
    });
  }
}