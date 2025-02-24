import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/nav/footer";
import Header from "./components/nav/header";

import { AuthProvider } from "./provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Grow Together",
  description: "Grow learning, Together",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Header />
            <div className="pt-16">
              {children}
            </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
