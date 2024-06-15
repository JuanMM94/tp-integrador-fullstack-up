import Navbar from "@/shared/Navbar";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import BackgroundVideo from "./(layout)/components/BackgroundVideo";
import "./globals.css";
import { getUser } from "@/lib/actions";
import { AuthProvider } from "@/shared/contexts/AuthContext";
// import { AuthProvider } from "@/shared/contexts/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creador de peluches",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <BackgroundVideo>
            <Container>
              <Navbar />
              {children}
            </Container>
          </BackgroundVideo>
        </AuthProvider>
      </body>
    </html>
  );
}
