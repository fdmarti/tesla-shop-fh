import { tesloApi } from "@/api/testlaApi"
import type { IProductsResponse } from "../types/IProductResponse"
import { BASE_IMAGE_URL } from "@/const/common-urls"

const DEFAULT_LIMIT = 9

export interface Params {
    page?: number
    gender?: string,
    sizes?: string,
    price?: string
    query?: string
}

export const getProductsAction = async (params: Params): Promise<IProductsResponse> => {

    const { page = 1, gender = '', sizes = '', price = 'any', query = '' } = params

    const priceValues = buildPriceParams(price)

    const { data } = await tesloApi.get<IProductsResponse>('/products', {
        params: {
            q: query,
            limit: DEFAULT_LIMIT,
            offset: (page - 1) * DEFAULT_LIMIT,
            gender,
            sizes,
            ...priceValues
        }
    })

    const { products, ...rest } = data

    return {
        ...rest,
        products: products.map(prod => {
            return {
                ...prod,
                images: prod.images.map(img => {
                    if (img.includes('http')) return img
                    return BASE_IMAGE_URL + img
                })
            }
        })
    }
}

const buildPriceParams = (price: string) => {
    let minPrice = undefined
    let maxPrice = undefined

    switch (price) {
        case 'any':
            break;
        case '0-50':
            minPrice = 0
            maxPrice = 50
            break;
        case '50-100':
            minPrice = 50
            maxPrice = 100
            break;
        case '100-200':
            minPrice = 100
            maxPrice = 200
            break;
        case '200+':
            minPrice = 200
            maxPrice = undefined
            break;
        default:
            break;
    }

    return { minPrice, maxPrice }
}