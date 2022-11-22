import React from 'react'
import { useSelector } from 'react-redux'
import styles from './CatalogeType.module.scss'
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';
import { useSpring, animated } from 'react-spring';
import Loading from './../Loading/Loading';

const CatalogeType = () => {
    const slideProps = useSpring({ to: { opacity: 1, transform: 'translateX(0))' }, from: { opacity: 0, transform: 'translateX(100%)' }, config: { duration: 3000 } })
    const slideProps2 = useSpring({ to: { opacity: 1, transform: 'translateX(0))' }, from: { opacity: 0, transform: 'translateX(-100%)' }, config: { duration: 4000 } })

    const { currentListMovie } = useSelector(state => state.MovieReducer)
    const navigate = useNavigate()
    return (
        <div div >
            {
                currentListMovie ?
                    <div className={`${styles.catalog} row`}>
                        {
                            currentListMovie?.filter(movie => movie?.poster_path).map((movie, index) => (
                                <div className="col-md-2 col-lg-2 col-sm-4 col-xs-4">
                                    <animated.div style={index % 2 == 0 ? slideProps : slideProps2}>
                                        <img key={index} onClick={() => navigate(`/movie/${movie?.id}`)} src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} />
                                    </animated.div>
                                </div>
                            ))
                        }
                    </div >
                    :
                    <Loading />
            }
        </div>
    )
}

export default memo(CatalogeType)