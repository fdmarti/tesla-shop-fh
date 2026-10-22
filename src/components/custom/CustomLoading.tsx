import { Spinner } from "@/components/ui/spinner"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

export const CustomLoading = () => {
    return (
        <Empty className="min-h-75">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <Spinner className="size-5" />
                </EmptyMedia>
                <EmptyTitle>Cargando...</EmptyTitle>
                <EmptyDescription>
                    Estamos preparando todo para vos. Esto solo toma un momento.
                </EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
