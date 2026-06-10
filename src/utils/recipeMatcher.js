import { recipes } from "../data/recipes";

export function getMatchedRecipes(selectedIngredients = []) {
  if (!selectedIngredients.length) {
    return getRandomRecipes(recipes, 3);
  }

  const strictMatches = recipes.filter((recipe) =>
    selectedIngredients.every((ingredientId) =>
      recipe.ingredients.includes(ingredientId)
    )
  );

  return strictMatches.slice(0, 3);
}

function getRandomRecipes(list, limit) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, limit);
}