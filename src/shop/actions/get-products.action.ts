import { tesloApi } from "@/api/testlaApi"
import type { IProductsResponse } from "../types/IProductResponse"

const BASE_IMAGE_URL = import.meta.env.VITE_API_URL_IMAGES
const DEFAULT_LIMIT = 9

export interface Params {
    page: number
}

export const getProductsAction = async (params: Params): Promise<IProductsResponse> => {

    const { page } = params

    const { data } = await tesloApi.get<IProductsResponse>('/products', {
        params: {
            limit: DEFAULT_LIMIT,
            offset: (page - 1) * DEFAULT_LIMIT
        }
    })

    const { products, ...rest } = data

    return {
        ...rest,
        products: products.map(prod => {
            return {
                ...prod,
                images: prod.images.map(img => BASE_IMAGE_URL + img)
            }
        })
    }
}