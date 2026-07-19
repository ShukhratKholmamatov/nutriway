import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-wine-950 px-6 text-center">
      <div>
        <p className="font-display text-7xl text-gold-400">404</p>
        <p className="mt-4 font-display text-2xl text-bone-50">
          Sahifa topilmadi / Страница не найдена
        </p>
        <Link
          href="/uz"
          className="mt-8 inline-flex h-13 items-center rounded-[var(--radius-md)] bg-gold-500 px-7 font-semibold text-wine-950 transition-colors hover:bg-gold-400"
        >
          Bosh sahifa / На главную
        </Link>
      </div>
    </div>
  );
}
