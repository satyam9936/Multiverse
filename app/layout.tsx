import {
  ClerkProvider,
} from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'
import {Open_Sans} from 'next/font/google'
import { Metadata } from 'next/dist/lib/metadata/types/metadata-interface'


const font= Open_Sans({subsets: ['latin']})


export const metadata:Metadata={
  title: 'Discord',
  description: 'A Discord clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(
          'bg-white-dark:bg-[#313338]',
          font.className)}>  
          <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}