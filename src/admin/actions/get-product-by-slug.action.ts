import { tesloApi } from "@/api/testlaApi";
import type { IProduct } from "@/types/IProducts";

const BASE_IMAGE_URL = import.meta.env.VITE_API_URL_IMAGES

export const getProductBySlugAction = async (slug: string): Promise<IProduct> => {
    if (!slug) throw new Error('Slug or ID is required')

    if (slug === 'new') {
        return {
            id: 'new',
            title: '',
            price: 0,
            description: '',
            gender: 'men',
            images: [],
            sizes: [],
            slug: '',
            stock: 0,
            tags: [],
        } as unknown as IProduct
    }

    const { data } = await tesloApi.get<IProduct>(`/products/${slug}`)

    const { images, ...rest } = data

    return {
        ...rest,
        images: images.map(img => BASE_IMAGE_URL + img)
    }
}