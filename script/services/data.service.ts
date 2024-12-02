import { IMovieAudioData, IMovieData } from "../interfaces";

export class DataService {
  private movieData: IMovieData[];
  private movieDataCallBacks: ((movieData: IMovieData[]) => void)[]

  public getMovieData(cb: (movieData: IMovieData[]) => void): void {
    if (this.movieData) {
      // 1. The data is already loaded
      cb(this.movieData);
    } else if (this.movieDataCallBacks) {
      // 2. The data is still being loaded, add a callback to the queue
      this.movieDataCallBacks.push(cb);
    } else {
      // 3. The request didn't sent, we create and send the request
      this.movieDataCallBacks = [cb];

      const xhr = new XMLHttpRequest();
      xhr.open ('GET', 'movies-top');
      xhr.send();

      xhr.addEventListener('load' , () => {
        const movieData: IMovieData[] = JSON.parse(xhr.response);
        this.movieData = movieData.sort((a, b) => b.rating - a.rating);
      
        // Call all callbacks from the queue
        if (this.movieDataCallBacks) {
          this.movieDataCallBacks.forEach(callback => callback(this.movieData!));
        }

        this.movieDataCallBacks = null; // clear the queue
      });
    }
  }

  public getMovieAudioData(movieId: number, cb: (audioData: IMovieAudioData) => void): void {
    const xhr = new XMLHttpRequest();
  
    xhr.open('GET', `movies-top/${movieId}/audio`);
    xhr.send();
  
    xhr.addEventListener('load', () => {
      const audioData: IMovieAudioData = JSON.parse(xhr.response);
      cb(audioData);
    });
  }
};