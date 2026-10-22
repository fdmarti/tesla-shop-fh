# Teslo Shop

Tienda de moda minimalista inspirada en Tesla, construida con **React 19 + TypeScript + Vite**.

El proyecto está organizado en tres módulos (`shop`, `admin` y `auth`) que comparten un mismo router,
un cliente de **React Query** y un set de componentes de UI basados en **shadcn/ui** sobre **Base UI**.

---

## Stack

| Categoría | Tecnología |
|---|---|
| Framework | React 19.3 |
| Lenguaje | TypeScript ~6.0 (modo `strict` implícito) |
| Bundler | Vite 8.3 + Rolldown |
| Routing | React Router 8.5 (data router, `createBrowserRouter`) |
| Server state | TanStack Query 5.104 |
| HTTP | Axios 1.20 |
| Estilos | Tailwind CSS 4.3 (CSS-first config) |
| Componentes | shadcn/ui (estilo `base-nova`) sobre `@base-ui/react` |
| Iconos | Lucide React |
| Clases CSS | `cn` (merge de Tailwind), `class-variance-authority` |
| Animaciones | `tw-animate-css` |
| Tipografía | Geist Variable (Geist Sans) + Montserrat Alternates |
| Lint | ESLint 10 (flat config) |

> El **React Compiler** está habilitado vía el plugin de Babel (`reactCompilerPreset`).

---

## Requisitos

- **Node.js** >= 20.19 (probado con v23.7)
- **pnpm** >= 10 (el proyecto usa `pnpm-lock.yaml`)

---

## Instalación

```bash
pnpm install
```

## Variables de entorno

El proyecto consume datos de una API REST real. Las variables se declaran en un archivo `.env`
en la raíz (ya está en `.gitignore`):

```bash
VITE_API_URL=http://localhost:3000/api
VITE_API_URL_IMAGES=http://localhost:3000/api/files/product/
```

| Variable | Para qué se usa |
|---|---|
| `VITE_API_URL` | `baseURL` del cliente axios (`src/api/testlaApi.ts`) |
| `VITE_API_URL_IMAGES` | Prefijo con el que se arman las URLs de imágenes (`src/shop/actions/get-products.action.ts`) |

> Vite solo expone variables con prefijo `VITE_` al código del navegador. No pongas secretos ahí.
> Hay un `.env.template` con los valores de ejemplo para copiar.

## Scripts

```bash
pnpm dev       # servidor de desarrollo con HMR
pnpm build     # tsc -b && vite build
pnpm lint      # eslint sobre todo el proyecto
pnpm preview   # previsualiza el build de producción
```

`pnpm build` ejecuta primero `tsc -b`, por lo que **un error de tipos impide el build**. Eso es
intencional: mantiene los tipos y el build alineados.

> **Estado actual:** la migración de la tienda a la API está en curso. Quedan pendientes:
> - `ProductPage` todavía lee de `src/mock/products.ts` en lugar de la API, y sus tipos
>   (`name`, `image`, `category`, `colors`) difieren de `IProduct` (`title`, `images`, `gender`).
> - `useProducts` requiere `params`, por lo que `GenderPage` todavía no puede llamarlo sin argumentos.
>
> Mientras tanto, `pnpm build` falla por esas dos causas. `pnpm dev` funciona igual.

---

## Estructura del proyecto

```
src/
├── app.router.tsx              # Router raíz: ShopRoutes + AdminRoutes + AuthRoutes
├── TeslaShopApp.tsx            # Providers (QueryClient + RouterProvider)
├── main.tsx                    # Entry point
├── index.css                   # Tailwind v4 + variables de tema (shadcn)
│
├── api/
│   └── testlaApi.ts            # Instancia de axios (baseURL desde VITE_API_URL)
│
├── types/                      # Tipos compartidos de dominio
│   ├── IProducts.ts            # IProduct, Gender, Size
│   └── IUser.ts                # User
│
├── hooks/
│   └── useSearchURLParams.ts   # Hook propio sobre useSearchParams
├── lib/
│   └── utils.ts                # Re-export de `cn`
├── mock/
│   └── products.ts             # Datos mock (fallback mientras se migra ProductPage)
│
├── components/
│   ├── custom/                 # Componentes propios (no son shadcn)
│   │   ├── CustomError.tsx     # Estado de error (Empty + Alert)
│   │   ├── CustomLink.tsx
│   │   ├── CustomLoading.tsx   # Estado de carga (Empty + Spinner)
│   │   ├── CustomLogo.tsx
│   │   └── CustomPagination.tsx
│   └── ui/                     # Componentes shadcn/ui
│       ├── alert.tsx  button.tsx  card.tsx  checkbox.tsx  empty.tsx
│       ├── input.tsx  label.tsx  radio-group.tsx  separator.tsx
│       └── spinner.tsx  table.tsx
│
├── shop/                       # Módulo tienda (público)
│   ├── actions/                # Actions: functions que pegan a la API
│   │   └── get-products.action.ts
│   ├── hooks/
│   │   └── useProducts.tsx     # Wrapper de useQuery
│   ├── types/
│   │   └── IProductResponse.ts # IProductsResponse
│   ├── layouts/ShopLayout.tsx
│   ├── pages/{Home,Gender,Product}/
│   ├── components/             # CustomHeader, CustomFooter, ProductsGrid, ProductCard, ...
│   └── routes/index.tsx
│
├── admin/                      # Módulo panel de administración
│   ├── layout/AdminLayout.tsx
│   ├── pages/{Dashboard,Products,Product}/
│   ├── components/
│   └── routes/index.tsx
│
└── auth/                       # Módulo autenticación
    ├── layouts/AuthLayout.tsx
    ├── pages/{Login,Register}/
    ├── components/Icons.tsx
    └── routes/index.tsx
```

### Convenciones

- Cada módulo (`shop`, `admin`, `auth`) tiene su propia carpeta `routes/` que exporta un
  `RouteObject[]`. El router raíz los concatena.
- Las páginas se cargan de forma **lazy** con `lazy: async () => ({ Component: ... })`.
- Los componentes propios viven en `components/custom/`; los de shadcn en `components/ui/`.
  No se mezclan: si modificás un archivo de `ui/`, el cambio se pierde al re-instalar shadcn.
- La capa de datos sigue el flujo **action → hook → componente**:
  `actions/` pega a la API, `hooks/` envuelve el `useQuery`, y los componentes solo consumen
  `data` / `isPending` / `isError`.

---

## Alias de imports

El alias `@` apunta a `src/`:

```ts
import { Button } from "@/components/ui/button"
import type { IProduct } from "@/types/IProducts"
```

Está configurado en tres lugares y **los tres deben coincidir**:

| Archivo | Configuración |
|---|---|
| `vite.config.ts` | `resolve.alias` → `"@": path.resolve(__dirname, "./src")` |
| `tsconfig.app.json` | `compilerOptions.paths` → `"@/*": ["./src/*"]` |
| `tsconfig.json` | `compilerOptions.paths` → `"@/*": ["./src/*"]` |

---

## Configuración de Vite

```ts
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })   // React Compiler
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
```

El plugin de Tailwind (`@tailwindcss/vite`) se encarga del build de CSS, por eso **no existe**
un `tailwind.config.js`: Tailwind v4 se configura desde `src/index.css` con `@theme`.

---

## Tailwind CSS v4 + tema

Todo el theme vive en `src/index.css`:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";
@import "@fontsource-variable/geist";

@theme inline {
  --color-primary: var(--primary);
  --font-sans: "Geist Variable", sans-serif;
  /* ... */
}
```

- Los colores se definen como variables CSS en `:root` y `.dark` (formato `oklch`).
- `@theme inline` las expone como utilidades de Tailwind (`bg-primary`, `text-muted-foreground`, ...).
- Se soporta **modo oscuro** con el variante `dark` (`@custom-variant dark (&:is(.dark *))`).
  Ojo: el modo oscuro se activa **agregando la clase `.dark` al `<html>`**, no con
  `prefers-color-scheme`.

Hay clases de componente definidas en `@layer components` dentro del mismo archivo
(por ejemplo `.product-card-hover` e `.image-overlay`).

---

## shadcn/ui

La configuración vive en `components.json`:

```json
{
  "style": "base-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": { "config": "", "css": "src/index.css", "baseColor": "neutral", "cssVariables": true },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

Para agregar un componente:

```bash
pnpm dlx shadcn@latest add accordion
```

> **Ojo:** los componentes de `src/components/ui/` usan `@base-ui/react` como primitiva, no Radix.
> Si agregás un componente que use Radix, revisá que las primitivas queden disponibles.

---

## Routing

El router raíz (`src/app.router.tsx`) usa `createBrowserRouter` y concatena las rutas de los
tres módulos. Cualquier ruta desconocida redirige a `/`.

```
/                       → HomePage          (shop)
/product/:slug          → ProductPage       (shop)
/gender/:gender         → GenderPage        (shop)
/admin                  → AdminDashboardPage
/admin/products         → AdminProductsPage
/admin/products/:slug   → AdminProductPage
/auth/login             → LoginPage
/auth/register          → RegisterPage
*                       → <Navigate to="/" />
```

---

## Estado

### Estado de servidor: TanStack Query

Configurado en `src/TeslaShopApp.tsx`:

```tsx
const queryClient = new QueryClient()

<QueryClientProvider client={queryClient}>
  <RouterProvider router={AppRouter} />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Capa de datos: action → hook → componente

**Action** (`src/shop/actions/get-products.action.ts`) — la única que conoce la API:

```ts
export interface Params { page: number }

export const getProductsAction = async (params: Params): Promise<IProductsResponse> => {
    const { data } = await tesloApi.get<IProductsResponse>('/products', {
        params: { limit: DEFAULT_LIMIT, offset: (params.page - 1) * DEFAULT_LIMIT }
    })
    // normaliza las URLs de imágenes con VITE_API_URL_IMAGES
    return { ...rest, products: products.map(prod => ({ ...prod, images: prod.images.map(img => BASE_IMAGE_URL + img) })) }
}
```

**Hook** (`src/shop/hooks/useProducts.tsx`) — expone el `useQuery` con la key y el `staleTime`:

```ts
export const useProducts = (params: Params) => {
    return useQuery({
        queryKey: ['product-list', page],
        queryFn: () => getProductsAction(params),
        staleTime: 1000 * 60 * 5
    })
}
```

**Componente** — solo consume el resultado:

```tsx
const { data: productsResponse, isPending, isError } = useProducts({ page: +currentPage })

<ProductsGrid
    products={productsResponse?.products || []}
    loading={isPending}
    error={isError}
/>
```

### Estados de carga y error

`ProductsGrid` delega en dos componentes de `components/custom/`:

- **`CustomLoading`** — no recibe props. Usa el patrón `Empty` de shadcn con un `Spinner`.
- **`CustomError`** — recibe un `message?: string` opcional; sin mensaje muestra un texto por
  defecto. Usa `Empty` con un ícono `TriangleAlert` en tinte `destructive`.

```tsx
if (loading) return <CustomLoading />
if (error) return <CustomError />
```

### Estado de URL: `useSearchURLParams`

El hook propio de `src/hooks/useSearchURLParams.ts` encapsula `useSearchParams` de React Router
para que la URL sea la fuente de verdad del estado compartible (filtros, búsqueda, paginación,
modo de vista).

```ts
const { getSearchURLParams, setSearchURLParams, deleteSearchURLParams } = useSearchURLParams()

getSearchURLParams('page')            // => string ('' si no existe)
setSearchURLParams('viewMode', 'list')
setSearchURLParams({ page: '1', sizes: 'S,M' })   // seteo múltiple en una sola navegación
setSearchURLParams('search', texto, { clear: true }) // limpia el resto de los params
deleteSearchURLParams('search')
```

La opción `clear: true` reemplaza la query string en lugar de agregarle parámetros — útil para
la barra de búsqueda, que no debe arrastrar filtros viejos.

Los parámetros que usa la app: `page`, `viewMode`, `sizes`, `price` y `search`.

---

## Datos y tipos

Los tipos de dominio viven en `src/types/`:

- **`IProduct`** (`src/types/IProducts.ts`) — `id`, `title`, `price`, `description`, `slug`,
  `stock`, `sizes`, `gender`, `tags`, `images`, `user`. Incluye los unions
  `Gender = 'kid' | 'men' | 'women' | 'unisex'` y `Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XLL'`.
- **`User`** (`src/types/IUser.ts`) — `id`, `email`, `fullName`, `isActive`, `roles`.
- **`IProductsResponse`** (`src/shop/types/IProductResponse.ts`) — `count`, `pages`, `products`.

> `src/mock/products.ts` mantiene un set de datos mock con un shape **anterior** (`name`, `image`,
> `category`, `colors`). Todavía lo usa `ProductPage`, que todavía no está migrada a la API.
> Cuando termines esa migración, `mock/products.ts` se puede eliminar.

---

## ESLint

`eslint.config.js` usa flat config:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: { globals: globals.browser },
  },
])
```

> La regla `react-refresh/only-export-components` marca `src/components/ui/button.tsx` porque
> exporta `buttonVariants` (una constante) junto al componente. Es un warning conocido del
> template; se puede silenciar o mover `buttonVariants` a un archivo aparte.

---

## TypeScript

Configuración por proyectos (`tsconfig.json` con referencias a `tsconfig.app.json` y
`tsconfig.node.json`). Lo más relevante de `tsconfig.app.json`:

```jsonc
{
  "target": "es2023",
  "moduleResolution": "bundler",
  "verbatimModuleSyntax": true,   // imports de tipos con `import type`
  "noUnusedLocals": true,
  "noUnusedParameters": true,
  "noFallthroughCasesInSwitch": true,
  "paths": { "@/*": ["./src/*"] }
}
```

`verbatimModuleSyntax` implica que los tipos se importan explícitamente:

```ts
import type { IProduct } from "@/types/IProducts"   // ✅
import { IProduct } from "@/types/IProducts"        // ❌ error de TS
```

---

## Notas

- El idioma de la interfaz es **español**; mantené la coherencia al agregar textos.
- `useSearchURLParams` devuelve `''` (no `null`) cuando el parámetro no existe.
- No uses `Button render={<Link />}`: Base UI advierte que los links no deben renderizarse
  como botones. Para un link con apariencia de botón, usá `buttonVariants` sobre un `<Link>`.
- La paginación se maneja con `limit`/`offset` en la action, no con `page`/`limit` en la API:
  `offset = (page - 1) * limit`.
