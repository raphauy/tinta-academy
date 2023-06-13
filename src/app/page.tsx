import { getAllCourses } from "@/services/courses";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const cursos = await getAllCourses();

  return (
    <section className="grid items-center justify-center gap-6 pt-6 pb-8 md:py-10">
      
    <div className="flex max-w-[980px] flex-col items-center gap-3">
      <h1 className="text-3xl font-extrabold leading-tight tracking-tighter text-center md:text-4xl">
        Tinta Academy
      </h1>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        Aquí podrás encontrar diferentes cursos sobre Marketing digital enfocado en el Vino.
      </p>
    </div>
    
    <div className="text-xl font-bold text-center text-muted-foreground">
      <div className="grid gap-6 mt-5 md:grid-cols-2 lg:grid-cols-3">
        {cursos.map(curso => (
          <Link
            key={curso.id}
            href={`/preview/${curso.slug}`}
            className="p-1 transition border-2 border-gray-500 rounded-lg hover:scale-105 hover:border-blue-500"
          >
            {curso.thumbnail && (
              <Image
                src={curso.thumbnail}
                alt={curso.title}
                width={1280}
                height={720}
                className="object-cover border border-gray-500 rounded-lg"
              />
            )}
            <p className="mt-2">{curso.title}</p>
            <p className="mt-2 text-sm border-t">{curso.shortContent}</p>
          </Link>
        ))}
      </div>
    </div>

  </section>


  );
}
