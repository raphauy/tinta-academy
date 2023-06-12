"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Course, Module, Section } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CldUploadButton } from "next-cloudinary"
import { Upload } from "lucide-react"

const formSchema = z.object({
  title: z.string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(30,{ message: "Title must not be longer than 30 characters." }),
  content: z.string().optional(),
  videoUrl: z.string({required_error: "Video URL is required."}),
  videoSource: z.string({required_error: "video Source is required."}),
})

export type SectionFormValues = z.infer<typeof formSchema>

// This can come from your database or API.
const defaultValues: Partial<SectionFormValues> = {
  videoSource: "Cloudinary"
}

interface Props{
    section?: Section
    module: Module
    course: Course
    processData: (json: SectionFormValues) => Promise<Section | null>
}

export function SectionForm({ section, module, course, processData }: Props) {
  const form = useForm<SectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })
  const router= useRouter()

  async function onSubmit(data: SectionFormValues) {
    const created= await processData(data)
    if (!created) {
        toast({
            variant: "destructive",
            title: "Something went wrong",
            description: "Could not create/edit section",
        })      
        return
    }

    let message= "Section created 🏁"
    if (section)
      message= "Section edited 🏁"

    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <p className="text-xl text-white">{message}</p>
        </pre>
      ),
    })

    router.push(`/admin/course/${course.slug}/module/${module.id}/section/${created.id}?refresh=${new Date().getMilliseconds()}`)
  }

  useEffect(() => {
    // set fields por edit mode
    if (section) {      
      form.setValue("title", section.title)
      section.content && form.setValue("content", section.content)
      form.setValue("videoUrl", section.videoUrl)
      form.setValue("videoSource", section.videoSource)
    }
  
  }, [form, section])


  function handleUpload(result: any) {
    const videoUrl: string = result.info.secure_url;
    console.log("video videoUrl: " + videoUrl);
    
    form.setValue("videoUrl", videoUrl);
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
                  <Input placeholder="Section 1" {...field} />
                  </FormControl>
                  <FormDescription>
                  This is the title of the section.
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
                <Upload />
              </CldUploadButton>
            </div>

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
              <FormItem>
                  <FormLabel>Video URL</FormLabel>
                  <FormControl>
                  <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormDescription>
                  This is the video URL of the section.
                  </FormDescription>
                  <FormMessage />
              </FormItem>
              )}              
            />
            <FormField
              control={form.control}
              name="videoSource"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Source</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue="Cloudinary">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue="Cloudinary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Cloudinary">Cloudinary</SelectItem>
                      <SelectItem value="Bunny">Bunny</SelectItem>
                      <SelectItem value="Youtube">Youtube</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the source of the video provided above
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
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
                    This long content is an description of the section and/or the video
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