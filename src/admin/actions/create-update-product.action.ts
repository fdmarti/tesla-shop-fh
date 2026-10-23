import { tesloApi } from "@/api/testlaApi";
import { BASE_IMAGE_URL } from "@/const/common-urls";
import { sleep } from "@/lib/sleep";
import type { IProduct } from "@/types/IProducts";
import { uploadImageAction } from "./upload-image.action";

export const createUpdateProductAction = async (productLike: Partial<IProduct> & { files?: File[] }): Promise<IProduct> => {

    await sleep(1500)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, user, images = [], files = [], ...rest } = productLike

    const isCreating = id === 'new'

    rest.stock = Number(rest.stock || 0)
    rest.price = Number(rest.price || 0)



    if (files.length > 0) {
        const newImagesName = await uploadImageAction(files)
        images.push(...newImagesName)
    }

    const { data } = await tesloApi<IProduct>({
        method: isCreating ? 'POST' : 'PATCH',
        url: isCreating ? '/products' : '/products/' + id,
        data: {
            ...rest,
            images
        }
    })

    const { images: imagesSaved, ...restProductSaved } = data

    return {
        ...restProductSaved,
        images: imagesSaved.map(img => {
            if (img.includes('http')) return img
            return BASE_IMAGE_URL + img
        })
    }
}