import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton } from 'react-share'
import { useGameContext } from '../Components/JuegoContex'
export const Resultado = () => {
  const { gameData, updateResultData, modoPersonalizado } = useGameContext()

  useEffect(() => {
    if(modoPersonalizado.normal){
      return alert("estos resultados no se guardan por que has modificado el juego")
    }
    if (gameData) {
     
      updateResultData({
        id: gameData.id,
        correctas: gameData.correctas,
        incorrectas: gameData.incorrectas,
        cantidadPalabras: gameData.cantidadPalabras,
        puntaje: gameData.porcentaje
      })
    }
  }, [])
  return (
    <article>
      <header className='flex justify-center items-center bg-sky-600 h-36 rounded-b-full mb-10 '>
        <h1 className='ml-40 text-white text-6xl text-center font-serif'>
          PaletteWords
        </h1>
        <img src="src/assets/logoStroop.png" className='w-56 -translate-x-9 translate-y-4' alt="" />
      </header>
      <section className=' flex flex-col gap-3 justify-center items-center mb-10'>
        <h1 className='text-4xl text-sky-600 font-semibold '>RESULTADO</h1>
        <h1>Palabras Correctas</h1>
        <h1 className='text-sky-600 text-5xl'>{gameData && gameData.correctas}</h1>
        <h1>Palabras Incorrectas</h1>
        <h1 className='text-sky-600 text-5xl'>{gameData && gameData.incorrectas}</h1>
        <h1>Porcentaje Obtenido</h1>
        <h1 className='text-sky-600 text-5xl '>{gameData && gameData.porcentaje}</h1>
      </section>
      <div className='flex gap-6 justify-center'>
        <Link className='w-24 text-center text-xl pt-4 bg-sky-600 text-white rounded-lg ' to={'/'}>Regresar</Link>
      <FacebookShareButton
        url='https://pattleWords.com/resultados'
        quote={`¡Obtuve ${gameData.porcentaje} puntos en Palette Words! Palabras correctas: ${gameData.correctas}, incorrectas: ${gameData.incorrectas}.`}
        >
        <FacebookIcon borderRadius={10}/>
      </FacebookShareButton>

      <TwitterShareButton 
      url='https://pattleWords.com/resultados'
      quote={`¡Obtuve ${gameData.porcentaje} puntos en Palette Words! Palabras correctas: ${gameData.correctas}, incorrectas: ${gameData.incorrectas}.`}
        >
        <TwitterIcon borderRadius={10}/>
      </TwitterShareButton>
        </div>
    </article>
  )
}