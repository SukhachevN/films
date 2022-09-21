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

export type ShorFilmInfo = Pick<
  IFilm,
  'id' | 'title' | 'overview' | 'posterPath' | 'voteAverage'
>;

export interface IActionButton extends ShorFilmInfo {
  isActive: boolean;
  isFilmScreen?: boolean;
}

export type StoredFilms = Record<number, ShorFilmInfo>;

export interface StoredFilmsState {
  films: StoredFilms;
}
