import { IMovieData } from "./interfaces/i-movie-data";

export const movieData01: IMovieData = {
  id: 17,
  title: "The Lord of the Rings",
  rating: 1,
  description: "Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music all his own.",
  imageUrls: ["img/the-lord-of-the-rings.jpg"],
  coverImageUrl: "",
  videoUrl: "",
  audioUrl: "audios/the-lord-of-the-rings.ogg",
};

export const movieData02: IMovieData = {
  id: 16,
  title: "The Godfather",
  rating: 2,
  description:"The Godfather is one of cinema's best works. There are so many pieces in that movie that just work, and the soundtrack is part of it. Because the movie deals with crime, gangs, and the works, the music is designed to reflect that.",
  imageUrls: ["img/the-godfather1.png", "img/the-godfather2.png"],
  coverImageUrl: "img/slider-the-godfather.jpg",
  videoUrl: "videos/the-godfather.mp4",
  audioUrl: "audios/the-godfather.ogg",
};