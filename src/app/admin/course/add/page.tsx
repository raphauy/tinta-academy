import { Separator } from "@/components/ui/separator";
import React from "react";
import { CourseForm, CourseFormValues } from "./courseForm";
import { revalidatePath } from "next/cache";
import { createCourse } from "@/services/courses";
import { redirect } from "next/navigation";
import { Course } from "@prisma/client";

export const revalidate= 0

export default function CourseAddPage() {

  async function saveData(data: CourseFormValues): Promise<Course | null> {
    "use server"
    
    const created= await createCourse(data)    

    console.log(created);
    
    revalidatePath("/admin")
    
    return created
  }

  return (
    <div className="flex flex-col items-center my-10 space-y-6">
      <div className="min-w-[600px]">
        <h3 className="text-lg font-medium text-center">Add Course</h3>
        <p className="text-sm text-center text-muted-foreground">
          Here is when you start to create your course
        </p>

        <Separator className="my-5" />
        
        <CourseForm processData={saveData} />
        
      </div>
      
    </div>
  )
}