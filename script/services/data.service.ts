import { IMovieAudioData, IMovieData } from "../interfaces";

export class DataService {
  private movieData: Promise<IMovieData[]>;

  public getMovieDataInternal(): Promise<IMovieData[]> {
    return fetch('movies-top')
      .then((response) => response.json() as Promise<IMovieData[]>) // parse the JSON response
      .then((movieData) => {
        movieData.sort((a, b) => b.rating - a.rating); // Sort by rating
        return movieData; // return sort data
      });
    }

  // public method for accessing data
  public getMovieData(): Promise<IMovieData[]> {
    if (!this.movieData) {
      this.movieData = this.getMovieDataInternal(); // use the internal method
    }
    return this.movieData;
  }

  public getMovieAudioData(movieId: number): Promise<IMovieAudioData> {
    return fetch(`movies-top/${movieId}/audio`)
      .then((response) => response.json() as Promise<IMovieAudioData>); // parse the JSON response and return the data
  }
}