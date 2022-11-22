import React from 'react'
import styles from './TvEpisodesMainBoard.module.scss'
import { FiPlay, FiCornerUpLeft } from "react-icons/fi";
import Offcanvas from 'react-bootstrap/Offcanvas'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import { useDispatch, useSelector } from 'react-redux';
import YouTube from 'react-youtube';
import { useEffect } from 'react';

import { memo } from 'react';
import Loading from '../Loading/Loading';

const TvEpisodesMainBoard = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { tvId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onReady = (event) => {
        event.target.pauseVideo()
    }
    const { currentVideo, currentItem, currentItemListImage } = useSelector(state => state.MovieReducer)
    const [season, setSeason] = useState(1)
    const getVideo = async (Id, isSeason = 'season', seasonNumber, catalog) => {
        await dispatch({
            type: 'getVideoAction',
            Id,
            isSeason,
            seasonNumber,
            catalog
        })
    }
    useEffect(() => {
        getVideo(tvId, 'season', season, 'tv')
    }, [season])

    return (
        <div>
            {
                currentVideo && currentItem && currentItemListImage ?
                    <div className={styles.mainBoard}>
                        <FiCornerUpLeft onClick={() => navigate(-1)} className={styles.back} size={34} />
                        <img alt="thumbnail" className={styles.thumbnail} src={`https://image.tmdb.org/t/p/original${currentItem?.backdrop_path}`} />
                        <div className={styles.detail}>
                            <div className={styles.posterPath}>
                                <img alt="posterPath" src={`https://image.tmdb.org/t/p/original/${currentItem?.poster_path}`} />
                            </div>
                            <h1 className={styles.slogan}>{currentItem?.tagline}</h1>
                            <div className={styles.seasons}>
                                <ul>
                                    {currentItem?.seasons.filter(item => item?.season_number > 0).map(item =>
                                        <li key={item?.season_number}>#{item?.season_number}</li>)}
                                </ul>
                            </div>
                            <h1 className="fs-4 ">WATCH NEW SEASON ON <span className={`${styles.networksLogo} `}><a className="text-danger fw-bold fs-1" href={`${currentItem?.homepage}`}>{currentItem?.networks[0]?.name}</a></span></h1>
                        </div>
                        <div className={styles.episodes}>
                            {currentItem?.seasons.filter(item => item?.season_number > 0).map(item => (
                                <div className={styles.episodes_container}>
                                    <div className={styles.episodes_item}>
                                        <h1>{item?.name}</h1>
                                    </div>
                                    <div className={styles.episodes_item}>
                                        < FiPlay onClick={() => {
                                            handleShow()
                                            setSeason(item?.season_number)
                                        }} size="24" className="mr-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.episodes_page}>
                            <Offcanvas show={show} onHide={handleClose} placement='end'>
                                <div className={styles.poster}>
                                    <img alt="poster" src={currentItemListImage.length > 0 ? ` https://image.tmdb.org/t/p/original/${currentItemListImage[Math.round(Math.random() * currentItemListImage.length)]?.file_path}` : `https://image.tmdb.org/t/p/original/${currentItem?.backdrop_path}`} />
                                </div>
                                <div className={styles.poster_detail}>
                                    <Swiper className={styles.swiper} navigation modules={[Navigation]}
                                        scrollbar={{ draggable: true }} slidesPerView={2.5} >
                                        {currentVideo?.map((item, index) =>
                                            <SwiperSlide key={index} className={styles.swiperSlide}>
                                                <YouTube className={styles.video} videoId={item?.key} opts={{
                                                    height: '180',
                                                    width: '270',
                                                    playerVars: {
                                                        controls: 1,
                                                        modestbranding: 1
                                                    }
                                                }
                                                } onReady={onReady} />
                                            </SwiperSlide>
                                        )}
                                    </Swiper>
                                    <div className={styles.poster_text}>
                                        <h2>Season {season} | Episode {currentItem?.seasons?.filter(item => item?.season_number === season).map(item => item?.episode_count)} </h2>
                                        <h1>The Reviewer</h1>
                                        <p>{currentItem?.overview}</p>
                                        <h1 className='text-center text-muted my-5'>{currentItem?.name}</h1>
                                    </div>
                                </div>
                            </Offcanvas>
                        </div>
                    </div>
                    :
                    <Loading />
            }
        </div>
    )
}

export default memo(TvEpisodesMainBoard)