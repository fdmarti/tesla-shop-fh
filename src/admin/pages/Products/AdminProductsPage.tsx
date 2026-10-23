import { Link } from "react-router"
import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { PencilIcon, PlusIcon } from "lucide-react"
import { useProducts } from "@/shop/hooks/useProducts"
import { currencyFormatter } from "@/lib/currency-formatter"

export const AdminProductsPage = () => {

  const { data: productsResponse } = useProducts()

  const defaultProductResponse = productsResponse?.products || []
  const pagesProductResponse = productsResponse?.pages || 0

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle title="Productos" subtitle="Aqui puedes ver y administriar productos" />

        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon /> Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Cateogoria</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Talles</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            defaultProductResponse.map(product => {
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <img src={product.images[0]} alt="product-1" className="w-20 h-20 object-cover rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/products/${product.slug}`} className="hover:cursor-pointer hover:underline hover:underline-offset-2">
                      {product.title}
                    </Link>
                  </TableCell>
                  <TableCell>{product.gender.toUpperCase()}</TableCell>
                  <TableCell>{currencyFormatter(product.price)}</TableCell>
                  <TableCell>{product.sizes.join(' - ')}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableHead className="text-right">
                    <Link to={`/admin/products/${product.slug}`}>
                      <PencilIcon className="w-4 h-4 text-blue-500" />
                    </Link>
                  </TableHead>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>

      <CustomPagination totalPages={pagesProductResponse} />
    </>
  )
}
