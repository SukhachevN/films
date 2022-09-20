export interface IFilm {
  adult: boolean;
  genreIds: number[];
  id: number;
  overview: string;
  posterPath: string | null;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
}
