import { useQuery } from "@tanstack/react-query"
import { getProductBySlugAction } from "../actions/get-product-by-slug.action"

export const useProduct = (slug: string) => {

    const query = useQuery({
        queryKey: ['product', { slug }],
        queryFn: () => getProductBySlugAction(slug),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!slug
    })

    return {
        ...query
    }
}
