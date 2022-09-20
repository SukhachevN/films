export interface IFilm {
  adult: boolean;
  backdropPath: string | null;
  genreIds: number[];
  id: number;
  overview: string;
  posterPath: string;
  releaseDate: string;
  title: string;
  video: boolean;
  voteAverage: number;
}
