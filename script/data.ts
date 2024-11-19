import { IMovieAudioData, IMovieData } from "./interfaces";

const unsortedMovieDataList: IMovieData[] = [
  {
    id: 29,
    title: "JURASSIC PARK",
    rating: 9,
    description: "John Williams did a lot of music for many popular franchises. After his work on Star Wars, he would later do the score  for Jurassic Park. This dinosaur film was full of epic shots and tense moments that were further brought to life by Williams' music.",
    imageUrls: ["img/jurassic-park.jpg"],
    coverImageUrl: "img/slider-jurassic-park.png",
    videoUrl: "videos/jurassic-park.mp4",
    audioUrl: "audios/jurassic-park.ogg",
  },
  {
    id: 72,
    title: "2001: A SPACE ODYSSEY",
    rating: 3,
    description: "The movie tries very hard to sell the idea of what space exploration would be like, and its themes of isolation and sophistication are further enhanced by its soundtrack. 2001: A Space Odyssey makes use of classical themes and motifs to narrow down a tone that makes the movie feel all its own.",
    imageUrls: ["img/space-odyssey.jpg"],
    coverImageUrl: "img/slider-space-odyssey.png",
    videoUrl: "videos/2001-a-space-odyssey.mp4",
    audioUrl: "audios/2001-a-space-odyssey.ogg",
  },
  {
    id: 70,
    title: "O BROTHER, WHERE ART THOU?",
    rating: 4,
    description: "O Brother, Where Art Thou? is a movie that fires on all cylinders. It takes place in the Great Depression and involves a group of convicts who go on a wild journey to find a treasure of sorts. With this film based in a stylistic period in history, the soundtrack was designed to match it.",
    imageUrls: ["img/o-brother.jpg"],
    coverImageUrl: "img/slider-o-brother.png",
    videoUrl: "videos/o-brother-where-art-thou.mp4",
    audioUrl: "audios/o-brother-where-art-thou.ogg",
  },
  {
    id: 74,
    title: "The Godfather",
    rating: 2,
    description: "The Godfather is one of cinema's best works. There are so many pieces in that movie that just work, and the soundtrack is part of it. Because the movie deals with crime, gangs, and the works, the music is designed to reflect that.",
    imageUrls: ["img/the-godfather1.png", "img/the-godfather2.png"],
    coverImageUrl: "img/slider-the-godfather.jpg",
    videoUrl: "videos/the-godfather.mp4",
    audioUrl: "audios/the-godfather.ogg",
  },
  {
    id: 76,
    title: "The Lord of the Rings",
    rating: 1,
    description: "Everything about the soundtrack in The Lord of the Rings is excellent, which is one of the many reasons that the trilogy remains one of the most beloved in cinema history. Where Peter Jackson had a frame of reference with Tolkien's detailed descriptions, Howard Shore had to match those visuals with music all his own.",
    imageUrls: ["img/the-lord-of-the-rings.jpg"],
    coverImageUrl: "",
    videoUrl: "",
    audioUrl: "audios/the-lord-of-the-rings.ogg",
  },
  {
    id: 98,
    title: "GOODFELLAS",
    rating: 6,
    description: "Martin Scorcese's movie Goodfellas remains one of his best to date. The movie deals with gangs, drugs, and everything else  in between. It's a crime movie that isn't afraid to deal with the dark side of life. Going along with every scene is a great soundtrack full of hand-picked songs that compliment every moment they appear in.",
    imageUrls: ["img/goodfellas.jpg"],
    coverImageUrl: "img/slider-goodfellas.png",
    videoUrl: "videos/goodfellas.mp4",
    audioUrl: "audios/goodfellas.ogg",
  },
  {
    id: 47,
    title: "STAR WARS: A NEW HOPE",
    rating: 8,
    description: "When Star Wars: A New Hope was released, it introduced many iconic themes that people would recognize decades after. That was thanks to John Williams, who put together the iconic fanfare, the Imperial March, and so many more great tracks.",
    imageUrls: ["img/starwars.png", "img/starwars_skywalker.png"],
    coverImageUrl: "img/slider-starwars.png",
    videoUrl: "videos/star-wars-a-new-hope.mp4",
    audioUrl: "audios/star-wars-a-new-hope.ogg",
  },
  {
    id: 23,
    title: "BLADE RUNNER",
    rating: 5,
    description: "It's astounding that Blade Runner didn't become as popular as other movies released in its time. It arguably has one of the best soundtracks in movie history, with every tune being a perfect match with the action on-screen.",
    imageUrls: ["img/blade-runner-1.png", "img/blade-runner-2.png"],
    coverImageUrl: "img/slider-blade-runner.png",
    videoUrl: "videos/blade-runner.mp4",
    audioUrl: "audios/blade-runner.ogg",
  },
  {
    id: 85,
    title: "GUARDIANS OF THE GALAXY VOL. 2",
    rating: 10,
    description: "While the Awesome Mix Vol. 1 in Guardians of the Galaxy was resonant with a lot of people, it was the soundtrack in Guardians of the Galaxy Vol. 2 that improved  on the formula. The first film featured songs that were fun and upbeat but didn't have much to do with the film's story.",
    imageUrls: ["img/guardians-of-the-galaxy.jpg"],
    coverImageUrl: "img/slider-guardians-of-the-galaxy.png",
    videoUrl: "videos/guardinas-of-the-galaxy-vol-2.mp4",
    audioUrl: "audios/guardinas-of-the-galaxy-vol-2.ogg",
  },
  {
    id: 65,
    title: "BABY DRIVER",
    rating: 7,
    description: "Baby Driver's soundtrack is similar to Guardians  of the Galaxy in many ways. It uses a lot of older songs to provide a backdrop to the film's many beats. However, what Edgar Wright did with the music was so far beyond that.",
    imageUrls: ["img/baby-driver.jpg"],
    coverImageUrl: "img/slider-baby-driver.png",
    videoUrl: "videos/baby-driver.mp4",
    audioUrl: "audios/baby-driver.ogg",
  },
];

export const movieAudioDataList: IMovieAudioData[] = [
  {
    id: 29,
    audioUrl: "audios/jurassic-park.ogg",
  },
  {
    id: 72,
    audioUrl: "audios/2001-a-space-odyssey.ogg",
  },
  {
    id: 70,
    audioUrl: "audios/o-brother-where-art-thou.ogg",
  },
  {
    id: 74,
    audioUrl: "audios/the-godfather.ogg",
  },
  {
    id: 76,
    audioUrl: "audios/the-lord-of-the-rings.ogg",
  },
  {
    id: 98,
    audioUrl: "audios/goodfellas.ogg",
  },
  {
    id: 47,
    audioUrl: "audios/star-wars-a-new-hope.ogg",
  },
  {
    id: 23,
    audioUrl: "audios/blade-runner.ogg",
  },
  {
    id: 85,
    audioUrl: "audios/guardinas-of-the-galaxy-vol-2.ogg",
  },
  {
    id: 65,
    audioUrl: "audios/baby-driver.ogg",
  },
];

// We sort the data by rating in order
export const movieDataList: IMovieData[] = unsortedMovieDataList.sort((a, b) => b.rating - a.rating);