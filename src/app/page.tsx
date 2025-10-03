import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col bg-gradient-to-br">
      {/* Navbar */}

      {/* Content */}
      <main className="flex-1 flex flex-col items-center justify-center gap-8 px-8 text-center">
        <h1 className="text-4xl font-bold text-purple-700 drop-shadow-sm">
          Welcome to My Next.js Site
        </h1>
        <p className="text-lg max-w-2xl text-gray-600">
          Đây là trang chủ. Hãy bấm vào <span className="font-semibold">Blog</span> trên menu để chuyển trang.
        </p>
      </main>
    </div>
  );
}
