type Genre = {
    id: number;
    name: string;
  };

  export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres:Genre[]
    tagline?:string,
    revenue?:string,
    production_companies :ProductionCompanies[],
    status?:string
    
homepage?:string,
spoken_languages:SpokenLanguage[]
    
  }
  
  export interface ExpandableCardProps {
    movies: Movie[];
  }
  type SpokenLanguage={
    english_name:string
  }

  type ProductionCompanies={
    
name:string
origin_country:string
  }