import { Separator } from '@/components/ui/separator'
import { deleteModule, getModule } from '@/services/modules'
import { Course, Module, Section } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { deleteSection, getSection } from '@/services/sections'
import { redirect } from 'next/navigation'

interface Props{
    params: {
      slug: string
      moduleId: string
      sectionId: string
    }
}
    
export default async function DeletePage({ params }: Props) {
    const slug= params.slug
    const moduleId= params.moduleId
    const sectionId= params.sectionId
  
    const mod= await getModule(moduleId) 
    if (mod === null) return <div></div>

    const section= await getSection(sectionId) 
    if (section === null) redirect(`/admin/course/${slug}/module/${mod.id}?refresh=${new Date().getMilliseconds()}`)

    async function eliminate(): Promise<Section | null> {
        "use server"
        
        const deleted= mod && await deleteSection(sectionId)

        revalidatePath("/admin/course/[slug]/module/[moduleId]")

        return deleted
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium text-center">Delete Section {section.title}</h3>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">This operation cannot be undone</p>

                <DeleteForm slug={slug} moduleId={moduleId} eliminate={eliminate} />
            </div>
        
        </div>
    )
}