export type DataCourse = {
    id: string
    title: string
    slug: string
    shortContent: string | null
    longContent: string | null
    thumbnail: string
    userId: string | null
}
  
export type DataModule = {
    id: string
    title: string
    courseId: string
}
  
export type DataSection = {
    id: string
    title: string
    content: string | null
    videoUrl: string | null
    videoSource: string
    moduleId: string
}
  