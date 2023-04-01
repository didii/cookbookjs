export interface RecipeModel {
  name: string;
  description?: string;
  ingredients: { text: string; }[];
  steps: { text: string; }[];
}
