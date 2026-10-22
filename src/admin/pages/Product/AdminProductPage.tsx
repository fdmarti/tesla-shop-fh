// https://github.com/Klerith/bolt-product-editor

import { Navigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomLoading } from '@/components/custom/CustomLoading';
import { AdminProductForm } from './UI/AdminProductForm';

export const AdminProductPage = () => {
  const { slug } = useParams();

  const { data: product, isLoading, isError } = useProduct(slug || '')

  if (isLoading) return <CustomLoading />

  if (isError) return <Navigate to="/admin/products" />

  const productTitle = slug === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    slug === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  if (!product) return <Navigate to="/admin/products" />

  return (
    <AdminProductForm product={product} subtitle={productSubtitle} title={productTitle} />
  )
};