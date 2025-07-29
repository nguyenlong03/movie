import Slider from "react-slick";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MovieCarousel = ({ title, movies, size = "medium", viewAllLink }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <div className="mb-12 movie-carousel">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            state={{ title: title }}
            className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
          >
            Xem tất cả
          </Link>
        )}
      </div>

      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-1 py-4">
            <MovieCard movie={movie} size={size} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
