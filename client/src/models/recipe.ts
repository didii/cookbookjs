export interface Recipe {
  id: string;
  name: string;
  description?: string;
  ingredients: { text: string; }[];
  steps: { text: string; }[];
}
