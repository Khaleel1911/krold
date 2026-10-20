import '../index.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToHash from '../components/ScrollToHash'
import HydrationReveal from '../components/HydrationReveal'

export const metadata = {
  title: 'Krold Mfins | Wealth & Insurance',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

// Runs before first paint: applies the saved theme, and hides the server-rendered page
// until React has hydrated (see HydrationReveal) so entrance animations start from blank.
const bootScript = `(function () {
  try {
    var stored = localStorage.getItem('theme');
    var dark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
  document.documentElement.classList.add('hydrating');
})();`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>
        <div id="root">
          <ScrollToHash />
          <Navbar />
          {children}
          <Footer />
        </div>
        <HydrationReveal />
      </body>
    </html>
  )
}
