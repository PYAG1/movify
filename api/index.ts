import axios from "axios";

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});

export async function fetchMovieList(page: number) {
  try {
  return apiInstance.get(`/4/list/${page}`);

  } catch (error) {
    throw error;
  }
}

export async function fetchMovieDetails(movieId: string) {
  try {
    const response = await apiInstance({
      url: `/3/movie/${movieId}`,
      method: "get",
    });
    return response;
  } catch (error) {
    throw error;
  }
}
