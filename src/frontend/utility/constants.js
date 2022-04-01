export const videoList = Array(24).fill('back.jpg');
export const categoryList = [
  'All',
  'Electrical',
  'Automobiles',
  'Space',
  'Stuff',
  'Science',
  'Physics',
  'Communication',
  'Scientists'
];

export const navlinks = [
  {
    id: 'N1',
    name: 'Videos',
    path: '/videoListing',
    class: 'fa-solid fa-video'
  },
  {
    id: 'N2',
    name: 'Liked Videos',
    path: '/liked',
    class: 'fa-regular fa-thumbs-up'
  },
  {
    id: 'N3',
    name: 'Recently Watched',
    path: '/history',
    class: 'fa-solid fa-clock-rotate-left'
  },
  {
    id: 'N4',
    name: 'Saved for Later',
    path: '/watchlater',
    class: 'fa-solid fa-clock'
  },
  {
    id: 'N5',
    name: 'Playlists',
    path: '/playlists',
    class: 'fa-solid fa-arrow-down-short-wide'
  }
];

export const emptyStatments = (keyValue) => {
  switch (keyValue) {
    case 'like':
      return 'You have not liked any videos';
    case 'history':
      return 'You should watch some videos';
    case 'watchlater':
      return 'No videos found to watch later';
    case 'playlist':
      return 'No Playlist found';
    case 'playlistvideos':
      return 'Your playlist is empty';
    default:
      return 'This folder is empty';
  }
};

export const testCredentials = {
  username: 'Shrey Pandey',
  email: 'shreyp@gmail.com',
  password: 'shreypandey',
  confirmpassword: 'shreypandey'
};

export const loginCredentials = {
  email: 'carljones1234@gmail.com',
  password: 'carljones1234',
  username: 'Carl Jones'
};
