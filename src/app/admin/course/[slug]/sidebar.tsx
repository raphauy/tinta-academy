"use client"

import { Film, ListMusic, PlusCircle } from "lucide-react"  
import { cn } from "@/lib/utils"
import { getModules } from "@/services/modules"
import { getSections } from "@/services/sections"
import { Course, Module, Section } from "@prisma/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import MenuItem from "./menuItem"
import { usePathname } from "next/navigation"
  
  
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  course: Course
}

export function Sidebar({ className, course }: SidebarProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [selectedModuleId, setSelectedModuleId] = useState<string>()
  const [selectedSectionId, setSelectedSectionId] = useState<string>()
  const path= usePathname()
  

  useEffect(() => {
    async function fetch() {
      const modules= await getModules(course.id)
      setModules(modules)
    }
    fetch()
    setSelectedModuleId("")
  
    modules.forEach(module => {
      if (path.includes(module.id))
        setSelectedModuleId(module.id)
    })

    setSelectedSectionId("")
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.id, path])

  useEffect(() => {
    async function fetch() {
      if (selectedModuleId) {
        const res= await getSections(selectedModuleId)
        
        setSections(res)  
      } else {
        setSections([])
      }
    }
    fetch()  

    setSelectedSectionId("")
  
    sections.forEach(section => {
      if (path.includes(section.id))
        setSelectedSectionId(section.id)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedModuleId, path])


  async function onSelectModule(id: string){
    setSelectedModuleId(id)
  }
  async function onSelectSection(id: string){
    setSelectedSectionId(id)
  }

  return (
    <div className={cn("pt-2 border-r pr-1", className)}>
      <div className="border-b">
        <div className="flex items-center my-2">          
          <h2 className="flex-1 text-lg font-semibold tracking-tight">Modules</h2>
          <Link href={`/admin/course/${course.slug}/module/add`} className="ml-4 text-green-600 cursor-pointer">
            <PlusCircle size={25} />
          </Link>
        </div>
        
        {
          modules.map(module => (
            <div key={module.id} >      
              <MenuItem id={module.id} 
                onSelect={onSelectModule} 
                icon={<ListMusic size={22} className="mr-1" />} 
                text={module.title} 
                href={`/admin/course/${course.slug}/module/${module.id}`}
              />
            </div>  
          ))
        }
      </div>


      {
        selectedModuleId && 
        <div className="flex items-center mt-4">          
          <h2 className="flex-1 text-lg font-semibold tracking-tight">Sections</h2>
          <Link href={`/admin/course/${course.slug}/module/${selectedModuleId}/section/add`} className="ml-4 text-green-600 cursor-pointer">
            <PlusCircle size={25} />
          </Link>
        </div>
      }

      {
        selectedModuleId && 
        sections.map(section => (
          <div key={section.id} className="flex items-center">
            <MenuItem id={section.id} 
              onSelect={onSelectSection} 
              icon={<Film size={22} className="mr-1" />}
              text={section.title} 
              href={`/admin/course/${course.slug}/module/${section.moduleId}/section/${section.id}`}
            />
          </div>  
        ))
      }

   </div>
  )
}

