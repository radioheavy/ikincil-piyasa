"use client"

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TrendChartProps {
  data: number[]
  height?: number
  color?: string
  animated?: boolean
}

export default function TrendChart({ 
  data, 
  height = 40, 
  color = "url(#gradient)", 
  animated = true 
}: TrendChartProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  // Normalize data to fit in the view box
  const normalizedData = data.map((value, index) => ({
    x: (index / (data.length - 1)) * 100,
    y: ((Math.max(...data) - value) / (Math.max(...data) - Math.min(...data))) * height
  }))

  // Create SVG path
  const path = `M ${normalizedData.map(point => `${point.x},${point.y}`).join(' L ')}`

  // Create area path (for gradient fill)
  const areaPath = `${path} L ${normalizedData[normalizedData.length - 1].x},${height} L 0,${height} Z`

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.5)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0)" />
          </linearGradient>
        </defs>
        
        <motion.path
          d={areaPath}
          fill={color}
          initial={animated ? { opacity: 0 } : undefined}
          animate={isInView ? { opacity: 1 } : undefined}
          transition={{ duration: 1 }}
        />
        
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600"
          initial={animated ? { pathLength: 0 } : undefined}
          animate={isInView ? { pathLength: 1 } : undefined}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
} 