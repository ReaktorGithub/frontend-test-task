export type CartProduct = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
};

export type Cart = {
  id: number;
  userId: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  totalProducts: number;
  totalQuantity: number;
};

export type CartsListResponse = {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
};

export type UpdateCardProduct = {
  id: number;
  quantity: number;
};

export type UpdateCartPayload = {
  merge: boolean;
  products: UpdateCardProduct[];
};

export type FetchCardParams = {
  limit: number;
  skip: number;
};
