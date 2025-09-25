import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-24">
      <div className="text-center">
        <p className="text-sm font-semibold">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Page introuvable</h1>
        <p className="mt-4 text-base text-gray-600">
          Désolé, nous n'avons pas trouvé la page que vous cherchez.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-50"
          >
            <span aria-hidden>←</span>
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}