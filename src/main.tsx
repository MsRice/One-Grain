import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/index.css'
import App from './App.tsx'
import ModalProvider from './contexts/modal/ModalProvider.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import AuthenticationProvider from './contexts/auth/AuthenticationProvider.tsx'
import ThemeProvider from './contexts/themes/ThemeProvider.tsx'
import TasksProvider from './contexts/todo/TasksProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationProvider>
      <ThemeProvider>
        <ModalProvider>
          <TasksProvider>
            <Router>
              <App />
            </Router>
          </TasksProvider>
        </ModalProvider>
      </ThemeProvider>
    </AuthenticationProvider>
  </StrictMode>
)
