import CourseBox from "@/components/courseBox";
import { getAllCourses } from "@/services/courses"
import { PlusCircle, Trash2 } from "lucide-react";
import Link from "next/link";

export default async function AdminPage() {
  const courses= await getAllCourses()
  
  return (
    <section className="flex flex-col items-center pt-6 pb-8 md:py-10">
      
      <div className="flex max-w-[980px] flex-col items-center gap-3">
        <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
          Admin Dashboard
        </h1>
        
        <p className="flex items-center gap-2 text-2xl font-bold text-muted-foreground">
          Selecciona un curso para editar o crea uno nuevo
          <Link href="/admin/course/add"><PlusCircle size={27} color="green" /></Link>
        </p>        
      </div>
      <div className="grid gap-6 mt-5 md:grid-cols-2 lg:grid-cols-3 text-muted-foreground">
        {
          courses.map(course => (
            <Link key={course.id} 
                  href={`/admin/course/${course.slug}`}
            >
              <CourseBox curso={course} />
            </Link>
          ))
        }
      </div>

    </section>
  )
}
