# Teslo Shop

Tienda de moda minimalista inspirada en Tesla, construida con **React 19 + TypeScript + Vite**.

El proyecto se organiza en tres módulos (`shop`, `admin` y `auth`) que comparten un mismo router,
un cliente de **TanStack Query** y componentes de UI de **shadcn/ui** sobre **Base UI**.

---

## Requisitos

- Node.js >= 20.19
- pnpm >= 10

## Instalación

```bash
pnpm install
```

## Variables de entorno

Copiar `.env.template` como `.env` en la raíz (el proyecto consume una API REST local):

```bash
VITE_API_URL=http://localhost:3000/api
VITE_API_URL_IMAGES=http://localhost:3000/api/files/product/
```

> Vite solo expone variables con prefijo `VITE_` al código del navegador.

## Scripts

```bash
pnpm dev       # servidor de desarrollo con HMR
pnpm build     # tsc -b && vite build
pnpm lint      # eslint
pnpm preview   # previsualiza el build de producción
```

---

## Estructura

El código vive en `src/` y se divide en tres módulos, cada uno con sus propias rutas, páginas,
acciones e hooks:

| Módulo | Descripción |
|---|---|
| `shop/` | Tienda pública: listado de productos con filtros (género, talles, precio, búsqueda) y paginación |
| `admin/` | Panel de administración de productos: creación y edición con react-hook-form, slug autogenerado a partir del título, carga de imágenes y tallas/etiquetas |
| `auth/` | Login y registro con autenticación vía Zustand |

Los tipos de dominio compartidos están en `src/types/` y los componentes de UI en
`components/custom/` (propios) y `components/ui/` (shadcn).

---

## Patrones principales

- **Router**: `createBrowserRouter` en `src/app.router.tsx`, páginas cargadas de forma lazy.
- **Capa de datos**: flujo `action → hook → componente`. Las acciones pegan a la API con axios;
  los hooks envuelven `useQuery`; los componentes solo consumen `data` / `isPending` / `isError`.
- **Estado de URL**: el hook propio `useSearchURLParams` hace que la URL sea la fuente de verdad
  de los filtros, búsqueda y paginación (`page`, `sizes`, `price`, `q`, `viewMode`).
- **Alias**: `@` apunta a `src/` (configurado en `vite.config.ts` y los `tsconfig`).
- **Autenticación**: el store de Zustand (`src/auth/store/auth.store.ts`) maneja usuario, token y
  estado (`authenticated` / `not-authenticated` / `checking`). El token se persiste en
  `localStorage` y `checkAuthStatus` lo valida contra la API al cargar.
- **Rutas protegidas**: `src/components/routes/protectedRoutes.tsx` redirige según el estado de
  auth y el rol del usuario (admin).

---

## Notas

- El idioma de la interfaz es **español**.
- Para probar el panel admin, ir a `/admin/products` (no hay enlace visible en la tienda): usar
  `/admin/products/new` para crear un producto, la API debe estar corriendo en `localhost:3000`.
- El theme vive en `src/index.css` (Tailwind v4 CSS-first); no existe `tailwind.config.js`.
- La paginación se maneja con `limit`/`offset`: `offset = (page - 1) * limit`.
- Pendiente: migrar `ProductPage` de los datos mock (`src/mock/products.ts`) a la API.
