import type { Metadata } from "next";
import "../styles/globals.css";
import { sohne, agrandir, bagoss } from "@/utils/fonts/fonts";
import LenisProvider from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Juicebox",
  description: "Frontend Assesment - Mike",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${sohne.variable} ${agrandir.variable} ${bagoss.variable}`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
