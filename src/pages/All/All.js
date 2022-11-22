import Header from '../../components/Header/Header'
import Search from './../../components/Search/Search';
import CatalogeType from './../../components/CatalogeType/CatalogeType';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Loading } from './../../components/Loading/Loading';

const All = () => {
    const { genre } = useParams();
    const dispatch = useDispatch()
    const getMovieWithType = () => {
        dispatch({
            type: 'getMovieByGenres',
            genre_id: genre
        })
    }

    useEffect(() => {
        getMovieWithType()
    }, [genre])
    return (
        <div>
            <Header />
            <Search />
            <CatalogeType />
            <Loading />
        </div>
    )
}

export default All