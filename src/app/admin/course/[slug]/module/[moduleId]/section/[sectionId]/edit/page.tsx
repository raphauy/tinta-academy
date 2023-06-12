import { editCourse, getCourse } from "@/services/courses";
import { Separator } from "@/components/ui/separator";
import { revalidatePath } from "next/cache";
import { editModule, getModule } from "@/services/modules";
import { Module, Section } from "@prisma/client";
import { editSection, getSection } from "@/services/sections";
import { SectionForm, SectionFormValues } from "../../add/sectionForm";

interface Props{
  params: {
    slug: string
    moduleId: string
    sectionId: string
  }
}

export default async function SectionEditPage({ params }: Props) {
  const slug= params.slug
  const moduleId= params.moduleId
  const sectionId= params.sectionId

  const course= await getCourse(slug) 
  if (course === null) return <div>Course not found ({slug})</div>

  const mod= await getModule(moduleId) 
  if (mod === null) return <div>Module not found ({moduleId})</div>

  const section= await getSection(sectionId) 
  if (section === null) return <div>Section not found ({moduleId})</div>

  async function saveEditedData(data: SectionFormValues): Promise<Section | null> {
    "use server"    

    const edited= section && editSection(sectionId, data)
    
    revalidatePath("/admin/course/")

    return edited
  }

  return (
    <div className="flex flex-col items-center w-full my-5 space-y-6">
      <div className="min-w-[600px]">
        <h3 className="text-xl font-medium text-center">Edit Section</h3>

        <Separator className="my-5" />
        
        <SectionForm section={section} module={mod} course={course} processData={saveEditedData} />

      </div>
      
    </div>
  )
}