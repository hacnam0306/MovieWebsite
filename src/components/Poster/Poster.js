import styles from "./Poster.module.scss";
import { FiPlay } from "react-icons/fi";
import { Recommend } from "./../Recommend/Recommend";
import { AiOutlineStar, AiFillStar, AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { renderGenre, renderVotingStar } from "../../apiConfig/apiConfig";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { memo } from "react";

const Poster = () => {
  const { tvId } = useParams();
  const { tvSeries, genres, currentItemListImage } = useSelector(
    (state) => state.MovieReducer,
  );
  const currentTvSeri = tvSeries.filter((item) => item.id == tvId);
  const [render, setRender] = useState(false);
  useEffect(() => {
    if (tvId && tvSeries && genres && currentItemListImage && currentTvSeri) {
      setRender(true);
    }
  }, [tvSeries, genres, currentItemListImage, tvId]);
  const navigate = useNavigate();

  const renderStars = (star) => {
    let array = [];
    for (let i = 0; i < 5; i++) {
      if (i < renderVotingStar(star)) {
        array.push(1);
      } else {
        array.push(0);
      }
    }
    return array;
  };
  return (
    <div>
      {render ? (
        <div className={styles.poster}>
          <img
            alt='test'
            className={styles.thumbnail}
            src={
              currentItemListImage[
                Math.floor(Math.random() * currentItemListImage?.length)
              ]?.file_path
                ? `https://image.tmdb.org/t/p/original` +
                  currentItemListImage[
                    Math.floor(Math.random() * currentItemListImage.length)
                  ]?.file_path
                : `https://image.tmdb.org/t/p/original` +
                  currentTvSeri[0]?.backdrop_path
            }
          />
          <div className={styles.title}>
            <h1>{currentTvSeri[0]?.name}</h1>
            <span>
              {renderStars(currentTvSeri[0]?.vote_average).map((item) => {
                if (item === 1) {
                  return <AiFillStar size='34' color='#F6B803' />;
                } else {
                  return <AiOutlineStar size='34' color='#F6B803' />;
                }
              })}
            </span>
            <div className={styles.genres}>
              {renderGenre(currentTvSeri[0]?.genre_ids, genres).map(
                (item, index) => (
                  <h2 key={index} className={styles.genre_item}>
                    {item[0]?.name}
                  </h2>
                ),
              )}
            </div>
            <div>
              <button onClick={() => navigate(`/TvSeries/${tvId}`)}>
                {" "}
                <FiPlay className='mx-2' />
              </button>
              <button>
                {" "}
                <AiOutlinePlus className='mx-2' />
              </button>
            </div>
            <p className='text-muted mt-5'>{currentTvSeri[0]?.overview}</p>
          </div>
          <Recommend />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default memo(Poster);
