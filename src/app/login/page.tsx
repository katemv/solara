"use client";
import { Input } from "@/components/Atoms/Button/Input";
import { Button } from "@/components/Atoms/Button/Button";
import { useState } from "react";
import { SolaraLogo } from "@/assets/icons";

const MailIcon = () => (
    <svg width={"20"} height={"20"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.5"} viewBox={"0 0 24 24"}>
        <rect width={"18"} height={"14"} x={"3"} y={"5"} rx={"2"} />
        <path d={"M3 7l9 6 9-6"} />
    </svg>
);
const LockIcon = () => (
    <svg width={"20"} height={"20"} fill={"none"} stroke={"currentColor"} strokeWidth={"1.5"} viewBox={"0 0 24 24"}>
        <rect width={"14"} height={"10"} x={"5"} y={"11"} rx={"2"} />
        <path d={"M12 17v-2"} />
        <path d={"M7 11V7a5 5 0 0110 0v4"} />
    </svg>
);

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                <form className={"flex flex-col gap-4"}>
                    <Input
                        type={"email"}
                        placeholder={"Email address"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<MailIcon />}
                        autoComplete={"email"}
                    />
                    <Input
                        type={"password"}
                        placeholder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<LockIcon />}
                        autoComplete={"current-password"}
                    />
                    <div className={"flex justify-end"}>
                        <a href={"#"} className={"text-violet-400 text-sm hover:underline"}>{"Forgot password"}</a>
                    </div>
                    <Button className={"mt-2 w-full"}>{"Log in"}</Button>
                </form>
                <div className={"flex justify-center gap-2 text-gray-400 text-sm mt-2"}>
                    <span>{"Don't have an account?"}</span>
                    <a href={"#"} className={"text-violet-400 hover:underline"}>{"Sign up"}</a>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
