// IMovieData (імітація серверу)
export interface IMovieData {
  id: number;
  title: string;
  rating: number;
  description: string;
  imageUrls: string[];
  coverImageUrl: string;
  videoUrl: string;
  audioUrl: string;
}