import { useEffect, useState } from "react"


export default function App() {
    const [isStarted, setIsStarted] = useState(false)
    const [isFinished, setIsFinished] = useState(false)

    const [time, setTime] = useState(0)

    const [posX, setPosX] = useState("")
    const [posY, setPosY] = useState("")

    const [endPosX, setEndPosX] = useState(0)
    const [endPosY, setEndPosY] = useState(0)

    useEffect(() => {
        if (isStarted) {
            const randomStartX = Math.floor(Math.random() * (window.innerWidth - 300));
            const randomStartY = Math.floor(Math.random() * (window.innerHeight - 250));
            setPosX(String(randomStartX))
            setPosY(String(randomStartY))

            const randomX = Math.floor(Math.random() * (window.innerWidth - 300));
            const randomY = Math.floor(Math.random() * (window.innerHeight - 250));
            setEndPosX(randomX)
            setEndPosY(randomY)

            const timer = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000)

            return () => clearInterval(timer)
        }
    }, [isStarted])

    useEffect(() => {
        if (isStarted) {
            if (Number(posX) === endPosX && Number(posY) === endPosY) {
                setIsStarted(false)
                setIsFinished(true)
            }
        }
    }, [posX, posY])

    const handleStart = () => {
        setIsStarted(true)
        setTime(0)
    }

    const handleXChange = (e: any) => {
        setPosX(e.target.value)
    }

    const handleYChange = (e: any) => {
        setPosY(e.target.value)
    }

    const handleNewGameStart = () => {
        setIsFinished(false)
        setTime(0)
        setIsStarted(true)
    }

    return (
        <main className="relative w-full min-h-screen bg-[#1e1e20]">
            {isFinished ? (
                <div className="w-full h-full flex flex-col gap-10 pt-8 justify-center items-center">
                    <h1 className="font-bold text-5xl text-gray-300 z-50 p-2 bg-gradient-to-r from-lime-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Játék sikeresen befejezve <span className="text-gray-300 font-extrabold">{time}</span> másodperc alatt!</h1>
                    <button className="text-lg text-gray-300 bg-black border border-transparent hover:border-indigo-600 font-semibold px-3 py-2 rounded-lg" onClick={handleNewGameStart}>Új játék!</button>
                </div>
            ) : (isStarted ? (
                <>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 p-4 z-50">
                        <h1 className="text-5xl text-gray-300 font-bold bg-indigo-600 px-4 py-5 rounded-full">{time}</h1>
                    </div>

                    {/* Rectangles */}
                    <div className="absolute w-[15rem] h-[15rem] bg-green-700 rounded-md z-20" style={{ left: Number(posX), top: Number(posY) }}></div>
                    <div className="absolute w-[15rem] h-[15rem] bg-slate-100 rounded-md z-1" style={{ left: endPosX, top: endPosY }}></div>

                    <div className="w-full min-h-screen flex justify-center items-end gap-5 pb-5">
                        <label className="z-50 text-gray-300 text-xl">
                            X:
                            <input type="number" className="p-2 rounded-lg border-2 text-gray-300 bg-indigo-600 border-indigo-950 focus:outline-none" value={posX} onChange={handleXChange} />
                        </label>
                        <label className="z-50 text-gray-300 text-xl">
                            Y:
                            <input type="number" className="p-2 rounded-lg border-2 text-gray-300 bg-indigo-600 border-indigo-950 focus:outline-none" value={posY} onChange={handleYChange} />
                        </label>
                    </div>
                </>
            ) : (
                <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleStart}>
                    Start
                </button>
            ))}
        </main>
    )
}
