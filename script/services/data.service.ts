import { IMovieAudioData, IMovieData } from "../interfaces";

export class DataService {
  private movieData: Promise<IMovieData[]>;

  public getMovieData(): Promise<IMovieData[]> {
    if (!this.movieData) {

      this.movieData = new Promise<IMovieData[]>((res) => {
        const xhr = new XMLHttpRequest();
        xhr.open ('GET', 'movies-top');
        xhr.send();

        xhr.addEventListener('load' , () => {
          const movieData: IMovieData[] = JSON.parse(xhr.response);
          movieData.sort((a, b) => b.rating - a.rating);

          res(movieData);
        });
      });
    }
    return this.movieData;
  }

  public getMovieAudioData(movieId: number): Promise<IMovieAudioData> {
    return new Promise<IMovieAudioData>((res) => {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `movies-top/${movieId}/audio`);
      xhr.send();
  
      xhr.addEventListener('load', () => {
        const audioData: IMovieAudioData = JSON.parse(xhr.response);
        res(audioData); // Return a single object
      });
    });
  }  
};