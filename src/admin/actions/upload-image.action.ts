import { tesloApi } from "@/api/testlaApi";
import type { IImageResponse } from "../types/IImageResponse";

export const uploadImageAction = async (images: File[]): Promise<string[]> => {

    const uploadPromises = images.map(async file => {
        const formData = new FormData()
        formData.append('file', file)

        const { data } = await tesloApi<IImageResponse>('/files/product', {
            method: 'POST',
            data: formData
        })

        return data.fileName
    })


    const uploadedFileName = await Promise.all(uploadPromises)
    return uploadedFileName
}