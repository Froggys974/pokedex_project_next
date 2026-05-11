'use client';

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors mb-6"
    >
       ← Retour
    </button>
  );
}
