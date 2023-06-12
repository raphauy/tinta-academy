import { Separator } from '@/components/ui/separator'
import { deleteModule, getModule } from '@/services/modules'
import { Course, Module } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import DeleteForm from './deleteForm'
import { redirect } from 'next/navigation'

interface Props{
    params: {
      slug: string
      moduleId: string
    }
}
    
export default async function DeletePage({ params }: Props) {
    const slug= params.slug
    const moduleId= params.moduleId
  
    const mod= await getModule(moduleId) 
    if (mod === null) redirect(`/admin/course/${slug}?refresh=${new Date().getMilliseconds()}`)
    
    async function eliminate(): Promise<Module | null> {
        "use server"
        
        const deleted= mod && await deleteModule(mod.id)

        revalidatePath("/admin/course/[slug]")

        return deleted
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium text-center">Delete Module {mod.title}</h3>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">This operation cannot be undone</p>

                <DeleteForm slug={slug} eliminate={eliminate} />
            </div>
        
        </div>
    )
}