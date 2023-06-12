import { getCourse } from "@/services/courses";
import CourseBox from "../../courseBox";
import LongContent from "./longContent";

interface Props{
  params: {
    slug: string
  },
  searchParams: {
    edit: string
  }
}

export default async function CoursePage({ params}: Props) {
  const slug= params.slug  

  const course= await getCourse(slug)

  if (!course) return <div>Course not found</div>
  
    return (
      <section className="w-full">        
        <div className="flex flex-col items-center gap-2">
          <h1 className="py-2 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            {course.title}
          </h1>
          <div className="w-96">
            <CourseBox course={course} />
          </div>
          <div className="text-lg">
          {course.longContent && <LongContent content={course.longContent} />}
          </div>
          
        </div>
      </section>
    )
  }
  