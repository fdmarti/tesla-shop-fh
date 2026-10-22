import { useSearchParams } from "react-router"

export type SearchURLParamsValues = Record<string, string>

export interface SetOptions {
    clear?: boolean
}

export const useSearchURLParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const getSearchURLParams = (key: string): string => {
        return searchParams.get(key) ?? ''
    }

    const setSearchURLParams = (key: string | SearchURLParamsValues, value?: string, options: SetOptions = {}) => {

        const { clear } = options

        const newSearchParams = new URLSearchParams(clear ? undefined : searchParams)

        if (typeof key === "string") {
            newSearchParams.set(key, value ?? "")
        } else {
            Object.entries(key).forEach(([paramKey, paramValue]) => {
                newSearchParams.set(paramKey, paramValue)
            })
        }

        setSearchParams(newSearchParams)
    }

    const deleteSearchURLParams = (key: string) => {
        searchParams.delete(key)
        setSearchParams(searchParams)
    }

    return {
        getSearchURLParams,
        setSearchURLParams,
        deleteSearchURLParams
    }
}
