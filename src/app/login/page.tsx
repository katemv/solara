"use client";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/Atoms/Button";
import { Input } from "@/components/Atoms/Input";
import { Alert, AlertDescription } from "@/components/UI";
import { useAuth } from "@/contexts/AuthContext";
import { SolaraLogo } from "@/assets/icons";

function LoginPage() {
    const [email, setEmail] = useState("admin@gmail.com");
    const [password, setPassword] = useState("admin123");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            await login({ email, password });
            router.push("/");
        } catch (err) {
            setError("Incorrect email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={"min-h-screen w-full flex items-center justify-center bg-auth-gradient"}>
            <div className={"bg-gray-900 rounded-2xl shadow-xl p-10 w-full max-w-md flex flex-col gap-8 relative"}>
                <div className={"size-10 self-end"}>
                    <SolaraLogo />
                </div>
                <div className={"flex flex-col gap-2 mt-8"}>
                    <h2 className={"text-2xl font-bold text-white"}>{"Welcome back!"}</h2>
                    <p className={"text-gray-400 text-sm"}>{"Log in with your data that you entered during your registration."}</p>
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
                        type={"email"}
                        placeholder={"Email address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail size={20} />}
                        autoComplete={"email"}
                        required
                    />
                    <Input
                        type={"password"}
                        placeholder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<Lock size={20} />}
                        autoComplete={"current-password"}
                        required
                    />
                    <div className={"flex justify-end"}>
                        <a href={"#"} className={"text-violet-400 text-sm hover:underline"}>{"Forgot password"}</a>
                    </div>
                    <Button
                        className={"mt-2 w-full"}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                </form>
                <div className={"flex justify-center gap-2 text-gray-400 text-sm mt-2"}>
                    <span>{"Don't have an account?"}</span>
                    <Link href={"/register"} className={"text-violet-400 hover:underline"}>{"Sign up"}</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
