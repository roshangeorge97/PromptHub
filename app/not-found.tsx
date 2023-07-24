import Link from "next/link"

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
      <div className="mt-6 bg-primary px-2 text-semibold">
        Page Not Found
      </div>
      <button className="mt-4 capitalize btn">
        <Link href="/">Go Home</Link>
      </button>
    </main>
  )
}
