// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Demo pastel color",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-yellow-100 text-gray-800">{children}</body>
    </html>
  );
}
