type media = "book" | "video" | "post" | "other";
type lang = "fr" | "en";

interface IRessource {
  id?: string;
  media: media;
  title: string;
  lang: lang;
  image?: string;
  url: string;
  description?: string;
  rating: number;
  isTop: boolean;
  isValid: boolean;
  date: string;
}

export default IRessource;
