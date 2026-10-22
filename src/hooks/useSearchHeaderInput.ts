import { useRef, type KeyboardEvent } from "react"
import { useSearchURLParams } from "./useSearchURLParams"

const DEFAULT_SEARCH_KEY_SEARCH = 'q'

export const useSearchHeaderInput = () => {
    const { getSearchURLParams, setSearchURLParams, deleteSearchURLParams } = useSearchURLParams()

    const legacySearch = getSearchURLParams(DEFAULT_SEARCH_KEY_SEARCH)

    const inputSearchRef = useRef<HTMLInputElement>(null)

    const onHandleKeyDownSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return

        const valueSearch = inputSearchRef.current?.value ?? ''

        if (!valueSearch) {
            deleteSearchURLParams(DEFAULT_SEARCH_KEY_SEARCH)
            return
        }

        setSearchURLParams(DEFAULT_SEARCH_KEY_SEARCH, valueSearch, { clear: true })
    }

    return {
        legacySearch,
        inputSearchRef,

        onHandleKeyDownSearch
    }

}