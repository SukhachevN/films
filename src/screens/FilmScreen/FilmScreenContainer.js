import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FilmScreenView } from "./FilmScreenView";
import { NotFoundScreen } from "../NotFoundScreen";
import { fetchFilmInfo, fetchFilmVideo, useGlobalState } from "../../redux";

function FilmScreenContainer() {
  const { filmId } = useParams();
  const data = useGlobalState();
  const dispatch = useDispatch();
  const inFavourite = data?.favourite.idList.includes(data.filmInfo.info?.id);
  const inWatchLater = data?.watchLater.idList.includes(data.filmInfo.info?.id);

  useEffect(() => {
    dispatch(fetchFilmInfo(filmId));
    dispatch(fetchFilmVideo(filmId));
  }, [dispatch, filmId]);

  if (data.filmInfo.error) {
    return (
      <div className="ErrorBlockFilmScreen">
        <p className="ErrorMessage ErrorMessageFilmScreen">
          {data.filmInfo.error ? data.filmInfo.error.status_message : null}
        </p>
        <NotFoundScreen />
      </div>
    );
  }
  if (data.filmInfo.info === null || data.filmVideo?.video === null) {
    return <FilmScreenView />;
  }
  return (
    <FilmScreenView
      data={data}
      inFavourite={inFavourite}
      inWatchLater={inWatchLater}
      dispatch={dispatch}
    />
  );
}

export { FilmScreenContainer };
