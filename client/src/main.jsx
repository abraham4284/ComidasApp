import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ComidasApp } from './ComidasApp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComidasApp />
  </StrictMode>,
)
