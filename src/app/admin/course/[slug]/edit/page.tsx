import { editCourse, getCourse } from "@/services/courses";
import { CourseForm, CourseFormValues } from "../../add/courseForm";
import { Separator } from "@/components/ui/separator";
import { revalidatePath } from "next/cache";
import { Course } from "@prisma/client";

interface Props{
  params: {
    slug: string
  },
  searchParams: {
    edit: string
  }
}

export default async function CourseEditPage({ params}: Props) {
  const slug= params.slug

  const course= await getCourse(slug)
 
  if (course === null) return <div>Course not found ({slug})</div>
  
  async function saveEditedData(data: CourseFormValues): Promise<Course | null> {
    "use server"    

    const edited= course && editCourse(course.id, data)    
    
    revalidatePath("/admin")

    return edited
  }

  return (
    <div className="flex flex-col items-center w-full my-5 space-y-6">
      <div className="min-w-[600px]">
        <h3 className="text-xl font-medium text-center">Edit Course</h3>

        <Separator className="my-5" />
        
        <CourseForm course={course} processData={saveEditedData} />

      </div>
      
    </div>
  )
}