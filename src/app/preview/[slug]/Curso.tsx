
import { Button } from "@/components/ui/button";
import { Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface Params {
  course: Course;
}

export default function Curso({ course }: Params) {
  return (
    <div className="py-10 mx-auto text-center max-w-5x1">
      <h1 className="mb-8 text-4xl font-extrabold text-gray-700">
        {course.title}
      </h1>

      <Link href={`/curso/${course.slug}`} >
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={426}
          height={240}
          className="object-cover mx-auto my-8 mt-10 border-2 border-gray-700 rounded-xl"
        />
      </Link>

      <div className="p-5 m-10 text-lg text-gray-700 border rounded-md">{course.longContent}</div>

      <Link href={`/curso/${course.slug}`} >
        <Button className="w-36">Acceder</Button>
      </Link>
    </div>
  );
}
