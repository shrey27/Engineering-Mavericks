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
      return "You haven't liked any video";
    case 'history':
      return 'You should watch some videos';
    case 'watchlater':
      return 'You have not saved any video to watch later';
    case 'playlist':
      return 'Create a playlist or start learning';
    case 'playlistvideos':
      return 'You have not saved any video in this playlist';
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
  password: 'carljones1234'
};
