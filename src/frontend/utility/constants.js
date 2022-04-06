export const videoList = Array(24).fill('back.jpg');

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
    name: 'Watched Videos',
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

export const suggestedVideos = [
  {
    _id: 'v9',
    title: 'The Journeys of Apollo',
    creator: 'The tech Guy',
    video: 'GNJpoP642wc',
    category: 'Space'
  },
  {
    _id: 'v10',
    title: 'What we found when we went looking for another Earth',
    creator: 'The tech Guy',
    video: 'lrAFaONyLtU',
    category: 'Stuff'
  },
  {
    _id: 'v11',
    title: 'How does an Escalator work?',
    creator: 'The tech Guy',
    video: '1jfNIBtfWDY',
    category: 'Stuff'
  },
  {
    _id: 'v12',
    title: 'How V8 Engines Work - A Simple Explanation',
    creator: 'The tech Guy',
    video: 'KZLygdpg3LU',
    category: 'Stuff'
  },
  {
    _id: 'v16',
    title: 'The interesting engineering behind the SHAPE of Train wheels! ',
    creator: 'The tech Guy',
    video: 'XzgryPhtc1Y',
    category: 'Physics'
  },
  {
    _id: 'v17',
    title: 'Tesla Turbine | The interesting physics behind it ',
    creator: 'The tech Guy',
    video: 'AfCyzIbpLN4',
    category: 'Physics'
  },
  {
    _id: 'v18',
    title: 'The Fastest train ever built | The complete physics of it ',
    creator: 'The tech Guy',
    video: 'XjwF-STGtfE',
    category: 'Physics'
  },
  {
    _id: 'v19',
    title: 'Internet & Telecommunication Technology',
    creator: 'The tech Guy',
    video: '0WSTtgyDz4U',
    category: 'Communication'
  },
  {
    _id: 'v20',
    title: 'How does the INTERNET work?',
    creator: 'The tech Guy',
    video: 'x3c1ih2NJEg',
    category: 'Communication'
  },
  {
    _id: 'v21',
    title: 'Understanding Electromagnetic Radiation!',
    creator: 'The tech Guy',
    video: 'FWCN_uI5ygY',
    category: 'Communication'
  },
  {
    _id: 'v22',
    title: 'The Tragic Story of Nikola Tesla',
    creator: 'The tech Guy',
    video: 'FeUA-0G1p5k',
    category: 'Scientists'
  },
  {
    _id: 'v23',
    title: 'Nikola Tesla vs Thomas Edison EPIC NEW Documentary 2015 HD',
    creator: 'The tech Guy',
    video: 'Cidg4Xfpjmc',
    category: 'Scientists'
  }
];
