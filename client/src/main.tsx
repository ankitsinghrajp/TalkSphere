import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {HelmetProvider} from "react-helmet-async"
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from 'sonner'
import {Provider} from "react-redux";
import store from './redux/store.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <HelmetProvider>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div onContextMenu={e=>e.preventDefault()}>
    <App />
    <Toaster richColors/>
      </div>
    </ThemeProvider>
  </HelmetProvider>
  </Provider>
)
