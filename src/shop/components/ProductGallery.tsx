import { useState } from "react"
import { cn } from "@/lib/utils"

interface Props {
    image: string
    name: string
}

const VIEWS = [
    { id: "frente", label: "Frente", className: "object-center" },
    { id: "detalle", label: "Detalle", className: "object-[center_75%] scale-[1.6]" },
    { id: "textura", label: "Textura", className: "object-[center_85%] scale-[1.35]" },
]
export const ProductGallery = ({ image, name }: Props) => {

    const [activeView, setActiveView] = useState<string>(VIEWS[0].id)

    const activeViewData = VIEWS.find((view) => view.id === activeView) ?? VIEWS[0]

    return (
        <div className="flex flex-col-reverse gap-4 md:flex-row">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-3">
                {VIEWS.map((view) => (
                    <button
                        key={view.id}
                        type="button"
                        onClick={() => setActiveView(view.id)}
                        aria-label={`Ver ${view.label.toLowerCase()} de ${name}`}
                        aria-pressed={activeView === view.id}
                        className={cn(
                            "h-20 w-20 overflow-hidden rounded-lg border bg-muted transition-all duration-200",
                            activeView === view.id
                                ? "border-foreground"
                                : "border-transparent opacity-70 hover:opacity-100"
                        )}
                    >
                        <img
                            src={image}
                            alt={`${name} - ${view.label}`}
                            className={cn("h-full w-full object-cover", view.className)}
                        />
                    </button>
                ))}
            </div>

            {/* Main image */}
            <div className="group relative flex-1 overflow-hidden rounded-lg bg-muted aspect-square">
                <img
                    src={image}
                    alt={name}
                    className={cn(
                        "h-full w-full object-cover transition-transform duration-500",
                        activeView === "frente" && "group-hover:scale-105",
                        activeViewData.className
                    )}
                />
                <div className="image-overlay" />
            </div>
        </div>
    )
}
