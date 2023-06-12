"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ControllerRenderProps, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Course } from "@prisma/client"
import { Title } from "@radix-ui/react-toast"

const selectFormSchema = z.object({
  title: z.string().optional(),
})

export type SelectFormValues = z.infer<typeof selectFormSchema>

// This can come from your database or API.
const defaultValues: Partial<SelectFormValues> = {}

interface Props{
  selected: string
  courses: Course[]
  onSelected: (slug: string) => void
}

export function CourseSelect({ selected, courses, onSelected }: Props) {
  const form = useForm<SelectFormValues>({
    resolver: zodResolver(selectFormSchema),
    defaultValues,
    mode: "onChange",    
  })
  const router= useRouter()

  async function onSelect(e: React.ChangeEvent<HTMLSelectElement>){
    const slug= e.target.value
    onSelected(slug)
    router.push(`/admin/course/${slug}`)
  }

  return (
    <select 
      onChange={(e) => onSelect(e)}
      defaultValue={selected}
      className="px-1 py-1 my-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      {courses.map(course => (
        <option
          className="text-gray-800"
          key={course.id} 
          value={course.slug}
        >
          {course.title}
        </option>
        ))
      }
    </select>

)
}