import { useQuery } from "@tanstack/react-query"
import { getProductsAction, type Params } from "../actions/get-products.action"



export const useProducts = (params: Params) => {
    const { page } = params

    return useQuery({
        queryKey: ['product-list', page],
        queryFn: () => getProductsAction(params),
        staleTime: 1000 * 60 * 5
    })
}