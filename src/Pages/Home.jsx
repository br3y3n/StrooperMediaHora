import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <article className='flex justify-center items-center gap-10 mt-10 '>
        <Link to={'/juego'}>
        <div className='border w-96 h-56 text-4xl rounded-lg shadow-md text-center'>
            Juego
        </div>
        </Link>
         <Link to={'/resultado'}>
        <div className='border w-96 h-56 text-4xl rounded-lg shadow-md text-center '>
            Resultado
        </div>
        </Link>
    </article>
  )
}
