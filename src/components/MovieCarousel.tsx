import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import MovieCard, { Movie } from './MovieCard';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  size?: 'small' | 'medium' | 'large';
  viewAllLink?: string;
}

const MovieCarousel: React.FC<MovieCarouselProps> = ({ 
  title, 
  movies, 
  size = 'medium',
  viewAllLink 
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {viewAllLink && (
          <Link 
            to={viewAllLink}
            state={{ title: title }}
            className="text-sm text-orange-500 hover:text-orange-400 transition-colors"
          >
            Xem tất cả
          </Link>
        )}
      </div>
      
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <MovieCard movie={movie} size={size} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;