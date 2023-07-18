import { getAllCourses } from "@/services/courses"
import CourseBox from "@/components/courseBox"
import Link from "next/link";

export default async function Home() {
  const cursos = await getAllCourses();

  return (
    <section className="flex flex-col items-center pt-6 pb-8 md:py-10">
      
      <div className="flex max-w-[980px] flex-col items-center gap-3">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
          Tinta Academy
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Aquí podrás encontrar diferentes cursos sobre Marketing digital enfocado en el Vino.
        </p>
      </div>
      
      <div className="grid gap-6 mt-5 md:grid-cols-2 lg:grid-cols-3 text-muted-foreground">
        {cursos.map(curso => (
          <Link
          key={curso.id}
          href={`/preview/${curso.slug}`}
        >
          <CourseBox curso={curso} showContent/>
        </Link>
        ))}
      </div>

    </section>


  );
}
