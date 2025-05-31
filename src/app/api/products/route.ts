import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find().sort({ createdAt: -1 });

        const transformedProducts = products.map((product) => ({
            id: product._id.toString(),
            title: product.title,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
            category: product.category,
            brand: product.brand
        }));

        return NextResponse.json(transformedProducts);
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching products" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();

        const requiredFields = ["name", "description", "price", "imageUrl", "category"];
        const missingFields = requiredFields.filter((field) => !body[field]);

        if (missingFields.length > 0) {
            return NextResponse.json(
                { message: `Missing required fields: ${missingFields.join(", ")}` },
                { status: 400 }
            );
        }

        if (typeof body.price !== "number" || body.price < 0) {
            return NextResponse.json(
                { message: "Price must be a positive number" },
                { status: 400 }
            );
        }

        const product = new Product(body);

        await product.save();

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
        }
        return NextResponse.json(
            { message: "Error creating product" },
            { status: 400 }
        );
    }
}
