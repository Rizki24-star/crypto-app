export type NewsResponse = {
  data: News[];
};

export type News = {
  title: string;
  url: string;
  excerpt: string;
  thumbnail: string;
  date: string;
  publisher: Publisher;
};

export type Publisher = {
  name: string;
  url: string;
  favicon: string;
};
