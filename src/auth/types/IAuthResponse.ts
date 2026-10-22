import type { IUser } from "@/types/IUser";


// Login, Register, Check.status
export interface IAuthResponse {
    user: IUser,
    token: string
}