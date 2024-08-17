import { useState } from 'react'

import './App.css'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Juego } from './Pages/Juego'
import { Resultado } from './Pages/Resultado'
import { JuegoContex } from './Components/JuegoContex'

function App() {
  const Routes =()=>{
    const router = useRoutes([
      {path: '/', element:<Home/>},
      {path:'/juego', element:<Juego/>},
      {path:'/resultado', element:<Resultado/>},
    ])

    return router
  }
  return (
    <>
    <BrowserRouter>
    <JuegoContex>
    <Routes/>
    </JuegoContex>
    </BrowserRouter>
     
    </>
  )
}

export default App
