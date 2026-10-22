import { tesloApi } from "@/api/testlaApi"
import type { IAuthResponse } from "../types/IAuthResponse"

export const loginAction = async (email: string, password: string): Promise<IAuthResponse> => {
    try {

        const { data } = await tesloApi.post<IAuthResponse>('/auth/login', {
            email,
            password
        }, {
            timeout: 1000 * 60
        })

        return data
    } catch (error) {
        console.error(error)
        throw error
    }
}