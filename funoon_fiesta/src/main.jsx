import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResultsProvider } from '../context/DataContext.jsx'
import { LenisProvider } from '../context/LenisProvider.jsx'
import { AuthProvider } from './Components/AdminLogin/AdminLogin.jsx'

createRoot(document.getElementById('root')).render(
  <LenisProvider>
    <AuthProvider>
      <ResultsProvider>
        <App />
      </ResultsProvider>
    </AuthProvider>
  </LenisProvider>
)
