import { tesloApi } from "@/api/testlaApi"
import { LOCAL_STORAGE_SESSION } from "@/const/local-storage"
import type { IAuthResponse } from "../types/IAuthResponse"

export const checkAuthAction = async (): Promise<IAuthResponse> => {
    const token = localStorage.getItem(LOCAL_STORAGE_SESSION)

    if (!token) throw new Error('No token found');

    try {
        const { data } = await tesloApi.get<IAuthResponse>('/auth/check-status')

        localStorage.setItem(LOCAL_STORAGE_SESSION, data.token)
        return data
    } catch (error) {
        console.error(error)
        localStorage.removeItem(LOCAL_STORAGE_SESSION)
        throw new Error('Token expired or not valid', { cause: error })
    }
}