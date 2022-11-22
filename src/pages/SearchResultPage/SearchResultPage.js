import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search';
import CatalogeType from '../../components/CatalogeType/CatalogeType';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';


const SearchResultPage = () => {
    const { searchInfo } = useParams();
    const dispatch = useDispatch()

    const getMovieWithSearchTerm = () => {
        dispatch({
            type: 'getMovieBySearchParams',
            search_param: searchInfo
        })
    }
    useEffect(() => {
        getMovieWithSearchTerm()
    }, [searchInfo])
    return (
        <div>
            <Header />
            <Search />
            <CatalogeType />

        </div>
    )
}

export default SearchResultPage