import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {HelmetProvider} from "react-helmet-async"
import { ThemeProvider } from './components/theme-provider.tsx'


createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <App />
    </ThemeProvider>
  </HelmetProvider>
)
