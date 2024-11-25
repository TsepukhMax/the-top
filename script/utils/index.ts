// generat id for movie
export const generateSectionId = (id: number): string => {
  return `movie-${id}`;
};

// for format rating
export const formatRating = (rating: number): string => {
  return `.${rating.toString().padStart(2, '0')}`;
}