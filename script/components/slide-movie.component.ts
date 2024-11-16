import { IComponent } from "../interfaces/i-component";
import { IMovieData } from "../interfaces/i-movie-data";
import { PlayButtonComponent } from './play-button.component';
import { DisplayTimeComponent } from './display-time.component';
import { VolumeBarComponent } from './volume-bar.component';
import { ProgressBarComponent } from './progress-bar.component';

export class SlideMovieComponent implements IComponent {
  private progressAnimationFrame: number;
  private slide: HTMLElement;
  private playButton: PlayButtonComponent;
  private displayTime: DisplayTimeComponent;
  private progressBar: ProgressBarComponent;
  private video: HTMLVideoElement;

  constructor(private movieData: IMovieData) {}

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
    // Stop other videos before playing this one
    document.querySelectorAll(".slid").forEach((otherSlide) => {
      const otherVideo = otherSlide.querySelector<HTMLVideoElement>(".slid-video");
      const otherPlayButton = otherSlide.querySelector(".button-play");

      if (otherVideo !== this.video) {
        otherVideo.pause();
        otherSlide.classList.remove("playing");
        otherPlayButton?.classList.remove("button-stop");
      }
    });

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