import { useState } from "react"
import { Check, Minus, Plus, ShoppingBag, Truck, RefreshCw, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

interface Props {
    sizes: string[]
    colors: string[]
    onAddToCart: (options: { size: string; color: string; quantity: number }) => void
}

const COLOR_HEX: Record<string, string> = {
    "Negro": "#000000",
    "Blanco": "#f5f5f5",
    "Gris": "#9ca3af",
    "Gris Oscuro": "#4b5563",
    "Azul Marino": "#1e3a5f",
}

const MAX_QUANTITY = 10

export const ProductPurchasePanel = ({ sizes, colors, onAddToCart }: Props) => {

    const [selectedSize, setSelectedSize] = useState<string>(sizes[0] ?? '')
    const [selectedColor, setSelectedColor] = useState<string>(colors[0] ?? '')
    const [quantity, setQuantity] = useState<number>(1)

    const hasSingleSize = sizes.length === 1

    const onHandleQuantity = (delta: number) => {
        setQuantity((current) => Math.min(MAX_QUANTITY, Math.max(1, current + delta)))
    }

    return (
        <div className="space-y-8">
            {/* Colors */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        Color
                    </h3>
                    <span className="text-sm">{selectedColor}</span>
                </div>

                <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => setSelectedColor(color)}
                            aria-label={`Color ${color}`}
                            aria-pressed={selectedColor === color}
                            className={cn(
                                "group/color relative flex size-9 items-center justify-center rounded-full border transition-all duration-200",
                                selectedColor === color
                                    ? "border-foreground"
                                    : "border-border hover:border-foreground/50"
                            )}
                        >
                            <span
                                className="size-6 rounded-full border border-black/10"
                                style={{ backgroundColor: COLOR_HEX[color] ?? "#d4d4d4" }}
                            />
                            {selectedColor === color && (
                                <Check
                                    className={cn(
                                        "absolute size-3.5",
                                        color === "Blanco" ? "text-black" : "text-white"
                                    )}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Sizes */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        Talla
                    </h3>
                    {!hasSingleSize && (
                        <button type="button" className="text-sm underline underline-offset-4 hover:text-primary">
                            Guía de tallas
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            type="button"
                            variant={selectedSize === size ? "default" : "outline"}
                            onClick={() => setSelectedSize(size)}
                            className="min-w-14"
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator />

            {/* Quantity + Add to cart */}
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        Cantidad
                    </h3>

                    <div className="flex items-center rounded-lg border">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onHandleQuantity(-1)}
                            disabled={quantity <= 1}
                            aria-label="Disminuir cantidad"
                        >
                            <Minus />
                        </Button>

                        <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => onHandleQuantity(1)}
                            disabled={quantity >= MAX_QUANTITY}
                            aria-label="Aumentar cantidad"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>

                <Button
                    size="lg"
                    className="w-full"
                    onClick={() => onAddToCart({ size: selectedSize, color: selectedColor, quantity })}
                >
                    <ShoppingBag />
                    Agregar al carrito
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                    Envío gratis en compras superiores a $50
                </p>
            </div>

            <Separator />

            {/* Benefits */}
            <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3">
                    <Truck className="size-4 text-muted-foreground" />
                    <span>Envío gratis a todo el país en 24-48hs</span>
                </li>
                <li className="flex items-center gap-3">
                    <RefreshCw className="size-4 text-muted-foreground" />
                    <span>Devoluciones gratuitas hasta 30 días</span>
                </li>
                <li className="flex items-center gap-3">
                    <ShieldCheck className="size-4 text-muted-foreground" />
                    <span>Garantía de calidad Tesla Style</span>
                </li>
            </ul>
        </div>
    )
}
