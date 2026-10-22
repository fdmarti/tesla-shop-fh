import { CustomPagination } from "@/components/custom/CustomPagination"
import { useSearchURLParams } from "@/hooks/useSearchURLParams"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {

  const { getSearchURLParams } = useSearchURLParams()

  const currentPage = getSearchURLParams('page') || '1'

  const { data: productsResponse, isPending, isError } = useProducts({ page: +currentPage })

  const defaultProductResponse = productsResponse?.products || []
  const countProductResponse = productsResponse?.pages || 0

  return (
    <>
      <CustomJumbotron title="Todos los productos" />
      <ProductsGrid products={defaultProductResponse} loading={isPending} error={isError} />
      <CustomPagination totalPages={countProductResponse} />
    </>
  )
}
