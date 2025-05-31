"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { ProductCard } from "@/components/Pages/Products/ProductCard";
import { IProduct } from "@/models/Product";
import SplashCursor from "@/utils/animations/SplashCursor/SplashCursor";
import Particles from "@/utils/animations/Particles/Particles";

export default function Home() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/api/products");

                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className={"flex justify-center items-center min-h-screen bg-dark-100 text-light-80"}>
                <div className={"animate-pulse text-purple-80 text-xl"}>{"Loading..."}</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={"flex justify-center items-center min-h-screen bg-dark-100 text-red-500"}>
                {error}
            </div>
        );
    }

    return (
        <main className={"min-h-screen bg-dark-100 text-light-80"}>
            <div className={"relative h-[500px] w-full border-y border-gray-800"}>
                <div className={"max-w-7xl mx-auto px-8 py-16 flex items-center h-full"}>
                    <h1 className={"text-[40px] font-zen-dots relative z-10 w-3/4 text-balance"}>
                        {"Gear Up for an Interstellar Shopping Journey with Solara"}
                    </h1>
                </div>
                <div className={"h-full w-full absolute inset-0"}>
                    <SplashCursor />
                </div>
                <div className={"h-full w-full absolute inset-0"}>
                    <Particles />
                </div>
            </div>
            <div className={"max-w-7xl mx-auto px-8 py-16"}>
                <div className={"space-y-6"}>
                    <h2 className={"text-3xl font-bold"}>{"All products"}</h2>
                    <p className={"max-w-3xl text-balance"}>
                        {"Embrace a universal shopping experience that transcends conventional bounds. Here you'll find an overflowing cosmos of products - from the technologically advanced, to the fashionably forward; from cryptic cosmic artifacts to indispensables of space exploration; and from celestial skincare to extraordinary alien cuisines."}
                    </p>
                </div>
                <div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"}>
                    {products.length > 0 && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}
