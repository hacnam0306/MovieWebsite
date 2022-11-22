import React from 'react'
import { memo } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import  Poster  from '../../components/Poster/Poster'
import styles from './Series.module.scss'

const Series = () => {
    const { tvId } = useParams();

    const dispatch = useDispatch()

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
            getXWidthApi()
        }
        return () => {
            isApiSubscribed = false
        }
    }, [tvId])
    console.log("abc")
    return (
        <div className={styles.series} >
            <Header transparent />
            <Poster />
        </div>
    )
}

export default memo(Series)