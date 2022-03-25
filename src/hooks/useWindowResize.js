import { useEffect, useState } from 'react'

const getWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
const getHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

export default function useWindowResize() {
  const [width, setWidth] = useState(getWidth())
  const [height, setHeight] = useState(getHeight())

  useEffect(() => {
    let timeoutId = null
    const onResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setWidth(getWidth())
        setHeight(getHeight())
      }, 150)
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return { width, height }
}
