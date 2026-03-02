import type { Cart, CartsListResponse, FetchCardParams, UpdateCartPayload } from './types';

const BASE_URL = import.meta.env.VITE_API_URI;

export const fetchCarts = async (params: FetchCardParams): Promise<CartsListResponse> => {
  const url = new URL(`${BASE_URL}/carts`);
  url.searchParams.set('limit', String(params.limit));
  url.searchParams.set('skip', String(params.skip));

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch carts');
  }

  return response.json();
};

export const fetchCart = async (id: number): Promise<Cart> => {
  const response = await fetch(`${BASE_URL}/carts/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }

  return response.json();
};

export const updateCart = async (id: number, payload: UpdateCartPayload): Promise<Cart> => {
  const response = await fetch(`${BASE_URL}/carts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to update cart');
  }

  return response.json();
};
