import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { Provider } from '@/components/ui/provider'
import { NotesContextProvider } from './contexts/NotesContext'
import { SearchContextProvider } from './contexts/SearchContext'
import { AuthContextProvider } from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Agent Notes App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <Script
          async
          src='https://static.zdassets.com/zendesk_app_framework_sdk/2.0/zaf_sdk.min.js'
          id='ZAF'
          type='text/javascript'
          strategy='beforeInteractive'
        />
      </head>
      <body className={inter.className}>
        <Provider>
          <AuthContextProvider>
            <NotesContextProvider>
              <SearchContextProvider>
                {children}
              </SearchContextProvider>
            </NotesContextProvider>
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  )
}
