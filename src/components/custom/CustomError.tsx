import { TriangleAlert } from "lucide-react"
import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty"

interface Props {
    message?: string
}

const DEFAULT_ERROR_MESSAGE = "No pudimos cargar la información. Intentá nuevamente en unos instantes."

export const CustomError = ({ message = DEFAULT_ERROR_MESSAGE }: Props) => {
    return (
        <Empty className="min-h-75">
            <EmptyHeader>
                <EmptyMedia variant="icon" className="bg-destructive/10 text-destructive">
                    <TriangleAlert className="size-5" />
                </EmptyMedia>
                <EmptyTitle>Algo salió mal</EmptyTitle>
                <EmptyDescription>{message}</EmptyDescription>
            </EmptyHeader>
        </Empty>
    )
}
