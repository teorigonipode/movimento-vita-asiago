export interface NewsPost {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
  category: 'notizia' | 'evento' | 'comunicazione';
  eventDate?: string;
  coverImage?: string;
  publishedAt: string;
  published: boolean;
}

// Esempio non pubblicato — documentazione tecnica del formato.
// published: false impedisce la visibilità pubblica.
// const example: NewsPost = {
//   slug: 'esempio-notizia',
//   title: 'Titolo di esempio',
//   excerpt: 'Breve riassunto',
//   content: 'Contenuto della notizia.',
//   category: 'notizia',
//   publishedAt: '2026-01-01',
//   published: false,
// };

export const newsPosts: NewsPost[] = [];
