import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConfigProvider } from "antd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Edsoft",
  description: "Gestiona tu institución educativa de manera eficiente",
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
        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorBgContainer: "var(--color-table)",
                colorText: "text-destructive",
                colorTextHeading: "text-destrcutive",
                rowHoverBg: "bg-background",
                headerBg: "bg-background",
                borderColor:
                  "color-mix(in oklch, var(--color-base-content) 5%, #0000)",
                headerSplitColor:
                  "color-mix(in oklch, var(--color-base-content) 5%, #0000)",
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
