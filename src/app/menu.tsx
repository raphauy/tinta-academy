import getSession from "@/services/session";
import Link from "next/link";

export default async function Menu() {

    const session= await getSession()
    const user= session?.user
    
    if (!user) return <div>No user found</div>    

    const userIsAdmin= user.role === "admin"

    return (
        <div className="flex flex-1 gap-6 pl-5 md:gap-5">
            {userIsAdmin && <AdminMenu />}
            {!userIsAdmin && <UserMenu />}
        </div>
    );
}


function AdminMenu() {
    return (
        <nav className="flex gap-6 text-lg font-medium text-muted-foreground">
            <ul>
                <li>
                    <Link href="/admin">Admin</Link>
                </li>
            </ul>
        </nav>
    );
}

function UserMenu() {
    return (
        <nav className="flex gap-6 text-lg font-medium text-muted-foreground">
            <ul>
                <li>
                    <Link href="/">Cursos</Link>
                </li>
            </ul>
        </nav>
    );
}
  