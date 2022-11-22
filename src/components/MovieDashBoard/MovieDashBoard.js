import React from 'react'
import styles from './MovieDashBoard.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import YouTube from 'react-youtube';
import { useSelector } from 'react-redux';
import { FiCornerUpLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { memo } from 'react';
import { useSpring, animated } from 'react-spring';

const MovieDashBoard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { currentVideo, currentItem } = useSelector(state => state.MovieReducer)
    const navigate = useNavigate()
    const onReady = (event) => {
        event.target.pauseVideo()
    }
    const slideProps = useSpring({ to: { opacity: 1, transform: 'translateY(0))' }, from: { opacity: 0, transform: 'translateY(100%)' }, config: { duration: 2000 } })
    const props = useSpring({ to: { opacity: 1, transform: 'translateY(0))' }, from: { opacity: 0, transform: 'translateY(-100%)' }, config: { duration: 2000 } })

    return (
        <div className={styles.movieDashBoard}>
            <FiCornerUpLeft color="#FC9700" className={styles.back} onClick={() => navigate(-1)} size={34} />
            <div className={styles.backgroundImage}>
                <img alt="thumbnail" src={`https://image.tmdb.org/t/p/original` + currentItem?.backdrop_path} />
                <div className={styles.overlay}>
                </div>
            </div>
            <div className={styles.detail}>
                <div className={styles.movie_description}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/original` + currentItem?.poster_path} alt="poster_path" />
                    </div>
                    <div>
                        <p className="fs-5 text-muted">Movie  | <span className="me-3 text-danger">{currentItem?.genres.map(item => item.name + ',')}</span> </p>
                        <h1 className="text-white mb-5">{currentItem?.title}</h1>
                        <h4 className="text-muted">Production Company <span className="text-white">{currentItem?.production_companies.map(item => ' ' + item.name + '  |')}</span></h4>
                        <p className="text-muted my-5 fs-5">{currentItem?.overview}</p>
                        <h3 className="text-warning mt-5"> {currentItem?.production_countries[0].name}</h3>
                    </div>
                    <div className={styles.pointArea}>
                        <h1>{currentItem?.vote_average}<span className="fs-1">/10  </span></h1>
                    </div>
                </div>
                <div className={styles.slider}>
                    <div className={styles.slider_title}>
                        <button onClick={handleShow}>Watch Now</button>
                    </div>
                    <h1 className="text-white my-5 ">TRAILERS</h1>
                    <Swiper className={styles.swiper} navigation
                        scrollbar={{ draggable: true }} slidesPerView={4.5} >
                        {currentVideo?.map((item, index) =>
                            <SwiperSlide key={index} className={styles.swiperSlide}>
                                <animated.div style={slideProps}>
                                    <YouTube className={styles.video} videoId={item?.key} opts={{
                                        height: '180',
                                        width: '300',
                                        playerVars: {
                                            controls: 1,
                                            modestbranding: 1
                                        }
                                    }
                                    } onReady={onReady} />
                                </animated.div>

                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>
            </div >
            <Modal className={styles.modal} show={show} onHide={handleClose}>
                <animated.div style={props}>
                    <YouTube className={styles.trailer} videoId={currentVideo?.filter(item => item.type === "Trailer")[0].key} opts={{
                        height: '600',
                        width: '800',
                        playerVars: {
                            controls: 1,
                            autoplay: 1,
                            loop: 1,
                        }
                    }
                    } onReady={onReady} />
                </animated.div>

            </Modal>
        </div >

    )
}

export default memo(MovieDashBoard)