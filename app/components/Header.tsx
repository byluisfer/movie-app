import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4">
        <Link href="/" className="text-lg font-semibold">
          MyMediaDB
        </Link>
      </div>
    </header>
  );
}
