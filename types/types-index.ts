type Genre = { id: number; name: string };

type ProductionCompany = { name: string; origin_country: string };

type SpokenLanguage = { english_name: string };

export interface Movie {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  release_date: string; 
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  revenue?: string;
  tagline?: string;
  production_companies: ProductionCompany[];
  status?: string;
  homepage?: string;
  spoken_languages: SpokenLanguage[];
  adult: boolean;
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
}

export interface ExpandableCardProps {
  movies: Movie[];
}
export interface CarouselItemType {
  title: string;
  image: string;
}