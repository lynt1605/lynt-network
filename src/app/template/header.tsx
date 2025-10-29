import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between">
      {/* Logo / Icon */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-white font-bold">
          LY
        </div>
        <span className="text-lg font-bold text-sky-400">network</span>
      </div>

      {/* Menu */}
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-xl font-medium text-gray-600 hover:text-sky-700 transition">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="text-xl font-medium text-gray-600 hover:text-sky-700 transition">
              Blog
            </Link>
          </li>

          <li>
            <Link href="/dashboard/profile" className="text-xl font-medium text-gray-600 hover:text-sky-700 transition">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/dashboard/video" className="text-xl font-medium text-gray-600 hover:text-sky-700 transition">
              Video
            </Link>
          </li>
          <li>
            <Link href="dashboard/profile" className="text-xl font-medium text-gray-600 hover:text-sky-700 transition">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
