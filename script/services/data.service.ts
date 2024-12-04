import { IMovieAudioData, IMovieData } from "../interfaces";

export class DataService {
  private movieData: Promise<IMovieData[]>;

  // public method for accessing data
  public getMovieData(): Promise<IMovieData[]> {
    if (!this.movieData) {
      this.movieData = this.getMovieDataInternal(); // use the internal method
    }
    return this.movieData;
  }

  public async getMovieAudioData(movieId: number): Promise<IMovieAudioData> {
    const response = await fetch(`movies-top/${movieId}/audio`);
    const audioData = await response.json() as IMovieAudioData; // parse the JSON
    return audioData; // return the data
  }

  private async getMovieDataInternal(): Promise<IMovieData[]> {
    const response = await fetch('movies-top'); // get an answer
    const movieData = await response.json() as IMovieData[]; //parse the JSON
    movieData.sort((a, b) => b.rating - a.rating); // Sort by rating
    return movieData; // return sort data
  };
}