import { authOptions } from "@/utils/server/auth";
import { getServerSession } from "next-auth/next";


export default async function getSession() {
  return await getServerSession(authOptions);
}
