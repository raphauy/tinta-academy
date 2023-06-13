

import { getCourse } from "@/services/courses";
import Image from "next/image";

interface Props{
  params: {
    slug: string
  },
}


export default async function CursoHome({ params }: Props) {
  const slug= params.slug
  const course= await getCourse(slug)

  if (!course) return <div>Couse not found ({slug})</div>

  return (
    <div className="py-10 mx-auto text-center max-w-5x1">
      <h1 className="mb-8 text-4xl font-extrabold text-gray-700">
        {course.title}
      </h1>

      <Image src={course.thumbnail} alt={course.title} width={426} height={240}
          className="object-cover mx-auto my-8 mt-10 border-2 border-gray-700 rounded-xl"/>

      <div className="p-5 m-10 text-lg border rounded-md text-muted-foreground">
        {course.longContent}
      </div>

    </div>

  )
}
