import React from 'react'
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header'
import TvEpisodesMainBoard from './../../components/TvEpisodesMainBoard/TvEpisodesMainBoard';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const TvEpisodes = () => {
    const { tvId } = useParams();
    const dispatch = useDispatch()

    const getDetailApi = async (tvId, catalog) => {
        await dispatch({
            type: 'getDetailsAction',
            tvId,
            catalog
        })
    }
    const getXWidthApi = async () => {
        await dispatch({
            type: 'getXWidthImageAction',
            payload: {
                kind: 'tv',
                id: tvId,
            }
        })
    }
    useEffect(() => {
        let isApiSubscribed = true;
        if (isApiSubscribed) {
            getDetailApi(tvId, 'tv')
            getXWidthApi()

        }
        return () => {
            isApiSubscribed = false
        }
    }, [])
    return (
        <div>
            <Header transparent />
            <TvEpisodesMainBoard />
        </div>
    )
}

export default TvEpisodes