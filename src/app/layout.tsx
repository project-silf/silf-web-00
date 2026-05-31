import type { Metadata } from "next";
import type { ReactNode } from "react";
import { config } from "@/lib/config";
import "../styles/index.css";

export const metadata: Metadata = {
  title: config.appName,
  description: "Silf web interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
