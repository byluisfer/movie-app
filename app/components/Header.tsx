"use client";

import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/lib/useUser";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv" },
];

export default function Header() {
  const user = useUser();

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Movie app
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Auth actions */}
        <div className="flex items-center gap-4 text-sm">
          {!user && (
            <Link
              href="/auth"
              className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-500"
            >
              Sign in / Sign up
            </Link>
          )}

          {user && (
            <>
              <span className="hidden text-zinc-500 sm:block">
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded bg-zinc-800 px-3 py-2 text-white transition hover:bg-zinc-700"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
