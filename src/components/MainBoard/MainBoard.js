import React from 'react'
import styles from './MainBoard.module.scss'
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsPlay } from "react-icons/bs";
import { useSpring, animated } from 'react-spring';
const MainBoard = () => {
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const slideProps = useSpring({ to: { opacity: 1, transform: 'translateY(0))' }, from: { opacity: 0, transform: 'translateY(-100%)' }, config: { duration: 3000 } })
    const slideProps2 = useSpring({ to: { opacity: 1, transform: 'translateY(0))' }, from: { opacity: 0, transform: 'translateY(-100%)' }, config: { duration: 4000 } })

    const { movieList, elseList, tvSeries } = useSelector(state => state.MovieReducer)
    const navigate = useNavigate()
    return (
        <div className={`${styles.mainBoard} container-fluid`}>
            <div className="row">
                <div className={`col-md-9 col-lg-9 col-sm-12 col-xs-12 ${styles.borderSolid}`}>
                    <div>
                        <div className="flex-space mb-3 px-5">
                            <h1 className="text-white m">TV Series<span className="fs-4 mx-3 text-muted">{tvSeries.length} movies</span></h1>
                            <h2 onClick={() => navigate(`/all/28`)} className="text-muted ">All Movies <IoIosArrowForward /></h2>
                        </div>
                        <div className={`row ${styles.playingMovie}`}>
                            <div className={`col-md-7 col-lg-7 ${styles.playingMovie_1} `}>
                                <animated.div style={slideProps}>
                                    <img onClick={() => navigate(`/tvSeries/${tvSeries[0]?.id}`)} alt="1" src={`https://image.tmdb.org/t/p/original${tvSeries[0]?.backdrop_path}`} />
                                </animated.div>
                            </div>
                            <div className={`col-md-5 col-lg-5 ${styles.playingMovie_1} `}>
                                <animated.div style={slideProps2}>
                                    <img onClick={() => navigate(`/tvSeries/${tvSeries[1]?.id}`)} alt="2" className="" src={`https://image.tmdb.org/t/p/original${tvSeries[1]?.backdrop_path}`} />
                                </animated.div>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.popular} mt-3 p-5 `}>
                        <div className="flex-space mb-3   border-top-new ">
                            <h1 className="text-white ">Popular Movies<span className="fs-4 mx-3 text-muted">5 movies</span></h1>
                            <h2 onClick={() => navigate(`/all/28`)} className="text-muted ">All Movies <IoIosArrowForward /></h2>
                        </div>
                        {movieList.filter((item, index) => item.poster_path && index < 3).map((film, index) => (
                            <div onClick={() => navigate(`/movie/${film?.id}`)} className={`col-md-3 col-xs-12  col-lg-4 ${styles.playingMovie_2}`} >
                                <BsPlay className={styles.play} color="white" size="50" />
                                <img alt={film.title} key={index} src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} />
                                <h1 className="mt-5 text-center">{film.title}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`col-md-3 col-lg-3 col-sm-12  col-xs-12 ${styles.trailer}`}>
                    <h1 className="mb-5">New Trailers</h1>
                    <div>
                        {elseList?.map((movie, item) => (
                            <div onClick={() => navigate(`/movie/${movie?.id}`)}>
                                <img alt="film" className={`${styles.trailerImg}`} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} />
                                <div className="flex-space">
                                    <div>
                                        <h3>{movie.title}</h3>
                                        <p>Released On {`${(new Date(movie.release_date)).getDate()}`} {month[(new Date(movie.release_date)).getMonth()]} </p>
                                    </div>
                                    <div>
                                        <p className="text-white"><AiOutlineLike />  {movie.vote_average}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default MainBoard