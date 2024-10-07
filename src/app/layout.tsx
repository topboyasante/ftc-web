import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "./providers";
import { ProgressBar } from "@/components/progress-bar";
import { FloatingButton } from "@/components/floating-button";

const font = Familjen_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.freethecitizens.org/"),
  title: "#FreeTheCitizens",
  keywords: [
    "galamsey, Ghana, illegal mining, water pollution, environmental protection, grassroots initiative, advocacy, education, community action, sustainable development, free the citizens",
  ],
  description:
    "Free The Citizens is a grassroots initiative fighting galamsey's devastating impact on Ghana's water bodies. We educate, advocate, and mobilize citizens to protect the environment and ensure clean water for all.",
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    images: [{ url: "/images/default.jpg" }],
  },
  openGraph: {
    title: "#FreeTheCitizens",
    description:
      "Free The Citizens is a grassroots initiative fighting galamsey's devastating impact on Ghana's water bodies. We educate, advocate, and mobilize citizens to protect the environment and ensure clean water for all.",
    url: "https://www.freethecitizens.org/",
    siteName: "#FreeTheCitizens",
    images: [
      {
        url: "/images/default.jpg",
        width: 800,
        height: 600,
      },
      {
        url: "/images/default.jpg",
        width: 1800,
        height: 1600,
        alt: "#stoGalamsey",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={font.className}>
        <ReactQueryProvider>
          <ProgressBar className='fixed top-0 h-1 bg-aljazeera-red z-50'>
            {children}
            <FloatingButton />
          </ProgressBar>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
