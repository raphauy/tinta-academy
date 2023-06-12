import getSession from "@/services/session";
import CourseBar from "./courseBar";
import { Sidebar } from "./sidebar";
import { getCourse } from "@/services/courses";
import { getModule } from "@/services/modules";
import { redirect } from "next/navigation";

interface Props{
    params: {
      slug: string
      moduleId: string
    },
    children: {
        children: React.ReactNode
    }
  }
  
export default async function AdminLayout({ children, params }: Props) {

    const slug= params.slug
    const moduleId= params.moduleId
  
    const session= await getSession()

    if (!session)
        return <div>No session</div>

    const course= await getCourse(slug)
    if (!course) return redirect(`/admin?refresh=${new Date().getMilliseconds()}`)

    const selectedModule= moduleId && await getModule(moduleId)

    return (
        <div className="flex flex-col items-center flex-1">
            <div className="flex justify-center w-full border-b">
                {/* @ts-expect-error Server Component */}
                <CourseBar slug={slug} />
            </div>

            <div className="flex flex-1 w-full gap-1">
                {/* @ts-expect-error Server Component */}
                <Sidebar course={course} />
                {children}
            </div>
        </div>
    );
}
