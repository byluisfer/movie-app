"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useUser } from "@/app/lib/useUser";
import SearchInput from "./SearchInput";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv" },
];

export default function Header() {
  const user = useUser();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold text-white">
            MovieApp
          </Link>

          {user && <SearchInput />}
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <nav className="flex items-center gap-6 text-sm text-zinc-400">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Avatar + dropdown */}
              <div className="relative">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="relative h-9 w-9 overflow-hidden rounded-full border border-zinc-700"
                >
                  <Image
                    src="/avatar-default.webp"
                    alt="User avatar"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md border border-zinc-800 bg-zinc-900 text-sm shadow-lg">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-zinc-800"
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-zinc-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/auth"
              className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
