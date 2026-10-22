import { tesloApi } from "@/api/testlaApi"
import type { IAuthResponse } from "../types/IAuthResponse"

export const registerAction = async (fullName: string, email: string, password: string): Promise<IAuthResponse> => {
    try {
        const { data } = await tesloApi.post('/auth/register', {
            fullName,
            email,
            password
        })

        return data
    } catch (error) {
        console.error(error)
        throw new Error('Error al crear el usuario', { cause: error })
    }
}