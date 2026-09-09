import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "European Summit of Municipal Associations · Brussels 2026",
  description: "Summit information and RSVP for the European Summit of Municipal Associations, hosted by the Union of Municipalities of Türkiye in Brussels on 13 October 2026.",
  icons: { icon: "/logo-umt-en.jpeg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
