import { useEffect, useState } from "react";
import { store } from "@/redux/store";
import { getModules } from "@/services/modules";
import ModuleComponent from "./Module";
import { DataCourse, DataModule } from "@/types/dataTypes";

function useModuleList(moduleListProps: MolduleListProps) {
    const [curso, setCurso] = useState<DataCourse>(moduleListProps.cursoProp);
    const [modules, setModules] = useState<DataModule[]>([])

    useEffect(() => {
        async function fetch() {
          const modulesLoaded= await getModules(moduleListProps.cursoProp.id)
          setModules(modulesLoaded)
        }
        fetch()
      
        const unsubscribe = store.subscribe(() => {
          const cursoDeStore= store.getState().courseSelected.value

          if (cursoDeStore.title) {
            setCurso(cursoDeStore);
          } else {
            console.log("[ModuleList] No hay curso en store ")
          }  
        });

        return () => {
          unsubscribe();
        };        
    }, [moduleListProps.cursoProp.id]);

    function openSideBar() {
      moduleListProps.onOpenSideBar()
    }

    return { curso, openSideBar, modules }
}


export interface MolduleListProps {
  cursoProp: DataCourse
  onOpenSideBar: () => void;
}

function ModuleList(moduleListProps: MolduleListProps) {
    const { curso, openSideBar, modules }= useModuleList(moduleListProps)

    return (
        <div>
        {modules.map((modulo) => (
          <ul key={modulo.id} className="pt-3">
            <ModuleComponent slug={curso.slug} module={modulo} onOpenSideBar={openSideBar} />
          </ul>
          ))
        }
  
        </div>
  )
}

export default ModuleList