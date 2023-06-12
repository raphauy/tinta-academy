"use server"

import { SectionFormValues } from "@/app/admin/course/[slug]/module/[moduleId]/section/add/sectionForm";
import { prisma } from "@/utils/server/db";

export async function getSection(id: string) {

  const found = await prisma.section.findUnique({
    where: {
      id
    },
  });

  return found;
}

export async function getSections(moduleId: string) {

  const all = await prisma.section.findMany({
    where: {
      moduleId
    },
    orderBy: {
      createdAt: "asc"
    }
  })

  return all
}

export async function createSection(moduleId: string, data: SectionFormValues) {
  
  const created= await prisma.section.create({
    data: {
      title: data.title,
      content: data.content,
      videoUrl: data.videoUrl,
      videoSource: data.videoSource,
      moduleId
    }
  })

  return created
}

export async function editSection(id: string, data: SectionFormValues) {
  
  const created= await prisma.section.update({
    where: {
      id
    },
    data
  })

  return created
}

export async function deleteSection(id: string) {
  
  const deleted= await prisma.section.delete({
    where: {
      id
    },
  })

  return deleted
}