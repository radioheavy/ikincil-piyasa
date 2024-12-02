"use client"

import { useEffect, useRef } from 'react'
import { useAnimationFrame, useMotionValue, useSpring } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

export default function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const colors = [
    'rgba(59, 130, 246, 0.5)',  // blue
    'rgba(147, 51, 234, 0.5)',  // purple
    'rgba(236, 72, 153, 0.5)',  // pink
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current
      if (canvas) {
        const rect = canvas.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 4 + 1,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
  }, [])

  useAnimationFrame(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw particles
    particles.current.forEach(particle => {
      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Mouse interaction
      const dx = smoothMouseX.get() - particle.x
      const dy = smoothMouseY.get() - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < 100) {
        const angle = Math.atan2(dy, dx)
        const force = (100 - distance) * 0.001
        particle.vx += Math.cos(angle) * force
        particle.vy += Math.sin(angle) * force
      }

      // Boundaries
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

      // Apply friction
      particle.vx *= 0.99
      particle.vy *= 0.99

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })

    // Draw connections
    ctx.beginPath()
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    particles.current.forEach((p1, i) => {
      particles.current.slice(i + 1).forEach(p2 => {
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
        }
      })
    })
    ctx.stroke()
  })

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      width={typeof window !== 'undefined' ? window.innerWidth : 1920}
      height={typeof window !== 'undefined' ? window.innerHeight : 1080}
    />
  )
} 