
import { getCourse } from "@/services/courses"
import Curso from "./Curso"

interface Props{
  params: {
    slug: string
  },
}

export default async function PreviewPage({ params }: Props) {
  const slug= params.slug
  const course= await getCourse(slug)

  if (!course) return <div>Couse not found ({slug})</div>

  return <Curso course={course} />
}


