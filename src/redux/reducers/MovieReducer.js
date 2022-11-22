import { GET_DETAIL, GET_FULL_WIDTH_IMAGE, GET_GENRE, GET_MOVIE_API, GET_TV_SERIES_API, GET_VIDEO, GET_LIST_BY_SEARCH_PARAM } from "../constants/constants"
import { GET_LIST_BY_GENRE, GET_ELSE_MOVIE_LIST } from './../constants/constants';

const initialState = {
    movieList: [],
    tvSeries: [],
    genres: [],
    currentItemListImage: [],
    currentItem: null,
    currentVideo: null,
    currentListMovie: null,
    elseList: []
}


export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TV_SERIES_API:
            state.tvSeries = action.tvSeries
            return { ...state }
        case GET_MOVIE_API:
            state.movieList = action.movieList
            return { ...state }
        case GET_GENRE:
            state.genres = action.genres
            return { ...state }
        case GET_FULL_WIDTH_IMAGE:
            state.currentItemListImage = action.filterXWidthImages
            return { ...state }
        case GET_DETAIL:
            state.currentItem = action.currentItem
            return { ...state }
        case GET_VIDEO:
            state.currentVideo = action.currentVideo
            return { ...state }
        case GET_LIST_BY_GENRE:
            state.currentListMovie = action.currentListMovie
            return { ...state }
        case GET_LIST_BY_SEARCH_PARAM:
            state.currentListMovie = action.currentListMovie
            return { ...state }
        case GET_ELSE_MOVIE_LIST:
            state.elseList = action.elseList
            return { ...state }
        default:
            return { ...state }
    }
}
