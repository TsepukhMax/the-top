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
  private volumeBar: VolumeBarComponent;
  private progressBar: ProgressBarComponent;

  constructor(private movieData: IMovieData) {}

  public render(): HTMLElement {
    this.slide = document.createElement("div");
    this.slide.classList.add("slid");

    // Create and append image
    const img = document.createElement("img");
    img.src = this.movieData.imageUrls[0];
    img.alt = this.movieData.title;
    this.slide.appendChild(img);

    // Create and append video
    const video = this.createVideo();
    this.slide.appendChild(video);

    // Create and append play button
    this.playButton = new PlayButtonComponent((playing: boolean) => {
      this.handlePlayButtonClick(playing, video);
    });
    this.slide.appendChild(this.playButton.render());

    // Create and append others components
    this.progressBar = new ProgressBarComponent(video, () => {
      this.displayTime.updateDisplayTime();
    });
    this.slide.appendChild(this.progressBar.render());

    this.volumeBar = new VolumeBarComponent(video);
    this.slide.appendChild(this.volumeBar.render());

    this.displayTime = new DisplayTimeComponent(video);
    this.slide.appendChild(this.displayTime.render());

    // Setup video events
    this.setupVideoEvents(video);

    return this.slide;
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

  private handlePlayButtonClick(playing: boolean, video: HTMLVideoElement): void {
    // Stop other videos before playing this one
    document.querySelectorAll(".slid").forEach((otherSlide) => {
      const otherVideo = otherSlide.querySelector<HTMLVideoElement>(".slid-video");
      const otherPlayButton = otherSlide.querySelector<HTMLElement>(".button-play");

      if (otherVideo && otherVideo !== video) {
        otherVideo.pause();
        otherSlide.classList.remove("playing");
        otherPlayButton?.classList.remove("button-stop");
      }
    });

    // Play or pause the current video
    if (playing) {
      video.play();
      this.slide.classList.add("playing");
      this.updateProgressWithAnimationFrame(video);
    } else {
      video.pause();
      this.slide.classList.remove("playing");
      if (this.progressAnimationFrame) {
        cancelAnimationFrame(this.progressAnimationFrame);
      }
    }
  }

  private setupVideoEvents(video: HTMLVideoElement): void {
    video.addEventListener("loadedmetadata", () => {
      this.displayTime.updateDisplayTime();
      this.progressBar.updateProgressBar();
    });

    video.addEventListener("play", () => {
      this.updateProgressWithAnimationFrame(video);
    });

    video.addEventListener("pause", () => {
      cancelAnimationFrame(this.progressAnimationFrame);
    });

    video.addEventListener("ended", () => {
      video.currentTime = 0;
      this.displayTime.updateDisplayTime();
      this.progressBar.updateProgressBar();
      this.playButton.reset();
      this.slide.classList.remove('playing');
    });
  }

  private updateProgressWithAnimationFrame(video: HTMLVideoElement): void {
    this.progressBar.updateProgressBar();
    this.displayTime.updateDisplayTime();

    this.progressAnimationFrame = requestAnimationFrame(() => {
      this.updateProgressWithAnimationFrame(video);
    });
  }
}