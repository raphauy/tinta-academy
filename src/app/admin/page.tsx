import { getAllCourses } from "@/services/courses"
import { PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";
import CourseBox from "./courseBox";

export default async function AdminPage() {
  const courses= await getAllCourses()
  
  return (
    <section className="grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
      
      <div className="flex max-w-[980px] flex-col items-center gap-3">
        <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
          Admin Dashboard
        </h1>
        
        <p className="flex items-center gap-2 text-2xl font-bold text-muted-foreground">
          Selecciona un curso para editar o crea uno nuevo
          <Link href="/admin/course/add"><PlusCircle size={27} color="green" /></Link>
        </p>        

        <div className="grid grid-cols-1 gap-2 p-5 mt-3 text-base border rounded-md text-muted-foreground sm:grid-cols-2 md:grid-cols-3">
          {
            courses.map(course => (
              <Link key={course.id} 
                    href={`/admin/course/${course.slug}`}
                    className=""
              >
                <CourseBox course={course} />
              </Link>
            ))
          }
        </div>
      </div>
      
    </section>
  )
}
