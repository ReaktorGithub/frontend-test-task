import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCartQuery, useUpdateCartMutation } from '../../queries/carts';
import { Button, Input } from '../../components/controls';
import {
  Card,
  CardFooter,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Page,
  PageContent,
  PageHeader,
  PageTitle,
} from '../../components/layout';
import { Table, TableRow, TableData, TableHead } from '../../components/table';
import type { EditableProduct } from './types';
import { ErrorText, HeaderActions, Meta } from './styles';

const CartDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const cartId = params.id ? Number(params.id) : undefined;

  const { data, isLoading, isError, error, isFetching } = useCartQuery(cartId);
  const updateCart = useUpdateCartMutation();

  const [productsDraft, setProductsDraft] = useState<EditableProduct[] | null>(null);

  const products = useMemo<EditableProduct[]>(() => {
    if (productsDraft) {
      return productsDraft;
    }
    if (!data?.products) {
      return [];
    }
    return data.products.map((p) => ({ ...p }));
  }, [data?.products, productsDraft]);

  const totals = useMemo(() => {
    const active = products.filter((p) => !p.removed);
    const total = active.reduce((acc, p) => acc + p.price * p.quantity, 0);
    const totalProducts = active.length;
    const totalQuantity = active.reduce((acc, p) => acc + p.quantity, 0);
    return { total, totalProducts, totalQuantity };
  }, [products]);

  const handleQuantityChange = (productId: number, value: string) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric) || numeric < 0) return;

    setProductsDraft((prev) => {
      const base = prev ?? data?.products ?? [];
      return base.map((product) =>
        product.id === productId
          ? {
              ...product,
              quantity: numeric,
              total: product.price * numeric,
            }
          : product,
      );
    });
  };

  const handleRemoveProduct = (productId: number) => {
    setProductsDraft((prev) => {
      const base: EditableProduct[] = (prev ?? data?.products ?? []).map((p) => ({ ...p }));
      return base.map((product) =>
        product.id === productId ? { ...product, removed: true, quantity: 0, total: 0 } : product,
      );
    });
  };

  const handleReset = () => {
    setProductsDraft(null);
  };

  const handleSave = () => {
    if (!data || !cartId) return;
    const active = products.filter((p) => !p.removed && p.quantity > 0);
    const payload = {
      merge: false,
      products: active.map((p) => ({ id: p.id, quantity: p.quantity })),
    };
    updateCart.mutate({ id: cartId, payload });
  };

  const canSave = useMemo(() => {
    if (!data) return false;
    const original = data.products;
    const draft = products.filter((p) => !p.removed && p.quantity > 0);
    if (draft.length !== original.length) return true;
    return draft.some((p) => {
      const originalProduct = original.find((op) => op.id === p.id);
      return !originalProduct || originalProduct.quantity !== p.quantity;
    });
  }, [data, products]);

  return (
    <Page>
      <PageContent>
        <PageHeader>
          <PageTitle>Cart details</PageTitle>
          <HeaderActions>
            <Button variant="ghost" onClick={() => navigate(-1)}>
              Back
            </Button>
          </HeaderActions>
        </PageHeader>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Cart #{cartId}</CardTitle>
              {data && (
                <CardSubtitle>
                  User ID {data.userId} · {totals.totalProducts} products · {totals.totalQuantity}{' '}
                  items
                </CardSubtitle>
              )}
            </div>
            <HeaderActions>
              <Button variant="ghost" onClick={handleReset} disabled={!productsDraft}>
                Reset
              </Button>
              <Button onClick={handleSave} disabled={!canSave || updateCart.isPending}>
                {updateCart.isPending ? 'Saving…' : 'Save changes'}
              </Button>
            </HeaderActions>
          </CardHeader>

          {isLoading ? (
            <Meta>Loading cart…</Meta>
          ) : isError ? (
            <ErrorText>{(error as Error)?.message || 'Failed to load cart.'}</ErrorText>
          ) : !data ? (
            <ErrorText>Cart not found.</ErrorText>
          ) : (
            <>
              {updateCart.isError ? (
                <ErrorText>Failed to update cart. Please try again.</ErrorText>
              ) : null}
              {updateCart.isSuccess ? <Meta>Cart successfully updated.</Meta> : null}
              {isFetching ? <Meta>Refreshing…</Meta> : null}

              <Table>
                <thead>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead />
                  </TableRow>
                </thead>
                <tbody>
                  {products
                    .filter((p) => !p.removed)
                    .map((product) => (
                      <TableRow key={product.id}>
                        <TableData>{product.title}</TableData>
                        <TableData>${product.price.toFixed(2)}</TableData>
                        <TableData>
                          <Input
                            type="number"
                            min={0}
                            value={product.quantity}
                            onChange={(event) =>
                              handleQuantityChange(product.id, event.target.value)
                            }
                          />
                        </TableData>
                        <TableData>${(product.price * product.quantity).toFixed(2)}</TableData>
                        <TableData>
                          <Button variant="ghost" onClick={() => handleRemoveProduct(product.id)}>
                            Remove
                          </Button>
                        </TableData>
                      </TableRow>
                    ))}
                </tbody>
              </Table>

              <CardFooter>
                <Meta style={{ marginRight: 'auto' }}>
                  Products: {totals.totalProducts} · Items: {totals.totalQuantity}
                </Meta>
                <Meta>Total: ${totals.total.toFixed(2)}</Meta>
              </CardFooter>
            </>
          )}
        </Card>
      </PageContent>
    </Page>
  );
};

export { CartDetailsPage };
