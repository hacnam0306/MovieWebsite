import React from 'react'
import Header from '../../components/Header/Header'
import styles from './Trending.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { useSpring, animated } from 'react-spring'

import { GrRedo } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { renderGenre } from '../../apiConfig/apiConfig';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import Loading from './../../components/Loading/Loading';
SwiperCore.use([Navigation]);

const Trending = () => {
    const { movieList, genres, currentItemListImage } = useSelector(state => state.MovieReducer)
    const dispatch = useDispatch()
    const { filmId } = useParams();
    const props = useSpring({ to: { opacity: 1, transform: 'translateX(0))' }, from: { opacity: 0, transform: 'translateX(100%)' }, config: { duration: 2000 } })

    const currentMovieTrending = movieList.filter((item) => item.id == filmId)
    let navigate = useNavigate();
    const getXWidthApi = async () => {
        await dispatch({
            type: 'getXWidthImageAction',
            payload: {
                kind: 'movie',
                id: filmId
            }
        })
    }
    useEffect(() => {
        let isApiSubscribed = true;
        if (isApiSubscribed) {
            getXWidthApi()
        }
        return () => {
            isApiSubscribed = false
        }
    }, [])

    return (
        <div>
            <Header transparent />
            {
                movieList && genres && currentItemListImage
                    ?
                    <div>
                        <div className={styles.trending}>
                            <img alt="thumbnail" className={styles.thumbnail} src={currentItemListImage[Math.floor(Math.random() * currentItemListImage.length)]?.file_path ? `https://image.tmdb.org/t/p/original` + currentItemListImage[Math.floor(Math.random() * currentItemListImage.length)]?.file_path : `https://image.tmdb.org/t/p/original` + currentMovieTrending[0]?.backdrop_path} />
                            <div className={styles.title}>
                                <ul>
                                    {renderGenre(currentMovieTrending[0]?.genre_ids, genres).map((item, index) => (
                                        <li key={index} >{item[0]?.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <h1 onClick={() => navigate(`/movie/${filmId}`)} className={styles.play}>
                            <span className="p-3"><GrRedo className={styles.play__button} size="30" /> </span>
                            Watch</h1>
                        <div className={styles.slider} >
                            <animated.div style={props}>
                                <Swiper
                                    className={`${styles.swiper} mySwiper`} modules={[Navigation, Pagination, Scrollbar, A11y]}
                                    scrollbar={{ draggable: true }} navigation={true} pagination={{ clickable: true }} slidesPerView={4.5}  >
                                    {movieList.filter(movie => movie.poster_path).map((film, index) => (
                                        <SwiperSlide key={index} onClick={() => navigate(`/movieTrending/${film?.id}`)} className={film.id == filmId ? `${styles.slide} ${styles.slide_active}` : `${styles.slide}`} >
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                            <img alt={film.title} src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />
                                            <h1>{film.title}</h1>
                                        </SwiperSlide>

                                    ))}

                                </Swiper>
                            </animated.div>
                        </div>
                    </div>

                    :
                    <Loading />

            }

        </div >
    )
}

export default Trending