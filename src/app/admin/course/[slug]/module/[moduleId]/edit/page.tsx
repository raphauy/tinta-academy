import { editCourse, getCourse } from "@/services/courses";
import { Separator } from "@/components/ui/separator";
import { revalidatePath } from "next/cache";
import { editModule, getModule } from "@/services/modules";
import { ModuleForm, ModuleFormValues } from "../../add/moduleForm";
import { Module } from "@prisma/client";

interface Props{
  params: {
    slug: string
    moduleId: string
  }
}

export default async function ModuleEditPage({ params }: Props) {
  const moduleId= params.moduleId
  const slug= params.slug

  const course= await getCourse(slug) 
  if (course === null) return <div>Course not found ({slug})</div>

  const mod= await getModule(moduleId) 
  if (mod === null) return <div>Module not found ({moduleId})</div>
  
  async function saveEditedData(data: ModuleFormValues): Promise<Module | null> {
    "use server"    

    const edited= course && editModule(moduleId, data)
    
    revalidatePath("/admin/course/")

    return edited
  }

  return (
    <div className="flex flex-col items-center w-full my-5 space-y-6">
      <div className="min-w-[600px]">
        <h3 className="text-xl font-medium text-center">Edit Module</h3>

        <Separator className="my-5" />
        
        <ModuleForm module={mod} course={course} processData={saveEditedData} />

      </div>
      
    </div>
  )
}