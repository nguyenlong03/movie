import HeroSection from "../components/HeroSection";
import MovieCarousel from "../components/MovieCarousel";
import {
  FEATURED_MOVIE,
  TRENDING_MOVIES,
  NEW_RELEASES,
  POPULAR_SERIES,
  TOP_RATED_MOVIES,
} from "../data/mockData";

const HomePage = () => {
  return (
    <div>
      <HeroSection movie={FEATURED_MOVIE} />

      <div className="container mx-auto px-4 py-8">
        <MovieCarousel
          title="Đang thịnh hành"
          movies={TRENDING_MOVIES}
          viewAllLink="/view-all/trending"
        />

        <MovieCarousel
          title="Phim lẻ mới"
          movies={NEW_RELEASES}
          viewAllLink="/view-all/new-releases"
        />

        <MovieCarousel
          title="Phim bộ phổ biến"
          movies={POPULAR_SERIES}
          viewAllLink="/view-all/popular-series"
        />

        <MovieCarousel
          title="Đánh giá cao"
          movies={TOP_RATED_MOVIES}
          viewAllLink="/view-all/top-rated"
        />
      </div>
    </div>
  );
};

export default HomePage;
