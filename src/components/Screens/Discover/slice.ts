import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFilm } from '../../../utils/interfaces';
import { getResponse } from '../../../utils/utils';
import { API_KEY } from '../../../utils/constants';
import { RootState } from '../../../App/store';

interface IDiscoverState {
  isLoading: boolean;
  error: string | null;
  films: IFilm[];
  page: number;
  lastSearch: string | undefined;
  endOfData: boolean;
}

const initialState: IDiscoverState = {
  isLoading: false,
  error: null,
  films: [],
  page: 1,
  lastSearch: undefined,
  endOfData: false,
};

export const fetchSearchFilms = createAsyncThunk(
  'fetchSearchFilms',
  async (filmName: string | undefined, { getState }) => {
    const {
      discover: { lastSearch, page },
    } = getState() as RootState;
    const currentPage = lastSearch === filmName ? page : 1;
    const searchType = filmName ? 'search' : 'discover';
    const endPoint = filmName ? 'query=' + filmName : 'sort_by=popularity.desc';

    return await getResponse(
      `https://api.themoviedb.org/3/${searchType}/movie?api_key=${API_KEY}&${endPoint}&page=${currentPage}`
    );
  }
);

export const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearchFilms.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(fetchSearchFilms.fulfilled, (state, action) => {
      const { page, totalPages, results } = action.payload;
      const { arg } = action.meta;

      if (page < totalPages) {
        state.page = page + 1;
      } else {
        state.endOfData = true;
      }

      if (arg !== state.lastSearch) {
        state.lastSearch = arg;
        state.films = results;
        state.page = 2;
      } else {
        state.films.push(...results);
      }

      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(fetchSearchFilms.rejected, (state, action) => {
      state.isLoading = false;
      state.films = [];
      state.page = 1;
      state.error = action.error.message as string;
    });
  },
});

export const { reducer: discoverReducer } = discoverSlice;
