import '@/styles/globals.css'
import { Metadata } from "next"

import { Toaster } from "@/components/ui/toaster"

import { TailwindIndicator } from "@/components/chadcn/tailwind-indicator"
import { ThemeProvider } from "@/components/chadcn/theme-provider"
import { siteConfig } from "@/config/site"
import { fontSans } from '@/utils/front/fonts'
import { cn } from "@/lib/utils"
import AuthContext from '@/utils/front/AuthContext'
import { Navbar } from './navbar'
import { ReduxProviders } from '@/redux/provider'


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },  
}

interface RootLayoutProps {  
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <ReduxProviders>
            <AuthContext>

              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="container relative flex flex-col min-h-screen">
                  <Navbar />
                  
                  <div className="flex flex-col flex-1">
                    {children}                
                    <Toaster />
                  </div>
                </div>            
                <TailwindIndicator />
              </ThemeProvider>

            </AuthContext>          
          </ReduxProviders>  
        </body>
      </html>
    </>
  )
}
