import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../App/hooks';
import { useFilm } from '../../../utils/selectors';
import { fetchFilm, fetchFilmVideos } from './slice';

const Film = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { film, isLoading, error, videoKey } = useFilm();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilm(id));
      dispatch(fetchFilmVideos(id));
    }
  }, [id]);

  return <main>Film</main>;
};

export { Film };
