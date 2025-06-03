"use client";

import { Mail, Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Atoms/Button";
import { Input } from "@/components/Atoms/Input";
import { Alert, AlertDescription } from "@/components/UI";
import { useAuth } from "@/contexts/AuthContext";
import { SolaraLogo } from "@/assets/icons";

function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { register } = useAuth();
    const router = useRouter();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Name is required");
            return false;
        }

        if (!formData.email.trim()) {
            setError("Email is required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });
            router.push("/");
        } catch (err: unknown) {
            setError("Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={"min-h-screen w-full flex items-center justify-center bg-auth-gradient py-8"}>
            <div className={"bg-gray-900 rounded-2xl shadow-xl p-10 w-full max-w-md flex flex-col gap-8 relative"}>
                <div className={"size-10 self-end"}>
                    <SolaraLogo />
                </div>
                <div className={"flex flex-col gap-2 mt-8"}>
                    <h2 className={"text-2xl font-bold text-white"}>{"Create Account"}</h2>
                    <p className={"text-gray-400 text-sm"}>{"Join Solara and start your interstellar shopping journey."}</p>
                </div>

                {error && (
                    <Alert variant={"destructive"}>
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
                    <Input
                        type={"text"}
                        name={"name"}
                        placeholder={"Full name"}
                        value={formData.name}
                        onChange={handleInputChange}
                        icon={<User size={20} />}
                        autoComplete={"name"}
                        required
                    />
                    <Input
                        type={"email"}
                        name={"email"}
                        placeholder={"Email address"}
                        value={formData.email}
                        onChange={handleInputChange}
                        icon={<Mail size={20} />}
                        autoComplete={"email"}
                        required
                    />
                    <Input
                        type={"password"}
                        name={"password"}
                        placeholder={"Password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        icon={<Lock size={20} />}
                        autoComplete={"new-password"}
                        required
                    />
                    <Input
                        type={"password"}
                        name={"confirmPassword"}
                        placeholder={"Confirm password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        icon={<Lock size={20} />}
                        autoComplete={"new-password"}
                        required
                    />
                    <Button
                        type="submit"
                        className={"mt-2 w-full"}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                </form>
                <div className={"flex justify-center gap-2 text-gray-400 text-sm mt-2"}>
                    <span>{"Already have an account?"}</span>
                    <Link href={"/login"} className={"text-violet-400 hover:underline"}>{"Sign in"}</Link>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
