import './globals.css'
import {Lexend} from 'next/font/google'
import {UiLayout} from '@/components/ui/ui-layout'
import {LanguageProvider} from '@/contexts/LanguageContext'

const lexend = Lexend({ subsets: ['latin', 'latin-ext'], variable: '--font-lexend', display: 'swap' })

export const metadata = {
  title: 'Anivera',
  description: 'ANIVERA is an AI universe for veterinary teams and animal care.',
  icons: {
    icon: [{ url: '/AniveraLogo.ico', sizes: '32x32', type: 'image/x-icon' }],
    shortcut: '/AniveraLogo.ico',
    apple: '/AniveraLogo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="bg-anivera-bg font-sans text-anivera-body antialiased">
        <LanguageProvider>
          <UiLayout>{children}</UiLayout>
        </LanguageProvider>
      </body>
    </html>
  )
}
