import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    cid: 'C1',
    categoryName: 'Electrical Science',
    description:
      "From a battery operated mobile to power generation plant, let's dive into the world of electrical engineering",
    source: 'electrical'
  },
  {
    _id: uuid(),
    cid: 'C2',
    categoryName: 'Mechanics behind Automobiles',
    description:
      "You like tesla or Ferrari, but what's working behind the hoods of these glamourous vehicles",
    source: 'automobile'
  },
  {
    _id: uuid(),
    cid: 'C3',
    categoryName: "What's out There ?",
    description:
      "Have you seen Interstellar ?, but don't know what actually happens out there in space. Let's explore some of the unfathomable facts about our universe",
    source: 'space'
  },
  {
    _id: uuid(),
    cid: 'C4',
    categoryName: 'How Stuff Works ?',
    description:
      "Ever wondered how internet works or what's the difference between an LED and LCD. Well then, let's start learning about the day-to-day stuff that surrounds us",
    source: 'stuff'
  }
];
