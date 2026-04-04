/* Copyright (c) 2026, Yao Zeran
 * 
 * The home page's context */


"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { Book } from "@/types/book";


const sampleBooks: Book[] = [
  {
    id: 1,
    coverImage: '/sample/cover/dune-cover.jpg',
    title: 'Dune',
    authorId: 1,
    authorName: 'Frank Herbert',
    publisherId: 1,
    publisherName: 'Chilton Books',
    publishDate: '1965-08-01',
    paperPrice: 18.99,
    digitalPrice: 14.99,
    isSoldOut: false,
    description:
      `
      Set in the distant future amidst a feudal interstellar society in which various noble houses control planetary fiefs.
      Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis.
      While the planet is an inhospitable and sparsely populated desert wasteland, it is the only source of melange, or "the spice", a drug that extends life and enhances mental abilities.
      `
  },
  {
    id: 2,
    coverImage: '/sample/cover/eminence-in-shadow-cover.jpg',
    title: 'The Eminence in Shadow',
    authorId: 2,
    authorName: 'Daisuke Aizawa',
    publisherId: 2,
    publisherName: 'Enterbrain',
    publishDate: '2018-11-05',
    paperPrice: 14.99,
    digitalPrice: 9.99,
    isSoldOut: false,
    description:
      `
      Great accomplishments and immense power mean nothing to the men and women who pull the strings of society from the shadows.
      That is a truth that Cid Kagenou has come to understand.
      In his past life, he was an ordinary, if slightly unhinged, Japanese student who trained his body to superhuman levels in hopes of becoming a hero.
      But, after a fatal encounter with a truck, he is reborn in a world of magic.
      `,
  },
  {
    id: 3,
    coverImage: '/sample/cover/solo-leveling-cover.jpg',
    title: 'Solo Leveling',
    authorId: 3,
    authorName: 'Chugong',
    publisherId: 3,
    publisherName: 'D&C Media',
    publishDate: '2018-07-26',
    paperPrice: 24.99,
    digitalPrice: 19.99,
    isSoldOut: false,
    description:
      `
      In a world where hunters — human warriors who possess supernatural abilities — must battle deadly monsters to protect the human race from certain annihilation.
      A notoriously weak hunter named Sung Jinwoo finds himself in a seemingly endless struggle for survival.
      After narrowly surviving an overwhelmingly powerful double dungeon that nearly wipes out his entire party, a mysterious program called the System chooses him as its sole player.
      In turn, it gives him the extremely rare ability to level up in strength, possibly beyond any known limits.
      Jinwoo then decides to use this new power to become the strongest hunter in the world.
      `,
  },
  {
    id: 4,
    coverImage: '/sample/cover/spice-and-wolf-cover.jpg',
    title: 'Spice and Wolf',
    authorId: 4,
    authorName: 'Isuna Hasekura',
    publisherId: 4,
    publisherName: 'ASCII Media Works',
    publishDate: '2006-02-10',
    paperPrice: 12.99,
    digitalPrice: 8.99,
    isSoldOut: true,
    description:
      `
      The story revolves around Kraft Lawrence, a 25-year-old traveling merchant who peddles various goods from town to town to make a living in a stylized, fictional world with a historical setting with European influences.
      His main goal in life is to gather enough money to start his own shop, and he has already been traveling for seven years while gaining experience in the trade.
      One night when stopped at the town of Pasloe, he finds in his wagon a pagan wolf-deity girl named Holo who is over 600 years old.
      `,
  },
];


interface HomeContext {
  books: Book[];
}
const HomeContext = createContext<HomeContext | null>(null);


interface HomeProviderProps {
  children: ReactNode;
}
const HomeProvider = ({ 
  children 
}: Readonly<HomeProviderProps>) => {
  const [books] = useState<Book[]>(sampleBooks);

  return (
    <HomeContext.Provider value={{ books }}>
      {children}
    </HomeContext.Provider>
  );
};


const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};


export { useHomeContext };
export default HomeProvider;
