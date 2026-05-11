import Image from "next/image";
import { PokeType } from "@/types/pokemon";

export default function PokeTypeCard({ type }: { type: PokeType }) {
  return (
    <span className="flex items-center gap-1 bg-gray-700 text-gray-300 rounded-full px-2 py-0.5 text-xs">
      <Image src={type.image} alt={type.name} width={14} height={14} />
      {type.name}
    </span>
  );
}
