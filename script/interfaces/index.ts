export interface IComponent {
  render(): HTMLElement;
}

export interface IMovieData {
  id: number;
  title: string;
  rating: number;
  description: string;
  imageUrls: string[];
  coverImageUrl: string;
  videoUrl: string;
}

export interface IMovieAudioData {
  id: number;
  audioUrl: string;
}

export interface ISocialLink {
  iconSrc: string;
  alt: string;
}

export enum Services {
  DataService = "dataService",
  SlidesService = "slidesService",
}
