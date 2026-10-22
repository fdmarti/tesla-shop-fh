// Import all product images
import blackTshirt from "@/assets/product-black-tshirt.webp";
import whiteHoodie from "@/assets/product-white-hoodie.webp";
import greySweatshirt from "@/assets/product-grey-sweatshirt.webp";
import blackJacket from "@/assets/product-black-jacket.webp";
import whiteCap from "@/assets/product-white-cap.webp";
import blackBackpack from "@/assets/product-black-backpack.webp";

export interface Product {
    id: string;
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    description: string;
    sizes: string[];
    colors: string[];
}

export const products: Product[] = [
    {
        id: "1",
        slug: "camiseta-tesla-negro",
        name: "Camiseta Tesla Negro",
        price: 35,
        image: blackTshirt,
        category: "Camisetas",
        description: "Camiseta de algodón premium con diseño minimalista inspirado en Tesla.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Blanco", "Gris"]
    },
    {
        id: "2",
        slug: "sudadera-tesla-blanca",
        name: "Sudadera Tesla Blanca",
        price: 85,
        image: whiteHoodie,
        category: "Sudaderas",
        description: "Sudadera con capucha de alta calidad con logo Tesla bordado.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blanco", "Negro", "Gris"]
    },
    {
        id: "3",
        slug: "sudadera-tesla-gris",
        name: "Sudadera Tesla Gris",
        price: 75,
        image: greySweatshirt,
        category: "Sudaderas",
        description: "Sudadera clásica sin capucha con corte moderno y cómodo.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Gris", "Negro", "Azul Marino"]
    },
    {
        id: "4",
        slug: "chaqueta-tesla-negro",
        name: "Chaqueta Tesla Negro",
        price: 150,
        image: blackJacket,
        category: "Chaquetas",
        description: "Chaqueta técnica resistente al agua con diseño elegante.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Gris Oscuro"]
    },
    {
        id: "5",
        slug: "gorra-tesla-blanca",
        name: "Gorra Tesla Blanca",
        price: 25,
        image: whiteCap,
        category: "Accesorios",
        description: "Gorra ajustable con logo Tesla bordado en alta calidad.",
        sizes: ["Único"],
        colors: ["Blanco", "Negro", "Gris"]
    },
    {
        id: "6",
        slug: "mochila-tesla-negro",
        name: "Mochila Tesla Negro",
        price: 120,
        image: blackBackpack,
        category: "Accesorios",
        description: "Mochila minimalista con compartimentos organizados y diseño ergonómico.",
        sizes: ["Único"],
        colors: ["Negro", "Gris"]
    },
    {
        id: "7",
        slug: "camiseta-tesla-blanca",
        name: "Camiseta Tesla Blanca",
        price: 35,
        image: blackTshirt, // Reutilizamos la imagen por simplicidad
        category: "Camisetas",
        description: "Camiseta blanca de algodón orgánico con logo Tesla discreto.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blanco", "Negro", "Gris"]
    },
    {
        id: "8",
        slug: "sudadera-tesla-negro",
        name: "Sudadera Tesla Negro",
        price: 85,
        image: whiteHoodie,
        category: "Sudaderas",
        description: "Sudadera negra con capucha y bolsillo frontal tipo canguro.",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Negro", "Gris", "Azul Marino"]
    }
];