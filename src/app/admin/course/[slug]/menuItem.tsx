"use client";

import { Button } from "@/components/ui/button";
import { ListMusic, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  text: string
  href: string
  id: string
  onSelect: (id: string) => void
  icon: ReactNode
}
export default function MenuItem({ text, href, id, onSelect, icon }: Props) {
  const path = usePathname()
  
  const isSelected= path.endsWith(id)
  const isInTheMiddle= path.includes(id)
  const variant= isSelected ? "default" : isInTheMiddle ? "secondary" : "ghost"
    
  return (
    <div className="flex-1" onClick={() => onSelect(id)}>
      <Link href={href}>
          
          <Button variant={variant} size="sm"className="justify-start w-full whitespace-nowrap">          
            {icon}
            {text}
          </Button>
      </Link>
    </div>
  );
}
