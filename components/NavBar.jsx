'use client'

import { useRouter } from 'next/compat/router';
import Link from 'next/link';

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const router = useRouter();

  const logoutSubmit = () => {
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    router.push('/');
  };
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-100 to-white shadow-lg">
      <div className="flex space-x-8">
        {isLoggedIn ? (
          <>
          <Link href="/" className="text-x1 text-black hover:text-green-500 transition">
            Home
          </Link>
          <Link href="/my_reviews" className="text-x1 text-black hover:text-green-500 transition">
            My Reviews
          </Link>
          <Link href="/contact" className="text-x1 text-black hover:text-green-500 transition">
            Contact
          </Link>
          <button
            onClick={logoutSubmit}
            className="text-x1 text-black hover:text-green-500 transition"
          >
            Logout
          </button>
          </>
        ) : (
            <>
            <Link href="/login" className="text-x1 text-black hover:text-blue-500 transition">
              Login
            </Link>
            <Link href="/register" className="text-x1 text-black hover:text-blue-500 transition">
              Register
            </Link>
            <Link href="/contact" className="text-x1 text-black hover:text-blue-500 transition">
              Contact
            </Link>
          </>
        )
        }
      </div>
    </nav>
  );
}