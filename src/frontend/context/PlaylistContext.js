import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuthCtx } from './index';
import { getPlaylists, addPlaylist, deletePlaylist } from '../service';
import { useLocalStorage } from '../helpers';
// import { historyReducerFunction, historyDefaultState } from '../helpers';

const PlaylistContext = createContext();

export const playlistDefaultState = {
  loading: false,
  playlists: []
};
export const playlistReducerFunction = (state, action) => {
  switch (action.type) {
    case 'API_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'API_RESPONSE':
      return {
        ...state,
        playlists: [...action.payload],
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};

const PlaylistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    playlistReducerFunction,
    playlistDefaultState
  );
  const { token } = useAuthCtx();
  const { updateLocalStorage } = useLocalStorage();

  const deletePlaylistFunction = async (id) => {
    dispatch({ type: 'API_REQUEST' });
    const playlistArray = await deletePlaylist(id, token);
    updateLocalStorage('playlists', playlistArray);
    dispatch({ type: 'API_RESPONSE', payload: [...playlistArray] });
  };

  const addPlaylistFunction = async (item) => {
    dispatch({ type: 'API_REQUEST' });
    const playlistsArray = await addPlaylist(item, token);
    updateLocalStorage('playlists', playlistsArray);
    dispatch({ type: 'API_RESPONSE', payload: [...playlistsArray] });
  };

  useEffect(() => {
    (async () => {
      if (token) {
        dispatch({ type: 'API_REQUEST' });
        const playlistsArray = await getPlaylists(token);
        dispatch({ type: 'API_RESPONSE', payload: [...playlistsArray] });
        const datatoUpdate = JSON.parse(localStorage.getItem('userData'));
        datatoUpdate.playlists = [...playlistsArray];
        localStorage.setItem('userData', JSON.stringify(datatoUpdate));
      }
    })();
  }, [token]);

  return (
    <PlaylistContext.Provider
      value={{
        state,
        dispatch,
        deletePlaylistFunction,
        addPlaylistFunction
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylistCtx = () => useContext(PlaylistContext);

export { usePlaylistCtx, PlaylistProvider };
