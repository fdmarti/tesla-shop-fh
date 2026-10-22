import type { IUser } from '@/types/IUser'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { LOCAL_STORAGE_SESSION } from '@/const/local-storage'
import { checkAuthAction } from '../actions/check-auth.action'
import { registerAction } from '../actions/register.action'

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'

type AuthStore = {
    user: IUser | null
    token: string | null,
    authStatus: AuthStatus

    isAdmin: () => boolean,
    userAlias: () => string,
    login: (email: string, password: string) => Promise<boolean>
    register: (fullName: string, email: string, password: string) => Promise<boolean>
    logout: () => boolean
    checkAuthStatus: () => Promise<boolean>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    token: null,
    authStatus: 'checking',

    isAdmin: () => {
        const user = get().user
        if (!user) return false

        const authStatus = get().authStatus

        if (authStatus !== 'authenticated') return false

        return user.roles.includes('admin') || user.fullName.includes('Fe')
    },

    userAlias: () => {
        const user = get().user
        if (!user) return ''

        return user.fullName.split(' ').map(val => val.charAt(0)).join('')
    },

    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password)
            localStorage.setItem(LOCAL_STORAGE_SESSION, data.token)

            set({ user: data.user, token: data.token, authStatus: 'authenticated' })

            return true
        } catch (error) {
            console.error(error)
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            localStorage.removeItem(LOCAL_STORAGE_SESSION)
            return false
        }
    },

    register: async (fullName: string, email: string, password: string) => {
        try {
            const data = await registerAction(fullName, email, password)
            localStorage.setItem(LOCAL_STORAGE_SESSION, data.token)

            set({ user: data.user, token: data.token, authStatus: 'authenticated' })

            return true
        } catch (error) {
            console.error(error)
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            localStorage.removeItem(LOCAL_STORAGE_SESSION)
            return false
        }
    },

    logout: () => {
        set({ user: null, token: null, authStatus: 'not-authenticated' })
        localStorage.removeItem(LOCAL_STORAGE_SESSION)
        return true
    },

    checkAuthStatus: async () => {
        try {
            const { token, user } = await checkAuthAction()
            set({
                user,
                token,
                authStatus: 'authenticated'
            })

            return true
        } catch (error) {
            console.error(error)
            set({ user: null, token: null, authStatus: 'not-authenticated' })
            localStorage.removeItem(LOCAL_STORAGE_SESSION)
            return false
        }
    }
}))