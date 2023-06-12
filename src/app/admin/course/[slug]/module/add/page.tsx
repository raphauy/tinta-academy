
import { Separator } from "@/components/ui/separator";
import React from "react";
import { revalidatePath } from "next/cache";
import { createCourse, getCourse } from "@/services/courses";
import { ModuleForm, ModuleFormValues } from "./moduleForm";
import { createModule } from "@/services/modules";
import { Module } from "@prisma/client";

export const revalidate= 0

interface Props{
    params: {
      slug: string
    },
    searchParams: {
      edit: string
    }
}  
  
export default async function AddModule({ params }: Props) {
    const slug= params.slug  

    const course= await getCourse(slug)

    if (!course) return <div>Course not found</div>
  
    async function saveData(data: ModuleFormValues): Promise<Module | null> {
    "use server"

        if (!course) return null

        const created= await createModule(course?.id, data)

        revalidatePath("/admin")

        return created    
    }

    return (
    <div className="flex flex-col items-center w-full my-10 space-y-6">
        <div className="min-w-[600px]">
        <h3 className="text-lg font-medium text-center">Add Module</h3>
        <h4 className="text-center">({course.title})</h4>

        <Separator className="my-5" />
        
        <ModuleForm course={course} processData={saveData} />
        
        </div>
        
    </div>
    )
}