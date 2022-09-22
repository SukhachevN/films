import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API_KEY } from '../../../utils/constants';
import { IFilm } from '../../../utils/interfaces';
import { getResponse } from '../../../utils/utils';

export interface FilmState {
  film: IFilm | null;
  isLoading: boolean;
  error: string | null;
  videoKey: string | null;
}

const initialState: FilmState = {
  film: null,
  isLoading: false,
  error: null,
  videoKey: null,
};

interface IFilmLink {
  offical: boolean;
  site: string;
  type: 'Teaser' | 'Clip' | 'Featurette';
}

interface IFilmVideos {
  id: number;
  results: IFilmLink[];
}

export const fetchFilm = createAsyncThunk(
  'fetchFilm',
  async (id: string) =>
    await getResponse(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    )
);

export const fetchFilmVideos = createAsyncThunk(
  'fetchFilmVideos',
  async (id: string) =>
    await getResponse(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
    )
);

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFilm.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFilm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.film = action.payload;
    });

    builder.addCase(fetchFilm.rejected, (state, action) => {
      state.isLoading = false;
      state.film = null;
      state.error = action.error.message as string;
    });

    builder.addCase(fetchFilmVideos.pending, (state) => {
      state.videoKey = null;
    });

    builder.addCase(fetchFilmVideos.fulfilled, (state, action) => {
      console.log(action.payload);
    });

    builder.addCase(fetchFilmVideos.rejected, (state) => {
      state.videoKey = null;
    });
  },
});

export const { reducer: filmReducer } = filmSlice;
