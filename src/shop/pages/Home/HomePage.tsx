import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {
  const { data: productsResponse, isPending, isError } = useProducts()

  const defaultProductResponse = productsResponse?.products || []
  const pagesProductResponse = productsResponse?.pages || 0
  const countProductResponse = productsResponse?.count || 0

  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductsGrid products={defaultProductResponse} countProducts={countProductResponse} loading={isPending} error={isError} />
      <CustomPagination totalPages={pagesProductResponse} />
    </>
  )
}
