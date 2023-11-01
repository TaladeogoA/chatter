import { Article, Category } from "@/types";

export const filterAndSortArticles = (
  articles: Article[],
  categories: Category[]
) => {
  if (!articles || !categories) return [];

  const sorted = categories.map((category) => {
    const categoryArticles = articles.filter(
      (article) => article.category === category.name
    );

    const top3Articles = categoryArticles
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);

    return {
      category: category.name,
      description: category.description,
      articles: top3Articles,
      relatedCategories: category.relatedCategories,
    };
  });

  return sorted;
};
