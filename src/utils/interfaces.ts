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

export type IShorFilmInfo = Pick<
  IFilm,
  'id' | 'title' | 'overview' | 'posterPath'
>;

export interface IActionButton extends IShorFilmInfo {
  isActive: boolean;
  isFilmScreen?: boolean;
}
