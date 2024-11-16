import { IMovieData } from "./interfaces/i-movie-data";

export const movieDataList: IMovieData[] = [
  {
    id: 17,
    title: "The Lord of the Rings",
    rating: 1,
    description: "Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music all his own.",
    imageUrls: ["img/the-lord-of-the-rings.jpg"],
    coverImageUrl: "",
    videoUrl: "",
    audioUrl: "audios/the-lord-of-the-rings.ogg",
  },
  {
    id: 16,
    title: "The Godfather",
    rating: 2,
    description: "The Godfather is one of cinema's best works. There are so many pieces in that movie that just work, and the soundtrack is part of it. Because the movie deals with crime, gangs, and the works, the music is designed to reflect that.",
    imageUrls: ["img/the-godfather1.png", "img/the-godfather2.png"],
    coverImageUrl: "img/slider-the-godfather.jpg",
    videoUrl: "videos/the-godfather.mp4",
    audioUrl: "audios/the-godfather.ogg",
  },
  {
    id: 15,
    title: "2001: A SPACE ODYSSEY",
    rating: 3,
    description: "The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes and motifs to narrow down a tone that makes the movie feel all its own.",
    imageUrls: ["img/space-odyssey.jpg"],
    coverImageUrl: "img/slider-space-odyssey.png",
    videoUrl: "videos/2001-a-space-odyssey.mp4",
    audioUrl: "audios/2001-a-space-odyssey.ogg",
  },
  {
    id: 14,
    title: "O BROTHER, WHERE ART THOU?",
    rating: 4,
    description: "O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a group of convicts who go on a wild journey to find a treasure of sorts. With this film based in a stylistic period in history, the soundtrack was designed to match it.",
    imageUrls: ["img/o-brother.jpg"],
    coverImageUrl: "img/slider-o-brother.png",
    videoUrl: "videos/o-brother-where-art-thou.mp4",
    audioUrl: "audios/o-brother-where-art-thou.ogg",
  },
];