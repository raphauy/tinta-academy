"use client"

import LongContent from "@/app/admin/course/[slug]/longContent";
import VideoPlayerRC from "@/app/admin/course/[slug]/module/[moduleId]/section/[sectionId]/videoPlayer";
import { store } from "@/redux/store";
import { getCourse } from "@/services/courses";
import { getModule } from "@/services/modules";
import { getSection } from "@/services/sections";
import { DataSection } from "@/types/dataTypes";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function useSectionPage(sectionId: string, slug: string) {
    const [section, setSection] = useState<DataSection>()
    const [moduleName, setModuleName] = useState<string>("")
    const [courseName, setCourseName] = useState<string>("")    

    useEffect(() => {   
        const cursoDeStore= store.getState().courseSelected.value

        setCourseName(cursoDeStore.title)

        async function fetchSection() {
            const sectionFound= await getSection(sectionId)
            if (!sectionFound) {
                console.log("No se encontró la sección: " + sectionId)
                return
            }
            setSection(sectionFound)
            fetchModule(sectionFound.moduleId)
        }
        fetchSection()
        
        async function fetchModule(moduleId: string) {
            const moduleFound= await getModule(moduleId)
            moduleFound ? setModuleName(moduleFound.title) : setModuleName("Módulo no encontrado")
        }

        async function fetchCourse() {
            const courseFound= await getCourse(slug)
            courseFound && setCourseName(courseFound.title)
        }
        fetchCourse()

        //@ts-ignore
      }, [sectionId, slug]);

      return { section, moduleName, courseName }
}



function SectioniPage() {
  const sectionId = usePathname().split("/")[3];
  const slug = usePathname().split("/")[2];

  const { section, moduleName, courseName }= useSectionPage(sectionId, slug)

  return section ? (
        <>
        <div className="flex flex-col w-full mx-3">
            <div className="my-3">
                <span className="px-2 py-1 text-sm font-bold text-white bg-gray-700 rounded">
                    {courseName}
                </span>
                <span className="text-sm font-bold text-gray-700">
                    {" > " + moduleName + " > " + section.title}
                </span>

            </div>
            <div className="w-full">
                
                <VideoPlayerRC videoId={section.videoUrl.split('/').slice(-2).join('/').replace(/\.[^.]+$/, '')} />         
                        
            </div>
            <div className="mt-5 text-lg">
                {section.content && <LongContent content={section.content} />}
            </div>

        </div>
        </>
  ) : <Image src="/images/180-ring-black-36.svg" alt="spinner" width={50} height={50} className="py-2 mx-auto max-w-5x1"/>
 
}

export default SectioniPage;
