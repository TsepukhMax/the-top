// data/data.ts
import { IMovieData } from "../interfaces/i-movie-data";;

export const movieData01: IMovieData = {
  id: Math.floor(Math.random() * 100), //random number
  title: "The Lord of the Rings",
  rating: null,
  description: "Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music all his own.",
  imageUrls: [],
  coverImageUrl: "",
  videoUrl: "",
  audioUrl: ""
};