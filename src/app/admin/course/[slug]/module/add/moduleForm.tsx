"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Course, Module } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const profileFormSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(30,{ message: "Title must not be longer than 30 characters." }),
})

export type ModuleFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ModuleFormValues> = {}

interface Props{
    module?: Module
    course: Course
    processData: (json: ModuleFormValues) => Promise<Module | null>
}

export function ModuleForm({ module, course, processData }: Props) {
  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  async function onSubmit(data: ModuleFormValues) {
    const created= await processData(data)
    if (!created) {
        toast({
            variant: "destructive",
            title: "Algo salió mal!",
            description: "No se pudo crear el módulo",
        })      
        return
    }

    let message= "Módulo creado 🏁"
    if (module)
      message= "Módulo editado 🏁"

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">{message}</p>
        </pre>
      ),
    })

    router.push(`/admin/course/${course.slug}/module/${created.id}?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (module) {
      
      form.setValue("title", module.title)
    }
  
  }, [form, module])

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                    <Input placeholder="Module 1" {...field} />
                    </FormControl>
                    <FormDescription>
                    This is the title of the module.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
            <Button type="submit" className="w-32 ml-2">Save</Button>
      </form>
    </Form>
  )
}