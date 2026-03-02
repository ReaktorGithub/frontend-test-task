import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCart, fetchCarts, updateCart } from '../api/carts';
import type { Cart, CartsListResponse, FetchCardParams, UpdateCartPayload } from '../api/types';

const cartsKeys = {
  all: ['carts'] as const,
  list: (params: FetchCardParams) => [...cartsKeys.all, 'list', params] as const,
  details: (id: number) => [...cartsKeys.all, 'detail', id] as const,
};

export const useCartsListQuery = (params: FetchCardParams) =>
  useQuery<CartsListResponse>({
    queryKey: cartsKeys.list(params),
    queryFn: () => fetchCarts(params),
    staleTime: 1000 * 30,
  });

export const useCartQuery = (id: number | undefined) =>
  useQuery<Cart>({
    enabled: typeof id === 'number',
    queryKey: cartsKeys.details(id ?? 0),
    queryFn: () => fetchCart(id!),
  });

export const useUpdateCartMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateCartPayload }) =>
      updateCart(id, payload),
    onSuccess: (data) => {
      queryClient.setQueryData<Cart>(cartsKeys.details(data.id), data);
      void queryClient.invalidateQueries({ queryKey: cartsKeys.all });
    },
  });
};
