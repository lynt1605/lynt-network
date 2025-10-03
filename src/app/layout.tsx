
import "./globals.css";
import Header from "./template/header";
import Footer from "./template/footer";

export const metadata = {
  title: "My App",
  description: "Demo pastel color",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en">
  <body className="min-h-screen text-gray-800">

    <div className="min-h-screen bg-gradient-to-br from-sky-800 via-sky-300 to-sky-800">
          <Header />
      {children}
    </div>
    <Footer />
  </body>
</html>

  );
}
