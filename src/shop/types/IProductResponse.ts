import type { IProduct } from "@/types/IProducts";

export interface IProductsResponse {
    count: number;
    pages: number;
    products: IProduct[];
}