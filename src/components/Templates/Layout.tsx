import { Header } from "@/components/Organisms/Header/Header";
import { ReactNode } from "react";

export default function Layout({
    children
}: {
  children: ReactNode
}) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}
