

export const renderGenre = (theGenresArray, genres) => {
    let GenresOfTheFilm = []
    for (let i = 0; i < theGenresArray?.length; i++) {
        GenresOfTheFilm.push(genres?.filter((item) => item?.id === theGenresArray[i]))
    }
    return GenresOfTheFilm
}
export const renderVotingStar = (point) => {
    let pointInPercentage = point / 10
    let ratingStarOutput = 0
    for (let i = 0; i < 5; i++) {
        if (i < Math.round((pointInPercentage * 5))) {
            ratingStarOutput += 1
        }

    }
    return ratingStarOutput

}
