'use client'

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/utils/authContext';
export default function NavBar() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const logoutSubmit = () => {
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    router.push('/');
  };
  return (
    <nav className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-100 to-white shadow-lg">
      <h2 className="text-2xl bg-black text-transparent bg-clip-text">
          <span className = "font-light">light</span>RYM
      </h2>
      <div className="flex space-x-8">
        <Link href="/" className="text-x1 text-black hover:text-blue-500 transition">
            Home
        </Link>
        <Link href="/about" className="text-x1 text-black hover:text-blue-500 transition">
            About
          </Link>
        <Link href="/contact" className="text-x1 text-black hover:text-blue-500 transition">
            Contact
        </Link>
        {isLoggedIn ? (
          <>
          <Link href="/my_reviews" className="text-x1 text-black hover:text-blue-500 transition">
            My Reviews
          </Link>
          <button
            onClick={logoutSubmit}
            className="text-x1 text-black hover:text-blue-500 transition"
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
          </>
        )
        }
      </div>
    </nav>
  );
}