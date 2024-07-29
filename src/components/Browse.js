import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../Hooks/useNowPlayingMovies';
import MainContainer from './MainContainer';
import { SecondaryContainer } from './SecondaryContainer';
import usePopularMovies from "../Hooks/usePopularMovies";
import GPTSearch from './GPTSearch';
import { useSelector } from 'react-redux';

export const Browse = () => {
  const showGptSearch = useSelector(store => store.gpt.showGptSearch);
  useNowPlayingMovies ();
  usePopularMovies ();

  return (
    <div>
      <Header />
      {
        showGptSearch ? (
        <GPTSearch />) : (
        <>
        <MainContainer />
      <SecondaryContainer />
      </>
      )};
      
      
    </div>
  );
};
