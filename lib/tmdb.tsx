const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// ---------------- MOVIES ---------------- //
export async function getTrendingMovies() {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch movies");
  const data = await res.json();
  return data.results;
}

export async function searchMovies(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search movies");
  const data = await res.json();
  return data.results;
}

export async function getMovieDetails(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos,watch/providers`
  );
  if (!res.ok) throw new Error("Failed to fetch movie details");
  const data = await res.json();
  return data;
}

export async function getMovieVideos(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch videos");
  const data = await res.json();
  return data.results;
}

export async function getMovieWatchProviders(id: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch watch providers");
  const data = await res.json();
  return data.results;
}

// ---------------- TV SHOWS ---------------- //
export async function getTrendingTV() {
  const res = await fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch TV shows");
  const data = await res.json();
  return data.results;
}

export async function searchTV(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search TV shows");
  const data = await res.json();
  return data.results;
}

export async function getTVDetails(id: number) {
  const [serie, images, credits] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`, { cache: "no-store" })
      .then((res) => res.json()),
    fetch(`https://api.themoviedb.org/3/tv/${id}/images?api_key=${API_KEY}`, { cache: "no-store" })
      .then((res) => res.json()),
    fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`, { cache: "no-store" })
      .then((res) => res.json()),
  ]);

  return { serie, images, credits };
}

export async function getTVVideos(id: number) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error("Failed to fetch TV videos");
  const data = await res.json();
  return data.results;
}

export async function getTVWatchProviders(id: number) {
  const res = await fetch(
    `${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch TV watch providers");
  const data = await res.json();
  return data.results;
}

// ---------------- BOTH (movies + TV) ---------------- //
export async function getTrendingAll(page:number =1) {
  const res = await fetch(`${BASE_URL}/trending/all/week?api_key=${API_KEY}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch trending content");
  const data = await res.json();
  return data.results; // includes both movies & TV
}

export async function searchMulti(query: string) {
  const res = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error("Failed to search across movies & TV");
  const data = await res.json();
  return data.results; // contains type info: movie | tv | person
}

// Fetch actor details
export async function getActorDetails(id: number) {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch actor details");
  return res.json();
}

// Fetch actor combined credits
export async function getActorCredits(id: number) {
  const res = await fetch(`${BASE_URL}/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error("Failed to fetch actor credits");
  return res.json();
}

export async function searchPerson(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`
  );

  if (!res.ok) throw new Error("Failed to search person");
  const data = await res.json();
  return data.results; // array of people
}
