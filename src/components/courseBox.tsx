import { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Props{
    curso: Course
    showContent?: boolean
}
export default function CourseBox({ curso, showContent }: Props) {
  return (
    <div className="pb-2 text-xl text-center transition border-2 rounded-lg hover:scale-105 hover:border-blue-500">
        {curso.thumbnail && (
        <Image
            src={curso.thumbnail}
            alt={curso.title}
            width={1280}
            height={720}
            className="object-cover border border-gray-500 rounded-t-lg"
        />
        )}
        <p className="mt-2 font-bold">{curso.title}</p>
        { showContent && <p className="mt-2 text-sm border-t">{curso.shortContent}</p>}
    </div>

  )
}
