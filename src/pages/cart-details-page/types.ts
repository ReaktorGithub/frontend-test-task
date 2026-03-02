export type EditableProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  removed?: boolean;
};
