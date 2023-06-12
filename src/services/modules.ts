"use server"

import { ModuleFormValues } from "@/app/admin/course/[slug]/module/add/moduleForm";
import { prisma } from "@/utils/server/db";


export async function getModule(id: string) {

  const found = await prisma.module.findUnique({
    where: {
      id
    },
  });

  return found;
}

export async function getModules(courseId: string) {

  const all = await prisma.module.findMany({
    where: {
      courseId
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return all
}

export async function createModule(courseId: string, data: ModuleFormValues) {
  
  const created= await prisma.module.create({
    data: {
      title: data.title,
      courseId
    }
  })

  return created
}

export async function editModule(id: string, data: ModuleFormValues) {
  
  const created= await prisma.module.update({
    where: {
      id
    },
    data
  })

  return created
}

export async function deleteModule(id: string) {
  
  const deleted= await prisma.module.delete({
    where: {
      id
    },
  })

  return deleted
}