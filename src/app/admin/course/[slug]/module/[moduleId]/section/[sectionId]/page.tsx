import { getCourse } from "@/services/courses";
import { getModule } from "@/services/modules";
import { getSection } from "@/services/sections";
import { Edit, Film, Trash2 } from "lucide-react";
import Link from "next/link";
import LongContent from "../../../../longContent";
import VideoPlayerRC from "./videoPlayer";

export const revalidate= 0

interface Props{
  params: {
    slug: string
    moduleId: string
    sectionId: string
  },
  searchParams: {
    refresh: string
  }
}

export default async function SectionPage({ params, searchParams }: Props) {
  const slug= params.slug  
  const moduleId= params.moduleId
  const sectionId= params.sectionId

  const course= await getCourse(slug)
  if (!course) return <div>Course not found</div>

  const mod= await getModule(moduleId)
  if (!mod) return <div>Module not found</div>

  const section= await getSection(sectionId)
  if (!section) return <div>Section not found</div>

  

    return (
      <section className="w-full mx-1">
        
        <div className="flex items-center justify-center gap-2 mt-2">
            <Film size={28}/>
            <h1 className="py-2 text-3xl font-extrabold leading-tight tracking-tighter">
              {section.title}
            </h1>
            <Link href={`/admin/course/${slug}/module/${moduleId}/section/${sectionId}/edit`} className="mx-1 text-blue-600 cursor-pointer">
                <Edit size={26} />          
            </Link>
            <Link href={`/admin/course/${slug}/module/${moduleId}/section/${sectionId}/delete`} className="mx-1 text-red-600 cursor-pointer">
                <Trash2 size={26} />          
            </Link>
        </div>
        <div className="w-full">
        
          {section.videoUrl &&
            <VideoPlayerRC videoId={section.videoUrl.split('/').slice(-2).join('/').replace(/\.[^.]+$/, '')} />
          }
                    
        </div>
        <div className="mt-5 text-lg">
            {section.content && <LongContent content={section.content} />}
        </div>

      </section>
    )
  }
  