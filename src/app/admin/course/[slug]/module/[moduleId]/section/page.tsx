import { getCourse } from "@/services/courses";
import { getModule } from "@/services/modules";
import { ListMusic } from "lucide-react";
import { Edit, Film, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props{
  params: {
    slug: string
    moduleId: string
    sectionId: string
  },
}

export default async function ModulePage({ params }: Props) {
  const slug= params.slug  
  const moduleId= params.moduleId
  const sectionId= params.sectionId

  const course= await getCourse(slug)
  if (!course) return <div>Course not found</div>

  const mod= await getModule(moduleId)
  if (!mod) return <div>Module not found</div>
  
    return (
      <section className="w-full">
        
        <div className="flex items-center justify-center gap-2 mt-2">
          <ListMusic size={24} />
          <h1 className="py-2 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              {mod.title}
          </h1>
          <Link href={`/admin/course/${slug}/module/${moduleId}/edit`} className="mx-1 text-blue-600 cursor-pointer">
              <Edit size={28} />          
          </Link>
          <Link href={`/admin/course/${slug}/module/${moduleId}/delete`} className="mx-1 text-red-600 cursor-pointer">
              <Trash2 size={28} />          
          </Link>
        </div>
      </section>
    )
  }
  