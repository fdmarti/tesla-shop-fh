import { tesloApi } from "@/api/testlaApi";
import { BASE_IMAGE_URL } from "@/const/common-urls";
import type { IProduct } from "@/types/IProducts";

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
        images: images.map(img => {
            if (img.includes('http')) return img
            return BASE_IMAGE_URL + img
        })
    }
}