
import { Separator } from "@/components/ui/separator";
import React from "react";
import { revalidatePath } from "next/cache";
import { createCourse, getCourse } from "@/services/courses";
import { createModule, getModule } from "@/services/modules";
import { Module, Section } from "@prisma/client";
import { SectionForm, SectionFormValues } from "./sectionForm";
import { createSection } from "@/services/sections";

export const revalidate= 0

interface Props{
    params: {
        moduleId: string
        slug: string
    },
    searchParams: {
      edit: string
    }
}  
  
export default async function AddModule({ params }: Props) {
    const slug= params.slug  
    const moduleId= params.moduleId

    const course= await getCourse(slug)
    if (!course) return <div>Course not found</div>

    const mod= await getModule(moduleId)
    if (!mod) return <div>Module not found</div>

    async function saveData(data: SectionFormValues): Promise<Section | null> {
    "use server"

        if (!course || !mod) return null

        const created= await createSection(mod.id, data)

        console.log(created);

        revalidatePath("/admin")

        return created    
    }

    return (
    <div className="flex flex-col items-center w-full my-10 space-y-6">
        <div className="min-w-[600px]">
        <h3 className="text-lg font-medium text-center">Add Section</h3>
        <h4 className="text-center">({course.title}{" > "}{mod.title})</h4>

        <Separator className="my-5" />
        
        <SectionForm module={mod} course={course} processData={saveData} />
        
        </div>
        
    </div>
    )
}