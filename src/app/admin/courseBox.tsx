import { Course } from "@prisma/client";
import Image from "next/image";

interface Props{
    course: Course
}
export default function CourseBox({ course }: Props) {
  return (
    <div className="h-full p-1 border border-gray-400 rounded-lg ">
      <Image
        src={course.thumbnail}
        alt={course.title}
        width={1280}
        height={720}
        className="object-cover border border-gray-500 rounded-lg"
      />
      <div className="mt-2">{course.shortContent}</div>
    </div>
  );
}
