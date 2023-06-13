
import getSession from "@/services/session";
import { headers } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";
import SideBar from "./SideBar";
  
export default async function RootLayout({children,}: {children: React.ReactNode;}) {

    const session= await getSession()   

    const headersList = headers();
    const path = headersList.get('x-url') || "";
    const slug= path.split("/")[4]

    if (!session)
        redirect(`/auth/login?callback=/curso/${slug}`)

    return (
        <>
            <div className="flex flex-row">
                <SideBar slug={slug}/>
                {children}
            </div>
        </>
    )
}
