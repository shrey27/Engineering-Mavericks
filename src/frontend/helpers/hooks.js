import { useLandingCtx, usePlaylistCtx } from '../context';
import { useEffect, useState } from 'react';

/*
1.) const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
2.) datatoUpdate.likes = [...likes];
3.) localStorage.setItem('userData', JSON.stringify(datatoUpdate));

1,2,3 => updateLocalStorage
*/
export function useLocalStorage() {
  const data = JSON.parse(localStorage.getItem('userData'));
  const updateLocalStorage = (key, value) => {
    data[key] = value;
    localStorage.setItem('userData', JSON.stringify(data));
  };
  if (data) {
    const { email, password, likes, history, playlists, watchlater } = data;
    const storedToken = localStorage.getItem('token');
    return {
      storedEmail: email,
      storedPassword: password,
      storedLikes: likes,
      storedHistory: history,
      storedPlaylists: playlists,
      storedWatchlater: watchlater,
      storedToken,
      updateLocalStorage
    };
  } else {
    return { updateLocalStorage };
  }
}

export const useSingleVideo = (id) => {
  const { filteredList } = useLandingCtx();
  return filteredList.find((elem) => elem._id === id);
};

export const useSinglePlaylistVideos = (id) => {
  const {
    state: { playlists }
  } = usePlaylistCtx();
  const { videos } = playlists.find((elem) => elem._id === id);
  return videos;
};

export const useOutsideClick = (ref) => {
  const [outsideClick, setOutsideClick] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!ref.current.contains(e.target)) {
        setOutsideClick(true);
      } else {
        setOutsideClick(false);
      }
      setOutsideClick(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return outsideClick;
};
