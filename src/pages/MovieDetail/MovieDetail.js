import React from 'react'
import Header from '../../components/Header/Header'
import MovieDashBoard from '../../components/MovieDashBoard/MovieDashBoard'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const MovieDetail = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch()

    const getVideo = async (Id, isSeason = '', seasonNumber, catalog) => {
        await dispatch({
            type: 'getVideoAction',
            Id,
            isSeason,
            seasonNumber,
            catalog
        })
    }

    const getDetailApi = async (tvId, catalog) => {
        await dispatch({
            type: 'getDetailsAction',
            tvId,
            catalog
        })
    }
    useEffect(() => {
        getVideo(movieId, '', '', 'movie')
        getDetailApi(movieId, 'movie')
    }, [movieId])
    return (
        <div>
            <Header transparent />
            <MovieDashBoard />
        </div>
    )
}

export default MovieDetail