import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import { BrowserRouter } from 'react-router'
import AuthProvider from 'context/AuthContext'
import App from 'pages/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
