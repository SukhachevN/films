import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "../../components/Spinner";
import {
  fetchDiscover,
  GET_DISCOVER,
  GET_SEARCH_FILMS,
  useGlobalState,
} from "../../redux";
import { loadApp } from "../../redux/app";
import { initializeFavourite } from "../../redux/favourite";
import { initializeWatchLater } from "../../redux/watchLater";
import { AppView } from "./AppView";

const discoverEndPoint = "&sort_by=popularity.desc";
const queryEndPoint = "&query=";

function AppContainer() {
  const data = useGlobalState();
  const { initialized } = data.app;
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target.search.value === "") {
      dispatch(fetchDiscover(discoverEndPoint, GET_DISCOVER));
    } else {
      dispatch(
        fetchDiscover(
          `${queryEndPoint}${encodeURI(event.target.search.value)}`,
          GET_SEARCH_FILMS
        )
      );
    }
  }

  useEffect(() => {
    dispatch(loadApp());
  }, []);

  useEffect(() => {
    if (initialized) {
      dispatch(initializeFavourite(data.app.favourite));
      dispatch(initializeWatchLater(data.app.watchLater));
    }
  }, [initialized]);

  useEffect(() => {
    dispatch(fetchDiscover(discoverEndPoint, GET_DISCOVER));
  }, [dispatch]);

  if (!initialized) {
    return <Spinner />;
  }

  return <AppView handleSubmit={handleSubmit} data={data.discover} />;
}

export { AppContainer };
