import './globals.css'
import {Lexend} from 'next/font/google'
import {UiLayout} from '@/components/ui/ui-layout'
import {LanguageProvider} from '@/contexts/LanguageContext'

const lexend = Lexend({ subsets: ['latin', 'latin-ext'], variable: '--font-lexend', display: 'swap' })

export const metadata = {
  title: 'Anivera',
  description: 'ANIVERA is an AI universe for veterinary teams and animal care.',
  icons: {
    icon: [
      { url: '/SAFLogo.png' },
      { url: '/SAFLogo.png', sizes: '32x32', type: 'image/png' },
      { url: '/SAFLogo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/SAFLogo.png',
    shortcut: '/SAFLogo.png',
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
