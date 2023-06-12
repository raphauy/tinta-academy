"use client"

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Module } from "@prisma/client"
import { useRouter } from "next/navigation";

interface Props {
  slug: string
  eliminate: () => Promise<Module | null>;
}

export default function DeleteForm({ slug, eliminate }: Props) {
  const router= useRouter()

  async function handleClick() {
    eliminate()

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">Module deleted</p>
        </pre>
      ),
    })

    router.push(`/admin/course/${slug}`)
  }
  
  return (
    <div>
      <Button
        onClick={() => history.back()}
        type="button"
        variant={"secondary"}
        className="w-32"
      >
        Cancel
      </Button>
      <Button onClick={handleClick} variant="destructive" className="w-32 ml-2">
        Delete
      </Button>
    </div>
  )
}
