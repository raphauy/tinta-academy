
import { DropdownMenuProfile } from "@/components/dropDownMenuProfile";
import { Button } from "@/components/ui/button";
import getSession from "@/services/session"
import Image from "next/image";
import Link from "next/link";

export default async function LoginComponent() {    

    const session= await getSession()
    const user= session?.user

    if (!user) return loginButton()


    const avatar= (
        <div>
            {user?.image ?             
            <Image className="rounded-full w-14" src={user?.image} width={116} height={35} alt="logo" /> : 
            <>
            { user.role === "agency" ?
            <div className="font-bold cursor-pointer hover:opacity-80">
                {user?.email || ""}
            </div> :
            <div className="relative inline-block w-8 h-8 overflow-hidden border rounded-full md:h-14 md:w-14">
                Avatar
            </div>
            }
            <span className="absolute block w-2 h-2 bg-green-500 rounded-full right-8 top-4 ring-2 ring-white md:h-3 md:w-3"></span>
        </>        
        }
        </div>
    )

    return (
        <section className="text-base text-gray-700 sm:flex sm:justify-between">
            <div className="flex items-center justify-between cursor-pointer">
                <DropdownMenuProfile>
                    <div className="flex items-center gap-1 px-3">
                        <p className="hidden sm:block text-muted-foreground">{user?.email}</p>
                        {user.image && <Image className="w-12 border rounded-full border-spacing-1" src={user?.image} width={116} height={35} alt="logo" />}
                        {!user.image && <div 
                        className="flex items-center justify-center w-12 h-12 text-2xl text-white rounded-full dark:bg-tinta-vino bg-tinta-marron hover:opacity-80">R</div>}
                    </div>
                </DropdownMenuProfile>
            </div>
        </section>
)
}


function loginButton() {

    return (
        <Link href="/api/auth/signin"><Button>Login</Button></Link>
        
    )
}