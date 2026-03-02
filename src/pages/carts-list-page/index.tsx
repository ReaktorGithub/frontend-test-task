import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartsPaginationStore } from '../../store/cartsPaginationStore';
import { useCartsListQuery } from '../../queries/carts';
import { Button, Input, Select } from '../../components/controls';
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
import { EmptyText, ErrorText, Meta, Pagination, Toolbar } from './styles';

const CartsListPage = () => {
  const navigate = useNavigate();
  const { page, limit, userIdFilter, setPage, setLimit, setUserIdFilter } =
    useCartsPaginationStore();

  const skip = (page - 1) * limit;

  const { data, isLoading, isError, error, isFetching } = useCartsListQuery({ limit, skip });

  const filteredCarts = useMemo(() => {
    if (!data?.carts) {
      return [];
    }
    if (!userIdFilter.trim()) {
      return data.carts;
    }
    return data.carts.filter((cart) => String(cart.userId).includes(userIdFilter));
  }, [data?.carts, userIdFilter]);

  const totalItems = data?.total ?? 0;
  const totalPages = totalItems > 0 ? Math.ceil(totalItems / limit) : 1;

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Page>
      <PageContent>
        <PageHeader>
          <PageTitle>Carts</PageTitle>
        </PageHeader>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Carts list</CardTitle>
              <CardSubtitle>Browse and manage carts from DummyJSON API.</CardSubtitle>
            </div>
            <Toolbar>
              <label>
                <Meta>Filter by userId</Meta>
                <Input
                  type="number"
                  placeholder="Any"
                  value={userIdFilter}
                  onChange={(event) => setUserIdFilter(event.target.value)}
                />
              </label>
              <label>
                <Meta>Items per page</Meta>
                <Select value={limit} onChange={(event) => setLimit(Number(event.target.value))}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </Select>
              </label>
            </Toolbar>
          </CardHeader>

          {isLoading ? (
            <Meta>Loading carts…</Meta>
          ) : isError ? (
            <ErrorText>{(error as Error)?.message || 'Failed to load carts.'}</ErrorText>
          ) : filteredCarts.length === 0 ? (
            <EmptyText>No carts for selected criteria.</EmptyText>
          ) : (
            <>
              <Table>
                <thead>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Products count</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead />
                  </TableRow>
                </thead>
                <tbody>
                  {filteredCarts.map((cart) => (
                    <TableRow key={cart.id}>
                      <TableData>{cart.id}</TableData>
                      <TableData>{cart.userId}</TableData>
                      <TableData>{cart.totalProducts}</TableData>
                      <TableData>${cart.total.toFixed(2)}</TableData>
                      <TableData>
                        <Button
                          onClick={() => navigate(`/carts/${cart.id}`)}
                          aria-label={`Open cart ${cart.id}`}
                        >
                          Open
                        </Button>
                      </TableData>
                    </TableRow>
                  ))}
                </tbody>
              </Table>

              <CardFooter>
                <Meta>{isFetching ? 'Refreshing… ' : null}</Meta>
                <Meta>
                  Page {page} of {totalPages} · {totalItems} carts total
                </Meta>
                <Pagination>
                  <Button variant="ghost" onClick={handlePrev} disabled={page === 1}>
                    Previous
                  </Button>
                  <Button variant="ghost" onClick={handleNext} disabled={page === totalPages}>
                    Next
                  </Button>
                </Pagination>
              </CardFooter>
            </>
          )}
        </Card>
      </PageContent>
    </Page>
  );
};

export { CartsListPage };
