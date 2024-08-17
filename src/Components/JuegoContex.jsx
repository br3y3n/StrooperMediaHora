import React, {useState, createContext, useContext } from 'react'

const ResultadoContex= createContext()

export function useGameContext(){
    return useContext(ResultadoContex)
}

export const JuegoContex = ({children}) => {
  const [gameData, setGameData] = useState({ });
  const [resultData, setResultData] = useState([])
  const [modo, setModo] = useState(3)
  const [modoPersonalizado, setModoPersonalizado] = useState({})
  const updateModoPersonalizado = (updateModo)=>{
    setModoPersonalizado(updateModo)
  }
  const updateModo = (modo)=>{
    setModo(modo)
  }
  const updateResultData = (newData)=>{
      setResultData(prev=> [...prev, newData])
  }
  const updateGameData = (newData) => {
    setGameData(newData);
  };
  return (
    <ResultadoContex.Provider
    value={{gameData, updateGameData, resultData, updateResultData, modo, updateModo,modoPersonalizado,updateModoPersonalizado }}
    >{children}</ResultadoContex.Provider>
  )
}
