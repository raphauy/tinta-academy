import { CourseFormValues } from "@/app/admin/course/add/courseForm";
import { prisma } from "@/utils/server/db";


export async function getCourse(slug: string) {

  const course = await prisma.course.findUnique({
    where: {
      slug
    },
  });

  return course;

}

export async function getAllCourses() {

  const courses = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return courses

}

export async function createCourse(data: CourseFormValues) {
  
  const created= await prisma.course.create({
    data
  })

  return created
}

export async function editCourse(id: string, data: CourseFormValues) {
  
  const created= await prisma.course.update({
    where: {
      id
    },
    data
  })

  return created
}

export async function deleteCourse(id: string) {
  
  const deleted= await prisma.course.delete({
    where: {
      id
    },
  })

  return deleted
}