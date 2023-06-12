import { getAllCourses, getCourse } from "@/services/courses";
import { Edit, FilePlus2, PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import { CourseSelect } from "./courseSelect";

interface Props{
  slug: string
}
export default async function CourseBar({ slug }: Props) {

  const courses= await getAllCourses()

  if (!courses) return <div>Courses not found</div>

  async function onSelect(slug: string) {
    "use server"
    console.log("slug pasado: " + slug);
    
  }

  return (    
    <div className="flex w-full text-2xl text-muted-foreground">
      {/**<div className="flex m-1 text-2xl lg:grid lg:grid-cols-3 text-muted-foreground"> */}
      <CourseSelect selected={slug} courses={courses} onSelected={onSelect} />
      <div className="flex items-center">
        <div className="ml-4 text-blue-600 cursor-pointer">
          <Link href={`/admin/course/${slug}/edit`}>
            <Edit size={29} />  
          </Link>
        </div>
        <div className="ml-4 text-red-600 cursor-pointer">
          <Link href={`/admin/course/${slug}/delete`}>
            <Trash2 size={29} />        
          </Link>
        </div>
        <div className="ml-4 text-green-600 cursor-pointer">
          <Link href="/admin/course/add">
            <PlusCircle size={29} />
          </Link>
        </div>
      </div>
    </div>
  )
}
