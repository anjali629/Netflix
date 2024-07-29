import React from 'react'
import { MovieList } from './MovieList'
import { useSelector } from 'react-redux';

export const SecondaryContainer = () => {
  const movies = useSelector ((store) => store.movies);
  return (
    movies.nowPlayingMovies &&(
    <div className='bg-black z-80'>
      <div className='-mt-60 pl-12 relative bg-transparent'>
      <MovieList title ={"Now Playing"} movies = {movies.nowPlayingMovies} />
      <MovieList title ={"Trending"} movies = {movies.nowPlayingMovies} />
      <MovieList title ={"Popular"} movies = {movies.popularMovies} />
     
      </div>
    </div>
    )
  );
};
