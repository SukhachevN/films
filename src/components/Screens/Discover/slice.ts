import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFilm } from '../../../utils/interfaces';
import { getResponse } from '../../../utils/utils';
import { API_KEY } from '../../../utils/constants';
import { RootState } from '../../../App/store';

export interface DiscoverState {
  isLoading: boolean;
  error: string | null;
  films: IFilm[];
  page: number;
  lastSearch: string | undefined;
}

const initialState: DiscoverState = {
  isLoading: false,
  error: null,
  films: [],
  page: 1,
  lastSearch: undefined,
};

export const fetchSearchFilms = createAsyncThunk(
  'fetchSearchFilms',
  async (filmName: string | undefined, { getState }) => {
    const {
      discover: { lastSearch, page },
    } = getState() as RootState;
    console.log(page);
    const currentPage = lastSearch === filmName ? page : 1;
    const searchType = filmName ? 'search' : 'discover';
    const endPoint = filmName ? 'query=' + filmName : 'sort_by=popularity.desc';

    return await getResponse(
      `https://api.themoviedb.org/3/${searchType}/movie?api_key=${API_KEY}&${endPoint}}&page=${currentPage}`
    );
  }
);

export const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchFilms.pending, (state, action) => {
      const { arg } = action.meta;
      state.isLoading = true;
      if (arg !== state.lastSearch) {
        state.lastSearch = arg;
        state.films = [];
      }
    });

    builder.addCase(fetchSearchFilms.fulfilled, (state, action) => {
      const { page, totalPages, results } = action.payload;
      state.films.push(...results);
      state.error = null;
      state.isLoading = false;

      if (page < totalPages) state.page = page + 1;
    });

    builder.addCase(fetchSearchFilms.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { reducer: discoverReducer } = discoverSlice;
