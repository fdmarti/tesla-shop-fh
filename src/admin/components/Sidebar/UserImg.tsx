import { useAuthStore } from "@/auth/store/auth.store"

export const UserImg = () => {
    const { userAlias } = useAuthStore()
    return (
        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            {userAlias()}
        </div>
    )
}
