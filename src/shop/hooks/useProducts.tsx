import { useQuery } from "@tanstack/react-query"
import { getProductsAction, type Params } from "../actions/get-products.action"
import { useSearchURLParams } from "@/hooks/useSearchURLParams"
import { useParams } from "react-router"

export const useProducts = () => {
    const { getSearchURLParams } = useSearchURLParams()

    const { gender } = useParams()

    const currentPage = getSearchURLParams('page') || '1'
    const currentSize = getSearchURLParams('sizes')
    const currentPrice = getSearchURLParams('price') || 'any'
    const querySearch = getSearchURLParams('q') || undefined

    const params: Params = { page: +currentPage, gender, sizes: currentSize, price: currentPrice, query: querySearch }

    return useQuery({
        queryKey: ['product-list', params],
        queryFn: () => getProductsAction(params),
        staleTime: 1000 * 60 * 5
    })
}