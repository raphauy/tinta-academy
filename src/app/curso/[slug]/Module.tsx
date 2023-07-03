"use client"

import React, { useState, useEffect } from "react";

import { store } from "@/redux/store";

import { ChevronDown, LayoutDashboard } from "lucide-react";
import { getSections } from "@/services/sections";
import SectionComponent from "./Section";
import { DataModule, DataSection } from "@/types/dataTypes";

function useModule(module: DataModule, onOpenSideBar: () => void) {
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [imOpen, setImOpen] = useState(false);
  const [sections, setSections] = useState<DataSection[]>([]);
  
  useEffect(() => {
    async function fetch() {
      const sectionsLoaded= await getSections(module.id)
      setSections(sectionsLoaded)
    }
    fetch()

    const unsubscribe = store.subscribe(() => {
      const sbo= store.getState().sideBarOpen.value
      setSideBarOpen(sbo);
    });

    return () => {
      unsubscribe();
    };
  }, [module.id]);

  function handleClick() {

    if (!sideBarOpen) {
      console.log("[Module] moduleProp.onOpenSideBar()")
      onOpenSideBar()
    } else {
      setImOpen(!imOpen)
    }

  }

  return { imOpen, sideBarOpen, handleClick, sections }
}

export interface MolduleProps {
  slug: string
  module: DataModule
  onOpenSideBar: () => void;
}

export default function ModuleComponent({ slug, module, onOpenSideBar}: MolduleProps) {

  const { imOpen, sideBarOpen, handleClick, sections }= useModule(module, onOpenSideBar)

  return (
    <>
      <li
        key={module.id}
        className="flex items-center p-1 mt-2 text-sm rounded-md cursor-pointer text-muted-foreground gap-x-4 hover:bg-tinta-natural "
        onClick={() => handleClick()}
      >
        <span className="block float-left text-2xl">
          <LayoutDashboard />
        </span>

        <span
          className={`text-base font-medium flex-1 ${sideBarOpen ? "w-32" : "hidden"}`}
        >
          {module.title}
        </span>
        <ChevronDown
            className={`${imOpen && "rotate-180"}`}
          />
      </li>
      {imOpen && sideBarOpen && (
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="pt-3">
              <SectionComponent slug={slug} section={section} />
            </li>
            ))
          }
        </ul>
      )}

    </>
  );
}


