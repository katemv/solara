"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Plus } from "lucide-react";
import { http } from "@/lib/http-client";

import { ProtectedRoute } from "@/components/Organisms/Navigation/ProtectedRoute";
import { Button } from "@/components/Atoms/Button";
import { Input } from "@/components/Atoms/Input";
import { Alert, AlertDescription } from "@/components/UI";
import { IProduct } from "@/models/Product";

function AdminPanel() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        imageUrl: "",
        category: "",
        brand: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await http.get("/api/products");

            setProducts(response.data);
        } catch (err) {
            setError("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "price" ? value : value
        }));
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            price: "",
            imageUrl: "",
            category: "",
            brand: ""
        });
        setError("");
        setSuccess("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price)
            };

            await http.post("/api/products", productData);
            setSuccess("Product created successfully!");
            resetForm();
            setShowForm(false);
            fetchProducts(); // Refresh the products list
        } catch (err) {
            // For product creation, we want to show form-specific errors
            // Global handler will take care of network errors automatically
            setError("Failed to create product");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <ProtectedRoute adminOnly>
            <div className={"min-h-screen bg-dark-100 text-light-80"}>
                <div className={"max-w-7xl mx-auto px-8 py-16"}>
                    <div className={"flex justify-between items-center mb-8"}>
                        <div>
                            <h1 className={"text-3xl font-bold"}>{"Admin Panel"}</h1>
                            <p className={"text-gray-400 mt-2"}>{"Manage your products and inventory"}</p>
                        </div>
                        <Button
                            onClick={() => setShowForm(!showForm)}
                            className={"flex items-center gap-2"}
                        >
                            <Plus size={20} />
                            {"Add Product"}
                        </Button>
                    </div>

                    {showForm && (
                        <div className={"bg-gray-800 rounded-lg p-6 mb-8"}>
                            <h2 className={"text-xl font-bold mb-4"}>{"Add New Product"}</h2>

                            {error && (
                                <Alert variant={"destructive"} className={"mb-4"}>
                                    <AlertDescription>
                                        {error}
                                    </AlertDescription>
                                </Alert>
                            )}

                            {success && (
                                <Alert variant={"success"} className={"mb-4"}>
                                    <AlertDescription>
                                        {success}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit} className={"grid grid-cols-1 md:grid-cols-2 gap-4"}>
                                <Input
                                    type={"text"}
                                    name={"title"}
                                    placeholder={"Product title"}
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    type={"text"}
                                    name={"brand"}
                                    placeholder={"Brand"}
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    type={"text"}
                                    name={"category"}
                                    placeholder={"Category"}
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    type={"number"}
                                    name={"price"}
                                    placeholder={"Price"}
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step={"0.01"}
                                    min={"0"}
                                    required
                                />
                                <Input
                                    type={"url"}
                                    name={"imageUrl"}
                                    placeholder={"Image URL"}
                                    value={formData.imageUrl}
                                    onChange={handleInputChange}
                                    className={"md:col-span-2"}
                                    required
                                />
                                <Input
                                    type={"text"}
                                    name={"description"}
                                    placeholder={"Product description"}
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className={"md:col-span-2"}
                                    required
                                />

                                <div className={"md:col-span-2 flex gap-4"}>
                                    <Button
                                        type={"submit"}
                                        disabled={isSubmitting}
                                        className={"flex-1"}
                                    >
                                        {isSubmitting ? "Creating..." : "Create Product"}
                                    </Button>
                                    <Button
                                        type={"button"}
                                        onClick={() => {
                                            setShowForm(false);
                                            resetForm();
                                        }}
                                        variant={"default"}
                                        className={"bg-gray-600 hover:bg-gray-500"}
                                    >
                                        {"Cancel"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Products List */}
                    <div className={"bg-gray-800 rounded-lg p-6"}>
                        <h2 className={"text-xl font-bold mb-4"}>{"Products"}</h2>

                        {loading ? (
                            <div className={"text-center py-8"}>
                                <div className={"animate-pulse text-purple-80"}>{"Loading products..."}</div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className={"text-center py-8 text-gray-400"}>
                                {"No products found. Create your first product!"}
                            </div>
                        ) : (
                            <div className={"overflow-x-auto"}>
                                <table className={"w-full text-left"}>
                                    <thead>
                                        <tr className={"border-b border-gray-700"}>
                                            <th className={"pb-3 text-gray-300"}>{"Product"}</th>
                                            <th className={"pb-3 text-gray-300"}>{"Category"}</th>
                                            <th className={"pb-3 text-gray-300"}>{"Brand"}</th>
                                            <th className={"pb-3 text-gray-300"}>{"Price"}</th>
                                            <th className={"pb-3 text-gray-300"}>{"Created"}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id} className={"border-b border-gray-700"}>
                                                <td className={"py-3"}>
                                                    <div className={"flex items-center gap-3"}>
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.title}
                                                            className={"w-12 h-12 object-cover rounded"}
                                                        />
                                                        <div>
                                                            <p className={"font-medium"}>{product.title}</p>
                                                            <p className={"text-sm text-gray-400 truncate max-w-xs"}>
                                                                {product.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={"py-3 text-gray-300"}>{product.category}</td>
                                                <td className={"py-3 text-gray-300"}>{product.brand}</td>
                                                <td className={"py-3 text-gray-300"}>{"$" + product.price.toFixed(2)}</td>
                                                <td className={"py-3 text-gray-300"}>
                                                    {new Date(product.createdAt).toLocaleDateString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}

export default AdminPanel;
