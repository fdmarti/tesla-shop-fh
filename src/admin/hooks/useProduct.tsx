import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getProductBySlugAction } from "../actions/get-product-by-slug.action"
import type { IProduct } from "@/types/IProducts"
import { createUpdateProductAction } from "../actions/create-update-product.action"
import { useNavigate } from "react-router"
import { useToast } from "@/hooks/useToast"

export const useProduct = (slug: string) => {

    const navigate = useNavigate()
    const { showToast } = useToast()

    const queryClient = useQueryClient()

    const query = useQuery({
        queryKey: ['product', { slug }],
        queryFn: () => getProductBySlugAction(slug),
        retry: false,
        staleTime: 1000 * 60 * 5,
        enabled: !!slug
    })

    const productMutation = useMutation({
        mutationFn: createUpdateProductAction,
        mutationKey: ['create-update-product'],
        onSuccess: (productCreated) => {

            queryClient.invalidateQueries({ queryKey: ['product-list'] })
            queryClient.invalidateQueries({ queryKey: ['product'] })

            showToast('Producto Guardado', 'success')
            return navigate('/admin/products/' + productCreated.slug)
        },
        onError: (err) => {
            console.error(err)
            showToast('Ocurrio un error al guardar el producto', 'success')
        }
    })

    const onHandleSubmitForm = async (productLike: Partial<IProduct> & { files?: File[] }) => {
        productMutation.mutate(productLike)
    }

    return {
        ...query,
        productMutation,
        onHandleSubmitForm
    }
}
