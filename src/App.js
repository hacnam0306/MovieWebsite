import "./App.scss";
import Home from "./pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import Series from "./pages/Series/Series";
import Trending from "./pages/Trending/Trending";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import TvEpisodes from "./pages/TvEpisodes/TvEpisodes";
import MovieDetail from "./pages/MovieDetail/MovieDetail";
import All from "./pages/All/All";
import { useTransition, animated } from "react-spring";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage";
function App() {
  const dispatch = useDispatch();
  const getGenresApi = async () => {
    await dispatch({
      type: "getGenresAction",
    });
  };
  const getTvSeriesApi = async () => {
    await dispatch({
      type: "getTvApiAction",
    });
  };

  const getMovieApi = async () => {
    await dispatch({
      type: "getMovieApiAction",
      rate: "popular",
    });
  };
  const getUpComingMovieApi = async () => {
    await dispatch({
      type: "getElseTypeMovieList",
      rate: "upcoming",
    });
  };
  useEffect(() => {
    getGenresApi();
    getTvSeriesApi();
    getMovieApi();
    getUpComingMovieApi();
  }, []);
  let location = useLocation();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: { opacity: 0, transform: "translate3d(100vw, 0, 0)" },
    enter: { opacity: 1, transform: "translate3d(0, 0, 0)" },
    leave: { opacity: 0, transform: "translate3d(-20vw, 0, 0)" },
  });

  return (
    <div className='App'>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Routes location={item}>
            <Route path='/home' exact element={<Home />} />
            <Route path='/series' exact element={<All />} />
            <Route path='/series/:tvId' exact element={<Series />} />
            <Route path='/movieTrending/' exact element={<Trending />} />
            <Route path='/movieTrending/:filmId' exact element={<Trending />} />
            <Route path='/movie' exact element={<All />} />
            <Route path='/tvSeries/:tvId' exact element={<TvEpisodes />} />
            <Route path='/tvSeries/' exact element={<All />} />
            <Route path='/movie/:movieId' exact element={<MovieDetail />} />
            <Route path='*' element={<Home />} />
            <Route path='/all/:genre' exact element={<All />} />
            <Route path='/' element={<Home />} />
            <Route
              path='/search/:searchInfo'
              exact
              element={<SearchResultPage />}
            />
          </Routes>
        </animated.div>
      ))}
    </div>
  );
}

export default App;
