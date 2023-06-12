import LongContent from "@/app/admin/course/[slug]/longContent";
import CourseBox from "@/app/admin/courseBox";
import { getCourse } from "@/services/courses";

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
      <section className="container grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
        
        <div className="flex flex-col items-center gap-5">
          <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
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
  