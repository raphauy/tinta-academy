"use client"

import { useEffect, useState } from "react";
import { store } from "@/redux/store";
import { useDispatch } from "react-redux";
import { change } from "@/redux/Features/sideBarOpenSlice";

import { useSession } from "next-auth/react";
import { ArrowLeft, MapPin } from "lucide-react";
import { User } from "next-auth";
import ModuleList from "./ModuleList";
import { DataCourse } from "@/types/dataTypes";
import { getCourse } from "@/services/courses";
import { set } from "@/redux/Features/courseSelectedSlice";

function useSideBar(slug: string) {
    const [open, setOpen] = useState(true);
    const dispatch= useDispatch();
    const [curso, setCurso] = useState<DataCourse>();

    useEffect(() => {
      async function fetchCurso() {
          const cursoEncontrado = await getCourse(slug);      
          if (cursoEncontrado) {
              setCurso(cursoEncontrado)
//              dispatch(set(cursoEncontrado))    
          }
      }
      fetchCurso();


      // const unsubscribe = store.subscribe(() => {
      //     const cursoDeStore= store.getState().courseSelected.value

      //     if (cursoDeStore.title) {
      //         setCurso(cursoDeStore);
      //     }    
      //   });      
      
      //   return () => {
      //     unsubscribe();
      //   };      
    }, [slug]);

    function handleClick() {
        setOpen(!open)
        dispatch(change())
    }

    function onOpenSideBar() {
      console.log("[SideBar] onOpenSideBar")
      if (!open){
        setOpen(true)
        dispatch(change())
      }
    }

    return { open, curso, handleClick, onOpenSideBar }
}
interface Props{
  slug: string
}

function SideBar({ slug }: Props) {
  const { open, curso, handleClick, onOpenSideBar }= useSideBar(slug)

    return curso ? (
      <div>
      <div className={`h-screen p-2 pt-4 mr-1 relative duration-700 
      ${open ? "w-60" : "w-12"}`} >
        <ArrowLeft
          className={`text-tinta-marron text-3xl rounded-full bg-white 
          absolute -right-3 top-3 border cursor-pointer 
          ${!open && "rotate-180"}`} onClick={() => handleClick()}/>

        <div className="inline-flex">
          <MapPin
            className={` text-2xl rounded cursor-pointer block 
            float-left text-tinta-marron mr-1 ml-1 duration-1000 ${open && "rotate-[360deg]"} `}/>
          <p className={`text-tinta-marron origin-left font-medium text-xl ${!open && "scale-0"}`}>
            Temario
          </p>
        </div>

        <ModuleList cursoProp={curso} onOpenSideBar={onOpenSideBar}/>

      </div> 
    </div>
) : <div></div>
}

export default SideBar