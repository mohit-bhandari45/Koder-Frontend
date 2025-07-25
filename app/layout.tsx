import ProgressBar from "@/components/shared/progress-bar";
import { CodeRunnerProvider } from "@/context/CodeRunnerContext";
import { MainLoaderProvider } from "@/context/MainLoaderContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import { CodeEditorProvider } from "@/context/CodeEditorContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProgressBar />
        <CodeRunnerProvider>
          <MainLoaderProvider>
            <UserProvider>
              <CodeEditorProvider>{children}</CodeEditorProvider>
            </UserProvider>
          </MainLoaderProvider>
        </CodeRunnerProvider>
      </body>
    </html>
  );
}
