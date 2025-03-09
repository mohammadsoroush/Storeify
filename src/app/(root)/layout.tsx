import { Footer } from "@/components/footer";
import { Header } from "@/components/shared/header";
import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 flex-wrap ">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
