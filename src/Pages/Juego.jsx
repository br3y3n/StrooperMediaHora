import { useState, useEffect } from 'react'
import { Resultado } from './Resultado'
import { useGameContext } from '../Components/JuegoContex'

export const Juego = () => {
    const [tiempo, setTiempo] = useState(30)
    const [cantidad, setCantidad] = useState(0)
    const [correctas, setCorrectas] = useState(0)
    const [incorrectas, setIncorrectas] = useState(0)
    const [isActive, setIsActive] = useState(true);
    const [palabraRandom, setPalabraRandom] = useState(3)
    const [colorRandom, setcolorRandom] = useState(1)
    const [clik, setClik] = useState(false)
    const { updateGameData, modo } = useGameContext()
    const [tiempoPalabra, setTiempoPalabra] = useState(modo)
    const [juegoActivo, setJuegoActivo] = useState(true)
    const [division, setDivision] = useState(0)
    const [result, setResult] = useState(0)
    const [estado, setEstado] = useState(false)
    let id = 1;
    const palabras = ["Azul", "Amarillo", " Rojo", "Negro", "Verde", "Purpura", "Naranja"]
    
    const color = [
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-sky-600",
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-yellow-600",
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-red-600",
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-slate-900",
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-lime-500",
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-indigo-600",
        "border-4 border-zinc-950 w-64 h-64 rounded-full text-center pt-28 text-4xl text-orange-400",
    ]

    const comprobar = (correcto) => {
        setClik(true)
      
        setTiempoPalabra(modo)
    
        const PalabraRandom = Math.floor(Math.random() * palabras.length);
        const ColorRandom = Math.floor(Math.random() * color.length)
        setPalabraRandom(PalabraRandom)
        setcolorRandom(ColorRandom)
        if (palabraRandom == colorRandom && correcto == "correcto") {
            setCorrectas(correctas + 1)

        } else if (palabraRandom != colorRandom && correcto == "incorrecto") {
            setCorrectas(correctas + 1)

        } else {
            setIncorrectas(incorrectas + 1)
        } 
    
        setCantidad(cantidad + 1)
        setDivision(correctas / cantidad)
        setResult(division * 100)
        
    }
    useEffect(() => {
        if(juegoActivo){
        const interval = setInterval(() => {
          setTiempoPalabra((prevTiempo) => prevTiempo - 1);
        }, 1000);
       
        if (tiempoPalabra === 0) {
         
          setIncorrectas(incorrectas + 1);
          setCantidad(cantidad + 1)
          setDivision(correctas / cantidad)
          setResult(division * 100)
          const nuevaPalabraRandom = Math.floor(Math.random() * palabras.length);
          const nuevoColorRandom = Math.floor(Math.random() * color.length);
          setPalabraRandom(nuevaPalabraRandom);
          setcolorRandom(nuevoColorRandom);
          setTiempoPalabra(modo); 
        }
        return () => clearInterval(interval);
      }}, [tiempoPalabra, incorrectas, juegoActivo, cantidad, division, result]);
 
    useEffect(() => {
        let interval = null;
        if (isActive && tiempo > 0) {
            interval = setInterval(() => {
                setTiempo((prevTiempo) => prevTiempo - 1);
            }, 1000) ;        
        } else if (isActive && tiempo === 0) {
            setIsActive(false);
            const porcentaje =Math.floor(result).toFixed(2)
           
            updateGameData({
                id: id,
                correctas: correctas,
                incorrectas: incorrectas,
                cantidadPalabras: cantidad,
                porcentaje: porcentaje
            })
            setJuegoActivo(false)
            setEstado(true)
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive, tiempo]);
  return (
    <article>
        {estado == false ?
        <>
    <section className='flex justify-around p-10 mb-10 bg-sky-600 h-40 rounded-b-full text-white text-3xl'>
        <div className='text-center'>
            <h1>{cantidad}</h1>
            <h1 className=''>cantidad de palabras</h1>
        </div>
        <div className='text-center'>
            <h1>{correctas}</h1>
            <h1>Correctas</h1>
        </div>
        <div className='text-center'>
            <h1>{Math.floor(result).toFixed(2)} %</h1>
            <h1>Porcentaje</h1>
        </div>
        <div className='text-center'>
            <h1>{tiempo}</h1>
            <h1>tiempo restante</h1>
        </div>
    </section>

    <section className='flex justify-center mb-12'>
        
        <div className={color[colorRandom]}>{palabras[palabraRandom]}</div>
    </section>
        <section className='flex items-center justify-center gap-36 mb-32'>
            <img src="src/assets/correcto.png" alt=""
                className='w-24 cursor-pointer'
                onClick={() => comprobar("correcto")} />
            <img src="src/assets/incorrecto.png" alt=""
                onClick={() => comprobar("incorrecto")}
                className='w-24 cursor-pointer' />
                
        </section>
   

</>: <Resultado/>}
</article>
  )
}
