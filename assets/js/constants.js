
export const API_KEY = '289d5cc6f906a05d0910f4114c41bf6b';
export const URL = window.location.href; 
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';

export const API_LATEST_MOVIES = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&include_adult=false`;
export const API_MOVIE_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
export const API_TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
export const API_MOST_WATCHED_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

export const API_RELATED_MOVIES = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`;
}
export const API_MOVIE_DETAILS = (id) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
}
export const API_ACTOR_DETAILS = (cast_id) => {
    return `https://api.themoviedb.org/3/person/${cast_id}?api_key=${API_KEY}&language=en-US`;
}
export const API_ACTOR_FILMOGRAPHY = (cast_id) => {
    return `https://api.themoviedb.org/3/person/${cast_id}/movie_credits?api_key=${API_KEY}&language=en-US`;
}

