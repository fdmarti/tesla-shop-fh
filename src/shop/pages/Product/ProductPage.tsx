import { useState } from "react"
import { Link, useParams } from "react-router"
import { ChevronRight, Star, Truck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { products } from "@/mock/products"
import { ProductGallery } from "@/shop/components/ProductGallery"
import { ProductPurchasePanel } from "@/shop/components/ProductPurchasePanel"
import { ProductCard } from "@/shop/components/ProductCard"
import { cn } from "@/lib/utils"

export const ProductPage = () => {

    const { slug } = useParams()

    const [addedToCart, setAddedToCart] = useState<{ name: string; size: string; color: string; quantity: number } | null>(null)

    const product = products.find((item) => item.slug === slug)

    if (!product) {
        return (
            <section className="py-24 px-4 lg:px-8">
                <div className="container mx-auto text-center space-y-6">
                    <h1 className="text-4xl lg:text-5xl font-light tracking-tight">
                        Producto no encontrado
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        El producto que buscás no existe o ya no está disponible.
                    </p>
                    <Link
                        to="/"
                        className={cn(buttonVariants({ variant: "default", size: "default" }), "mt-2")}
                    >
                        Volver al inicio
                    </Link>
                </div>
            </section>
        )
    }

    const relatedProducts = [
        ...products.filter((item) => item.category === product.category && item.id !== product.id),
        ...products.filter((item) => item.category !== product.category && item.id !== product.id),
    ].slice(0, 4)

    const onHandleAddToCart = (options: { size: string; color: string; quantity: number }) => {
        setAddedToCart({ ...options, name: product.name })
        setTimeout(() => setAddedToCart(null), 3000)
    }

    return (
        <section className="py-8 px-4 lg:px-8">
            <div className="container mx-auto">
                {/* Breadcrumb */}
                <nav aria-label="Miga de pan" className="flex items-center gap-1 text-sm text-muted-foreground mb-8">
                    <Link to="/" className="hover:text-foreground transition-colors">
                        Inicio
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <Link to="/" className="hover:text-foreground transition-colors">
                        {product.category}
                    </Link>
                    <ChevronRight className="size-3.5" />
                    <span className="text-foreground truncate">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Gallery */}
                    <ProductGallery image={product.image} name={product.name} />

                    {/* Details */}
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <p className="text-xs uppercase tracking-widest text-muted-foreground">
                                {product.category}
                            </p>

                            <h1 className="text-3xl lg:text-4xl font-light tracking-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-0.5" aria-label="Valoración 4.8 de 5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                                "size-4",
                                                star <= 4 ? "fill-foreground text-foreground" : "text-muted-foreground/40"
                                            )}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-muted-foreground">4.8 · 124 reseñas</span>
                            </div>

                            <p className="text-3xl font-semibold">${product.price}</p>
                        </div>

                        <Separator />

                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        <ProductPurchasePanel
                            sizes={product.sizes}
                            colors={product.colors}
                            onAddToCart={onHandleAddToCart}
                        />

                        {addedToCart && (
                            <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3 text-sm">
                                <Truck className="size-4 shrink-0 text-muted-foreground" />
                                <span>
                                    {addedToCart.quantity} x {addedToCart.name} ({addedToCart.color}, {addedToCart.size})
                                    agregado al carrito. Te contactamos para coordinar la entrega.
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="mt-16 lg:mt-24 grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-2xl font-light tracking-tight">Descripción</h2>
                        <Separator />
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description} Diseñado con la misma filosofía que los productos
                            originales de Tesla: materiales nobles, líneas limpias y una atención al
                            detalle que se nota al tacto. Cada prenda se fabrica en series pequeñas
                            para mantener un estándar de calidad constante.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Es una pieza atemporal que combina con cualquier guardarropa. Lavar a
                            máquina con agua fría, lavar del revés y secar al aire libre para
                            conservar la forma y el acabado original.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-light tracking-tight">Detalles</h2>
                        <Separator />
                        <dl className="space-y-3 text-sm">
                            <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">Categoría</dt>
                                <dd>{product.category}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">Tallas</dt>
                                <dd className="text-right">{product.sizes.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">Colores</dt>
                                <dd className="text-right">{product.colors.join(', ')}</dd>
                            </div>
                            <div className="flex justify-between gap-4">
                                <dt className="text-muted-foreground">Envío</dt>
                                <dd>24 a 48 horas</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Related products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16 lg:mt-24 space-y-8">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h2 className="text-3xl font-light tracking-tight">También te puede interesar</h2>
                            <Link
                                to="/"
                                className="text-sm underline underline-offset-4 hover:text-primary whitespace-nowrap"
                            >
                                Ver todos
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((item) => (
                                <ProductCard
                                    key={item.id}
                                    slug={item.slug}
                                    name={item.name}
                                    price={item.price}
                                    image={item.image}
                                    category={item.category}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
