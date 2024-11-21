import { movieAudioDataList, movieDataList } from "../data";
import { IMovieAudioData, IMovieData } from "../interfaces";

export class DataService {
  private movieData: IMovieData[];

  public getMovieData(): IMovieData[] {
    if (!this.movieData) {
      this.movieData = movieDataList.sort((a, b) => b.rating - a.rating);
    }

    return this.movieData;
  }

  public getMovieAudioData(movieId: number): IMovieAudioData {
    return movieAudioDataList.find((audioData) => audioData.id === movieId);
  }
};
