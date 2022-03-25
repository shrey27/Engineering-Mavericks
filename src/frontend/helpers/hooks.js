import { useLandingCtx } from '../context';

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
    const { email, password, likes, history, playlists } = data;
    const storedToken = localStorage.getItem('token');
    return {
      storedEmail: email,
      storedPassword: password,
      storedLikes: likes,
      storedHistory: history,
      storedPlaylists: playlists,
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
