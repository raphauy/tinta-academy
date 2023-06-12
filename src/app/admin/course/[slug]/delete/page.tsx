import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { deleteCourse, getCourse } from '@/services/courses'
import React from 'react'
import DeleteForm from './deleteForm'
import { Course } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface Props{
    params: {
        slug: string
    },
    searchParams: {
        edit: string
    }
}
  
export default async function DeletePage({ params}: Props) {
    const slug= params.slug
  
    const course= await getCourse(slug)
   
    if (course === null) redirect(`/admin?refresh=${new Date().getMilliseconds()}`)

    async function eliminate(): Promise<Course | null> {
        "use server"
        
        const deleted= course && await deleteCourse(course.id)

        revalidatePath("/admin")

        return deleted
    }


    return (
        <div className="flex flex-col items-center w-full my-5 space-y-6">
            <div className="flex flex-col items-center">
                <h3 className="text-xl font-medium text-center">Delete Course {course.title}</h3>

                <Separator className="my-5" />
                
                <p className="mb-5 text-lg">This operation cannot be undone</p>

                <DeleteForm eliminate={eliminate} />
            </div>
        
        </div>
    )
}