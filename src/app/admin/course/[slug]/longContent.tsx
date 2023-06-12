import { Course } from "@prisma/client"

interface Props{
    content: string
}

export default function LongContent({ content }: Props) {
  return (
    <div className="p-5 mt-5 border rounded-md">
        {content}
    </div>
  )
}
