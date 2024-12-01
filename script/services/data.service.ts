import { IMovieAudioData, IMovieData } from "../interfaces";

export class DataService {
  private movieData: IMovieData[];

  public getMovieData(cb: (movieData: IMovieData[]) => void): void {
    if (!this.movieData) {

      const xhr = new XMLHttpRequest();
 
      xhr.open ('GET', 'http://localhost:8080/movies-top');
      xhr.send();

      xhr.addEventListener('load' , () => {
        const movieData = JSON.parse(xhr.response);
        this.movieData = movieData.sort((a, b) => b.rating - a.rating);
        cb(this.movieData);
      });
    }
  }

  public getMovieAudioData(movieId: number, cb: (audioData: IMovieAudioData) => void): void {
    const xhr = new XMLHttpRequest();
  
    xhr.open('GET', `http://localhost:8080/movies-top/${movieId}/audio`);
    xhr.send();
  
    xhr.addEventListener('load', () => {
      const audioData: IMovieAudioData = JSON.parse(xhr.response);
      cb(audioData);
    });
  }
};