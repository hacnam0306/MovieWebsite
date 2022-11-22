import React from 'react'
import styles from './Recommend.module.scss'
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
export const Recommend = () => {
    const { tvSeries } = useSelector(state => state.MovieReducer)
    const { tvId } = useParams();
    let navigate = useNavigate();

    const slideProps = useSpring({ to: { opacity: 1, transform: 'translateY(0))' }, from: { opacity: 0, transform: 'translateY(100%)' }, config: { duration: 2000 } })

    return (
        <div className={styles.slider}>
            <Swiper className={styles.swiper} navigation modules={[Navigation]}
                scrollbar={{ draggable: true }} slidesPerView={8.6} >
                {
                    tvSeries.filter(tv => tv.poster_path).map((film, index) => (
                        <SwiperSlide onClick={() => navigate(`/series/${film?.id}`)} className={film.id == tvId ? `${styles.slide} ${styles.slide_active}` : `${styles.slide}`} key={index} >
                            <animated.div style={slideProps}>
                                <img alt={film.name} src={`https://image.tmdb.org/t/p/w500${film.poster_path}`} />
                                <h1>{film.name}</h1>
                            </animated.div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div >
    )
}
