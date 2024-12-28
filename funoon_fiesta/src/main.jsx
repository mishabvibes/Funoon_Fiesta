import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ResultsProvider } from '../context/DataContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ResultsProvider>
      <App />
    </ResultsProvider>
  </StrictMode>,
)
