"use client"

import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'framer-motion'

interface CountUpProps {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

export default function CountUp({ value, prefix = '', suffix = '', duration = 2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0.1,
  })
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, value, isInView])

  useEffect(() => {
    if (!ref.current) return
    
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix
      }
    })

    return () => unsubscribe()
  }, [springValue, prefix, suffix])

  return <span ref={ref}>{prefix + '0' + suffix}</span>
} 