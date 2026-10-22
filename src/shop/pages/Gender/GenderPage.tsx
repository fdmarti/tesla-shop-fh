import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron } from "@/shop/components/CustomJumbotron"
import { ProductsGrid } from "@/shop/components/ProductsGrid"
import { useProducts } from "@/shop/hooks/useProducts"
import { useParams } from "react-router"

export const GenderPage = () => {

  const { gender } = useParams()

  const genderLabel = () => {
    switch (gender) {
      case 'men':
        return 'Productos para Hombre'
      case 'women':
        return 'Productos para Mujer'
      case 'kids':
        return 'Productos para Niños'
      default:
        return 'Todos los productos'
    }
  }

  const { data: productsResponse, isPending, isError } = useProducts()

  const defaultProductResponse = productsResponse?.products || []
  const countProductResponse = productsResponse?.pages || 0

  return (
    <>
      <CustomJumbotron title={genderLabel()} />
      <ProductsGrid products={defaultProductResponse} loading={isPending} error={isError} />
      <CustomPagination totalPages={countProductResponse} />
    </>
  )
}
