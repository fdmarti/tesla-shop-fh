import { useRef, type KeyboardEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchURLParams } from "@/hooks/useSearchURLParams";
import { CustomLink } from "@/components/custom/CustomLink";
import { Link, useParams } from "react-router";
import { CustomLogo } from "@/components/custom/CustomLogo";

const DEFAULT_SEARCH_KEY_SEARCH = 'q'

export const CustomHeader = () => {

    const { gender } = useParams()

    const inputSearchRef = useRef<HTMLInputElement>(null)

    const { getSearchURLParams, setSearchURLParams, deleteSearchURLParams } = useSearchURLParams()

    const legacySearch = getSearchURLParams(DEFAULT_SEARCH_KEY_SEARCH)

    const onHandleKeyDownSearch = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return

        const valueSearch = inputSearchRef.current?.value ?? ''

        if (!valueSearch) {
            deleteSearchURLParams(DEFAULT_SEARCH_KEY_SEARCH)
            return
        }

        setSearchURLParams(DEFAULT_SEARCH_KEY_SEARCH, valueSearch, { clear: true })
    }

    return <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
            <div className="flex h-16 items-center justify-between">
                {/* Logo */}
                <CustomLogo />

                {/* Navigation - Desktop */}
                <nav className="hidden md:flex items-center space-x-8">
                    <CustomLink text="Todos" to="/" active={!gender} />
                    <CustomLink text="Hombres" to="/gender/men" active={gender === 'men'} />
                    <CustomLink text="Mujeres" to="/gender/women" active={gender === 'women'} />
                    <CustomLink text="Niños" to="/gender/kid" active={gender === 'kid'} />
                </nav>

                {/* Search and Cart */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex items-center space-x-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input defaultValue={legacySearch} placeholder="Buscar productos..." className="pl-9 w-64 h-9" ref={inputSearchRef} onKeyDown={onHandleKeyDownSearch} />
                        </div>
                    </div>

                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button>

                    <Link to="/auth/login">
                        <Button variant="default" size="sm" className="ml-2" >
                            Login
                        </Button>
                    </Link>
                    <Link to="/admin">
                        <Button variant="destructive" size="sm" className="ml-2" >
                            Admin
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    </header>;
};