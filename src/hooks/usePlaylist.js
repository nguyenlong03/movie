import { useState, useEffect } from 'react';

export const usePlaylist = () => {
  const [playlist, setPlaylist] = useState([]);
  const [watchHistory, setWatchHistory] = useState([]);

  useEffect(() => {
    // Load playlist from localStorage
    const savedPlaylist = localStorage.getItem('moviePlaylist');
    if (savedPlaylist) {
      setPlaylist(JSON.parse(savedPlaylist));
    }

    // Load watch history from localStorage
    const savedHistory = localStorage.getItem('watchHistory');
    if (savedHistory) {
      setWatchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const addToPlaylist = (movieId) => {
    if (!playlist.includes(movieId)) {
      const updatedPlaylist = [...playlist, movieId];
      setPlaylist(updatedPlaylist);
      localStorage.setItem('moviePlaylist', JSON.stringify(updatedPlaylist));
      return true; // Successfully added
    }
    return false; // Already in playlist
  };

  const removeFromPlaylist = (movieId) => {
    const updatedPlaylist = playlist.filter(id => id !== movieId);
    setPlaylist(updatedPlaylist);
    localStorage.setItem('moviePlaylist', JSON.stringify(updatedPlaylist));
  };

  const isInPlaylist = (movieId) => {
    return playlist.includes(movieId);
  };

  const addToWatchHistory = (movieId, episodeId = null) => {
    const historyItem = {
      movieId,
      episodeId,
      watchedAt: new Date().toISOString()
    };

    // Remove existing entry for same movie/episode to avoid duplicates
    const filteredHistory = watchHistory.filter(item => 
      !(item.movieId === movieId && item.episodeId === episodeId)
    );
    
    const updatedHistory = [historyItem, ...filteredHistory].slice(0, 50); // Keep only last 50 items
    setWatchHistory(updatedHistory);
    localStorage.setItem('watchHistory', JSON.stringify(updatedHistory));

    // Remove from playlist when watched
    if (playlist.includes(movieId)) {
      removeFromPlaylist(movieId);
    }
  };

  const clearPlaylist = () => {
    setPlaylist([]);
    localStorage.removeItem('moviePlaylist');
  };

  const clearWatchHistory = () => {
    setWatchHistory([]);
    localStorage.removeItem('watchHistory');
  };

  return {
    playlist,
    watchHistory,
    addToPlaylist,
    removeFromPlaylist,
    isInPlaylist,
    addToWatchHistory,
    clearPlaylist,
    clearWatchHistory
  };
};
