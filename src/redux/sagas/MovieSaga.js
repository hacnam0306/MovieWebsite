import { takeLatest, put, call } from 'redux-saga/effects'
import { GET_DETAIL, GET_FULL_WIDTH_IMAGE, GET_GENRE, GET_LIST_BY_SEARCH_PARAM, GET_MOVIE_API, GET_TV_SERIES_API, GET_VIDEO } from '../constants/constants'
import axios from 'axios'
import { GET_LIST_BY_GENRE, GET_ELSE_MOVIE_LIST } from './../constants/constants';
// GET TV SERIES POPULAR
function* getTvSeriesApi() {

    let { results } = yield call(() => {
        return axios.get('https://api.themoviedb.org/3/tv/popular?api_key=b5efe6a8595da3522744adecd2a706a7').then((res) => {
            return res.data
        })
    })

    yield put({
        type: GET_TV_SERIES_API,
        tvSeries: results
    })
}
// GET Movie POPULAR

function* getMovieApi(action) {
    let { results } = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/movie/${action.rate}?api_key=b5efe6a8595da3522744adecd2a706a7`).then((res) => {
            return res.data
        })
    })

    yield put({
        type: GET_MOVIE_API,
        movieList: results
    })

}
// GET ELSE MOVIE LIST
function* getElseTypeMovieList(action) {
    let { results } = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/movie/${action.rate}?api_key=b5efe6a8595da3522744adecd2a706a7`).then((res) => {
            return res.data
        })
    })

    yield put({
        type: GET_ELSE_MOVIE_LIST,
        elseList: results
    })
}


// GET  ALL GENRES

function* getGenre(action) {

    let { genres } = yield call(() => {
        return axios.get('https://api.themoviedb.org/3//genre/movie/list?api_key=b5efe6a8595da3522744adecd2a706a7').then((res) => {
            return res.data
        })
    })

    yield put({
        type: GET_GENRE,
        genres
    })
}
// GET BACKGROUND_IMAGE
function* getXWidthImage(action) {
    let { kind, id, width = 1920 } = action.payload
    let { backdrops } = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/${kind}/${id}/images?api_key=b5efe6a8595da3522744adecd2a706a7`).then((res) => {
            return res.data
        })
    })
    const filterXWidthImages = backdrops.filter(image => image.width === width)
    yield put({
        type: GET_FULL_WIDTH_IMAGE,
        filterXWidthImages
    })
}
// GET DETAIL 
function* getDetails(action) {
    let results = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/${action.catalog}/${action.tvId}?api_key=b5efe6a8595da3522744adecd2a706a7`).then((res) => {
            return res.data
        })
    })
    yield put({
        type: GET_DETAIL,
        currentItem: results
    })
}
// GET VIDEO
function* getVideo(action) {
    let { results } = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/${action.catalog}/${action.Id}/${action.isSeason}/${action.seasonNumber}/videos?api_key=b5efe6a8595da3522744adecd2a706a7`).then((res) => {
            return res.data
        })
    })
    yield put({
        type: GET_VIDEO,
        currentVideo: results
    })
}
// GET MOVIE BY TYPE
function* getMovieByGenres(action) {
    let { results } = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=b5efe6a8595da3522744adecd2a706a7&with_genres=${action.genre_id}`).then((res) => {
            return res.data
        })
    })
    yield put({
        type: GET_LIST_BY_GENRE,
        currentListMovie: results
    })
}
// GET MOVIE BY SEARCH PARAMETERS
function* getMovieBySearchParams(action) {
    console.log(action)
    let { results } = yield call(() => {
        return axios.get(`https://api.themoviedb.org/3/search/movie?api_key=b5efe6a8595da3522744adecd2a706a7&language=en-US&query=${action.search_param}&page=1&include_adult=false`).then((res) => {
            return res.data
        })
    })
    console.log(results)
    yield put({
        type: GET_LIST_BY_SEARCH_PARAM,
        currentListMovie: results
    })
}
export function* ActionGetListBySearchParams() {

    yield takeLatest('getMovieBySearchParams', getMovieBySearchParams)


}
export function* ActionGetElseMovieType() {

    yield takeLatest('getElseTypeMovieList', getElseTypeMovieList)


}


export function* ActionGetVideoByGenres() {

    yield takeLatest('getMovieByGenres', getMovieByGenres)


}

export function* ActionGetVideo() {

    yield takeLatest('getVideoAction', getVideo)


}



export function* ActionGetDetail() {

    yield takeLatest('getDetailsAction', getDetails)


}
export function* ActionGetTvApi() {

    yield takeLatest('getTvApiAction', getTvSeriesApi)


}

export function* ActionGetMovieApi() {

    yield takeLatest('getMovieApiAction', getMovieApi)


}
export function* ActionGetGenreApi() {

    yield takeLatest('getGenresAction', getGenre)


}
export function* ActionGetXWidthApi() {

    yield takeLatest('getXWidthImageAction', getXWidthImage)


}