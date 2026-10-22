import type { IUser } from "./IUser";

export interface IProduct {
    id: string;
    title: string;
    price: number;
    description: string;
    slug: string;
    stock: number;
    sizes: Size[];
    gender: Gender;
    tags: string[];
    images: string[];
    user: IUser;
}

export type Gender = 'kid' | 'men' | 'women' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' 
