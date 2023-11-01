import { Article } from "@/types";

interface EditorPickArticle extends Article {
  isEditorsPick: boolean;
}

const filterEditorsPick = (articles: Article[]): EditorPickArticle[] => {
  const editorsPickArticles: EditorPickArticle[] = articles.filter(
    (article) => article.isEditorsPick === true
  );
  return editorsPickArticles;
};

export default filterEditorsPick;
