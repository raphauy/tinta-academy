import getSession from "@/services/session"
import { redirect } from "next/navigation"

import { getAllCourses } from "@/services/courses"
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import CourseBox from "../admin/courseBox";


export default async function CursosPage() {

  const session= await getSession()
  if (!session)
    redirect("/api/auth/signin?callbackUrl=/cursos")

    const courses= await getAllCourses()
    
    return (
      <section className="grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
        
        <div className="flex max-w-[980px] flex-col justify-center gap-3">
          <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
            Tinta Academy
          </h1>
          <div className="text-2xl text-muted-foreground">
            
            <div className="grid grid-cols-1 gap-2 p-5 mt-3 text-base border rounded-md sm:grid-cols-2 md:grid-cols-3">
              {
                courses.map(course => (
                  <Link key={course.id} 
                        href={`/cursos/${course.slug}`}
                        className=""
                  >
                    <CourseBox course={course} />
                  </Link>
                ))
              }
            </div>
  
          </div>
        </div>
        
      </section>
    )
  }
  