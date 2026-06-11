import { recipes } from "../data/recipes";

function getRandomRecipes(list, limit = 5) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, limit);
}

const ingredientFamilies = [
  ["chicken_boneless", "chicken_with_bone", "chicken_mince"],
  ["beef_boneless", "beef_with_bone", "beef_mince"],
  ["mutton_boneless", "mutton_with_bone", "mutton_mince"],
  ["basmati_rice", "sella_rice", "broken_rice"],
];

function isIngredientMatch(selectedId, recipeIngredientId) {
  if (selectedId === recipeIngredientId) return true;

  return ingredientFamilies.some(
    (family) =>
      family.includes(selectedId) && family.includes(recipeIngredientId)
  );
}

function recipeHasIngredient(recipe, selectedId) {
  return recipe.ingredients.some((recipeIngredientId) =>
    isIngredientMatch(selectedId, recipeIngredientId)
  );
}

export function getDishSuggestions(selectedIngredients = [], limit = 5) {
  if (!selectedIngredients.length) {
    return getRandomRecipes(recipes, limit);
  }

  const scoredRecipes = recipes
    .map((recipe) => {
      const matchedIngredients = selectedIngredients.filter((ingredientId) =>
        recipeHasIngredient(recipe, ingredientId)
      );

      const matchedCount = matchedIngredients.length;
      const matchRatio = matchedCount / selectedIngredients.length;

      return {
        ...recipe,
        matchedCount,
        matchRatio,
      };
    })
    .filter((recipe) => recipe.matchedCount > 0)
    .sort((a, b) => {
      if (b.matchedCount !== a.matchedCount) {
        return b.matchedCount - a.matchedCount;
      }

      if (b.matchRatio !== a.matchRatio) {
        return b.matchRatio - a.matchRatio;
      }

      return a.ingredients.length - b.ingredients.length;
    });

  if (!scoredRecipes.length) {
    return getRandomRecipes(recipes, limit);
  }

  return scoredRecipes.slice(0, limit);
}