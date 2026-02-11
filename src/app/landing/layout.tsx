import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tomas Learning Platform - Vzdělávej se, roste, uspi se",
  description: "Komplexní platforma pro kariérní rozvoj, vzdělávání a osobní růst. S AI průvodcem, systémem misí a achievementů.",
  openGraph: {
    title: "Tomas Learning Platform - Vzdělávej se, roste, uspi se",
    description: "Komplexní platforma pro kariérní rozvoj, vzdělávání a osobní růst.",
    type: "website",
  },
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body className="landing-body">
        {children}
      </body>
    </html>
  );
}
