"use client"

import { DataSection } from "@/types/dataTypes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useSection(section: DataSection) {
  const path= usePathname()
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    if (path.endsWith(section.id))
      setSelected(true)
    else setSelected(false)
  }, [path, section.id]);

  return { selected }
}

export interface SectionProps {
  slug: string
  section: DataSection
}

export default function SectionComponent({ slug, section }: SectionProps) {
  const { selected }= useSection(section)

  return (
    <>
      <Link href={`/curso/${slug}/${section.id}`} className="cursor-pointer">
        <div className={`text-sm flex items-center gap-x-4 p-1 rounded-md mt-2 ml-10
          hover:bg-tinta-natural hover:text-tinta-marron
          ${selected ? "text-tinta-marron bg-tinta-natural font-bold" : "text-tinta-natural"}`} 
        >
          {section.title}
        </div>
      </Link>              

    </>
  );
}

