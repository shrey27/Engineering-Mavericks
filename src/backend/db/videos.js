/**
 * Videos Database can be added here.
 * You can add videos of your wish with different attributes
 * */
import { v4 as uuid } from 'uuid';
export const videos = [
  {
    _id: 'v1',
    viewCount: 1,
    comments: [
      {
        _id: uuid(),
        comment: 'Video is knowledge intensive and highly intuitive'
      },
      { _id: uuid(), comment: 'Animation is great and content is awesome.' }
    ],
    videoDate: '1572615545',
    title: 'How does Thyristors work? ',
    creator: 'The tech Guy',
    video: '0AgPUikpvpM',
    category: 'Electrical',
    description:
      'Do you know that a semiconductor device called a ‘thyristor’ solves the huge issue of power transfer from a generating station to consumers located far away? Traditional AC power transmissions face huge power losses and also suffer from the issue of stability and controllability. '
  },
  {
    _id: 'v2',
    viewCount: 0,
    comments: [],
    videoDate: '1506865145',
    title: 'How does Inverters work? ',
    creator: 'The tech Guy',
    video: 'qVeERT4nyz8',
    category: 'Electrical',
    description:
      'Inverters have taken a prominent role in the modern technological world due to the sudden rise of electric cars and renewable energy technologies. Inverters convert DC power  to AC power. They are also used in Uninterruptible Power Supplies, Control of Electrical Machines and Active Power filtering.'
  },
  {
    _id: 'v3',
    viewCount: 0,
    comments: [],
    videoDate: '1614605945',
    title: "MCB's, how do they work?",
    creator: 'The tech Guy',
    video: 'Unh99Qn7CmI',
    category: 'Electrical',
    description:
      'Take close look about Miniature Circuit Breaker, how does it work. What happens when overload current causes tripping, basic parts of MCB and types of Miniature Circuit Breaker.'
  },
  {
    _id: 'v4',
    viewCount: 0,
    comments: [],
    videoDate: '1512135545',
    title: 'How Clutch works ?',
    video: 'devo3kdSPQY',
    creator: 'The tech Guy',
    category: 'Automobiles',
    description:
      'Have you ever wondered what is happening inside a car when you press the clutch pedal? Or why do you need to press the clutch pedal before you shift gears in a manual transmission car? This video gives you logical answers to these questions.'
  },
  {
    _id: 'v5',
    viewCount: 0,
    comments: [],
    videoDate: '1643722745',
    title: 'Interesting concept behind your car window',
    creator: 'The tech Guy',
    video: 'rYYppUNSSE8',
    category: 'Automobiles',
    description:
      'Are you amazed at how easily you can raise and lower your car windows by just pressing a button? The mechanism inside your car window is so compact and smart that the window always moves straight and smooth. Also, you might have noticed that you’re not able to move the window even if you try to push it down or pull it up manually. Let’s understand the tricky mechanism that controls your car window.'
  },
  {
    _id: 'v6',
    viewCount: 0,
    comments: [],
    videoDate: '1606829945',
    title: "Tesla Model 3's Motor",
    creator: 'The tech Guy',
    video: 'esUb7Zy5Oio',
    category: 'Automobiles',
    description:
      "The engineers of Tesla motor's shocked everyone when they abandoned the versatile induction motor in Model 3 cars. They used a totally different motor called IPM-SynRM. Let's understand why the Tesla engineers made this crucial design change."
  },
  {
    _id: 'v7',
    viewCount: 0,
    comments: [],
    videoDate: '1435757945',
    title: 'How It works: The International Space Station',
    creator: 'The tech Guy',
    video: 'SGP6Y0Pnhe4',
    category: 'Space',
    description:
      'This video explains each interior area, crew living quarters, and scientific equipment, working inside ISS.'
  },
  {
    _id: 'v8',
    viewCount: 0,
    comments: [],
    videoDate: '1409578745',
    title: "NASA Space Shuttle's Final Voyage of Atlantis",
    creator: 'The tech Guy',
    video: 'xhcwrF7hmjE',
    category: 'Space',
    description:
      "The final operation countdown showing ignition, inside the cockpit, and crew activities of NASA Space Shuttle's Final Voyage of Atlantis"
  },
  {
    _id: 'v9',
    viewCount: 0,
    comments: [],
    videoDate: '1405517945',
    title: 'The Journeys of Apollo',
    creator: 'The tech Guy',
    video: 'GNJpoP642wc',
    category: 'Space',
    description:
      "The Journeys of Apollo is a previously produced documentary narrated by Actor Peter Cullen that relives the 40th Apollo Anniversary and mission to explore Earth's neighbor, the Moon."
  },
  {
    _id: 'v10',
    viewCount: 0,
    comments: [],
    videoDate: '1641044345',
    title: 'What we found when we went looking for another Earth',
    creator: 'The tech Guy',
    video: 'lrAFaONyLtU',
    category: 'Stuff',
    description:
      'In the last few years, scientists have discovered thousands of exoplanets - and a lot of them are surprisingly weird.'
  },
  {
    _id: 'v11',
    viewCount: 0,
    comments: [],
    videoDate: '1572615545',
    title: 'How does an Escalator work?',
    creator: 'The tech Guy',
    video: '1jfNIBtfWDY',
    category: 'Stuff',
    description:
      'We use it all the time but most people have never actually seen the inner workings of an escalator!'
  },
  {
    _id: 'v12',
    viewCount: 0,
    comments: [],
    videoDate: '1522589945',
    title: 'How V8 Engines Work - A Simple Explanation',
    creator: 'The tech Guy',
    video: 'KZLygdpg3LU',
    category: 'Stuff',
    description:
      'V8 engines operates under the same basic principles as any other gasoline four-stroke engine. First the piston pulls in air and fuel as it moves downward, then it compresses that air and fuel as the piston moves upward. A spark plug fires, igniting the air/fuel mixture and forcing the piston downward. Finally the piston pushes out the exhaust gases on its way back up, before for the cycle repeats itself. '
  },
  {
    _id: 'v13',
    viewCount: 0,
    comments: [],
    videoDate: '1643722745',
    title:
      'Scientists Terrifying New Discovery Under Sahara Desert Changes Everything! ',
    creator: 'The tech Guy',
    video: 'E-SH9XVU4s8',
    category: 'Science',
    description:
      'This is the map of Africa. If you look to the South, you will see lush vegetation, with lots of greenery. However, when you go north, things are different. Covering multiple countries, it is the most gigantic desert globally, with miles and miles of dune formation. Altogether, the Sahara Desert covers 9 million square kilometers, meaning it will swallow Spain 18 times! However, did you know that this vast stretch of sterile sand covering a third of the African continent was covered in lush vegetation thousands of years ago? What happened to the Sahara? And what is happening to it right now?'
  },
  {
    _id: 'v14',
    viewCount: 0,
    comments: [],
    videoDate: '1603201145',
    title: "15 Oldest Technologies That Scientists Can't Explain",
    creator: 'The tech Guy',
    video: 'a0pjDDGvtCc',
    category: 'Science',
    description:
      'We often believe modern society to be the zenith of humanity thus far, incorrectly perceiving ‘technology’ as a modern craft. But some societies of the past were actually significantly more creative than we ever give them credit for. Not only did they craft technology we still use today but sometimes they designed things that we still don’t fully understand! These are the oldest technologies that scientists can’t explain!'
  },
  {
    _id: 'v15',
    viewCount: 0,
    comments: [],
    videoDate: '1599313145',
    title: 'Survivor Says Something New About the Bermuda Triangle Mystery ',
    creator: 'The tech Guy',
    video: '-FuJ5mOV6Vg',
    category: 'Science',
    description:
      "Why do ships and planes vanish without a trace in the Bermuda Triangle? If you draw up a map, trace a line connecting the island of Bermuda, Puerto Rico, Miami, and back to Bermuda, what do you get?  Yes, it’s a triangle – a sinister polygon known for mysteriously swallowing over 2,000 ships and 200 aircraft over centuries! And here's a story about the Bermuda Triangle you probably didn’t hear about. "
  },
  {
    _id: 'v16',
    viewCount: 0,
    comments: [],
    videoDate: '1640785145',
    title: 'The interesting engineering behind the SHAPE of Train wheels! ',
    creator: 'The tech Guy',
    video: 'XzgryPhtc1Y',
    category: 'Physics',
    description:
      "Have you ever wondered why the train wheel shape is conical, not straight. Let's explore this simple, but genius invention in detail."
  },
  {
    _id: 'v17',
    viewCount: 0,
    comments: [],
    videoDate: '1622727545',
    title: 'Tesla Turbine | The interesting physics behind it ',
    creator: 'The tech Guy',
    video: 'AfCyzIbpLN4',
    category: 'Physics',
    description:
      'The maverick engineer Nikola Tesla made his contribution in the mechanical engineering field too. Look at one of his favorite inventions — a bladeless turbine, or Tesla Turbine. The Tesla turbine had a simple, unique design, yet it was able to beat the efficiency levels of steam turbines at that time. Normal turbines are complex in design, with blades of complicated geometry and stator parts. Nikola Tesla once said the Tesla turbine is his favorite invention and he even claimed an efficiency level of 97% for this turbine. '
  },
  {
    _id: 'v18',
    viewCount: 0,
    comments: [],
    videoDate: '1623850745',
    title: 'The Fastest train ever built | The complete physics of it ',
    creator: 'The tech Guy',
    video: 'XjwF-STGtfE',
    category: 'Physics',
    description:
      'Magnetically levitated trains are common nowadays. However, the MagLev train the Central Japan Railway Company developed is quite unique and superior to the other trains. Running at more than 600 km per hour, it has achieved the status of ‘fastest train.’ This train uses superconducting magnets, which is why it is called SC MagLev. Once charged with an exciting current, the superconducting magnets of this train produce a circulating DC current and strong magnetic field forever, with zero loss.'
  },
  {
    _id: 'v19',
    viewCount: 0,
    comments: [],
    videoDate: '1569937145',
    title: 'Internet & Telecommunication Technology',
    creator: 'The tech Guy',
    video: '0WSTtgyDz4U',
    category: 'Communication',
    description:
      'Internet & Telecommunication technology has become an integral part of human lives.  In this video series we will provide you, well detailed content required to become a telecommunication engineer. We welcome you to the video series of internet and telecommunication technology.'
  },
  {
    _id: 'v20',
    viewCount: 0,
    comments: [],
    videoDate: '1559137145',
    title: 'How does the INTERNET work?',
    creator: 'The tech Guy',
    video: 'x3c1ih2NJEg',
    category: 'Communication',
    description:
      'How does the Internet work? The video you are watching now traveled thousands of miles from a Google data center to reach you. Let’s learn how the Internet works by getting to understand the details of this data’s incredible journey.'
  },
  {
    _id: 'v21',
    viewCount: 0,
    comments: [],
    videoDate: '1569245945',
    title: 'Understanding Electromagnetic Radiation!',
    creator: 'The tech Guy',
    video: 'FWCN_uI5ygY',
    category: 'Communication',
    description:
      'In the modern world, we humans are completely surrounded by electromagnetic radiation. Have you ever thought of the physics behind these travelling electromagnetic waves? Lets explore the physics behind the radiation in this video.'
  },
  {
    _id: 'v22',
    viewCount: 0,
    comments: [],
    videoDate: '1593610745',
    title: 'The Tragic Story of Nikola Tesla',
    creator: 'The tech Guy',
    video: 'FeUA-0G1p5k',
    category: 'Scientists',
    description: ''
  },
  {
    _id: 'v23',
    viewCount: 0,
    comments: [],
    videoDate: '1535809145',
    title: 'Nikola Tesla vs Thomas Edison EPIC NEW Documentary',
    creator: 'The tech Guy',
    video: 'Cidg4Xfpjmc',
    category: 'Scientists',
    description: 'Why one of the greatest inventors of all time died penniless.'
  },
  {
    _id: 'v24',
    viewCount: 0,
    comments: [],
    videoDate: '1613914745',
    title: 'BBC: Inside Einsteins Mind (Science Documentary )',
    creator: 'The tech Guy',
    video: '5WyAd9QX7pc',
    category: 'Scientists',
    description:
      "The story of the most elegant and powerful theory in science - Albert Einstein's general relativity. When Einstein presented his formidable theory in November 1915, it turned our understanding of gravity, space and time completely on its head. "
  }
];
