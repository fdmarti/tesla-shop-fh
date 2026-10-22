import type { User } from "./IUser";

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
    user: User;
}

export type Gender = 'kid' | 'men' | 'women' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XLL' 
