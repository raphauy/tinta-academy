"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { AdvancedImage } from "@cloudinary/react"
import { CloudinaryImage } from "@cloudinary/url-gen"
import { Course } from "@prisma/client"
import { CldUploadButton } from 'next-cloudinary'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import slugify from "slugify"

const profileFormSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(100,{ message: "Title must not be longer than 100 characters." }),
  slug: z.string({required_error: "Press the button to generate slug."}),
  shortContent: z.string()
    .max(100,{ message: "Short content must not be longer than 100 characters." }).optional(),
  longContent: z.string().optional(),
  thumbnail: z.string({required_error: "Thumbnail image is required."}),
})

export type CourseFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<CourseFormValues> = {}

interface Props{
  course?: Course
  processData: (json: CourseFormValues) => Promise<Course | null>
}

export function CourseForm({ course, processData }: Props) {
  const [placeHolderImageUrl, setPlaceHolderImageUrl] = useState("tinta-posts/thxal175stlimthovo7t.png")
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  const placeHolderImage = new CloudinaryImage(placeHolderImageUrl, {cloudName: 'dtm41dmrz'})

  function updateSlug(){
    const title= form.getValues("title").slice(0, 60)
    const slug= slugify(title, {lower: true})
    form.setValue("slug", slug)
  }
  async function onSubmit(data: CourseFormValues) {
    
    const fresh= await processData(data)

    let message= "Curso creado 🏁"
    if (course)
      message= "Curso editado 🏁"

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">{message}</p>
        </pre>
      ),
    })

    fresh && router.push(`/admin/course/${fresh.slug}?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (course) {
      
      form.setValue("title", course.title)
      form.setValue("slug", course.slug)
      form.setValue("thumbnail", course.thumbnail)
      setPlaceHolderImageUrl(course.thumbnail.split("/").slice(-2).join("/"))
      course.shortContent && form.setValue("shortContent", course.shortContent)
      course.longContent && form.setValue("longContent", course.longContent)
    }
  
  }, [form, course])

  function handleUpload(result: any) {
    const img: string = result.info.secure_url;
    form.setValue("thumbnail", img);
    setPlaceHolderImageUrl(img.split("/").slice(-2).join("/"))
  }


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
                <Input placeholder="Marketing del vino" {...field} />
              </FormControl>
              <FormDescription>
                This is the title of the course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="slug" {...field} disabled />                
                </FormControl>
                <Button type="button" className="whitespace-nowrap" onClick={() => updateSlug()} >Generate</Button>
              </div>
              <FormDescription>
                This is the slug of the course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center w-52">
          <CldUploadButton
            options={{maxFiles: 1, tags: ["tinta-academy"]}}
            onUpload={handleUpload}
            uploadPreset="academy"
          >
            <AdvancedImage cldImg={placeHolderImage} />
          </CldUploadButton>
        </div>

        <FormField
          control={form.control}
          name="shortContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Short content"                  
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                This short content is a brief description of the course, it will appear in the 
                list of courses next to the thumbnail.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> 
         <FormField
          control={form.control}
          name="longContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Long content"                  
                  {...field}
                  rows={7}
                />
              </FormControl>
              <FormDescription>
              This long content is an extensive description of the course, it will appear when the student enters the course<br/>
              to watch the videos, it is the main content of the course in text.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> 
        <Button onClick={() => history.back()} type="button" variant={"secondary"} className="w-32">Cancel</Button>
        <Button type="submit" className="w-32 ml-2">Saves</Button>
      </form>
    </Form>
  )
}