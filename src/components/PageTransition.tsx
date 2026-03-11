import { useEffect, useState, useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

interface PageTransitionProps {
  children: ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [isVisible, setIsVisible] = useState(true)
  const [displayChildren, setDisplayChildren] = useState(children)
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      // First mount — show immediately, no fade delay (critical for FCP/LCP)
      isFirstMount.current = false
      return
    }
    // Subsequent navigations — fade transition
    setIsVisible(false)

    const timeout = setTimeout(() => {
      setDisplayChildren(children)
      setIsVisible(true)
    }, 150)

    return () => clearTimeout(timeout)
  }, [location.pathname])

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {displayChildren}
    </div>
  )
}
