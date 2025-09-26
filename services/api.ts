export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovies = async ({ query }: { query: string}) =>{
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch( endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    })

    if(!response.ok){
        // @ts-ignore
        throw new Error("Failed to fetch movies", response.statusText);
        
    }

    const data = await response.json();
// 👇 Debug log
  console.log("TMDB API response:", data);
    return data.results;
}

// /discover/movie

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmE2NjE1Nzk3YWYxZjFmYTcxM2I3MGM3YmZjZjBiNiIsIm5iZiI6MTc1NzQzMjk0Mi43MTUwMDAyLCJzdWIiOiI2OGMwNGM2ZWY3MWE2MjY0ZWMxYmQ0NzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RIs02SEA8_74AmFM75mh8Hgo6jogkvm7B4uPg74K1FE'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));