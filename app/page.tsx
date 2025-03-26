"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import "./milky-way.css"

const MESSAGES = [
  "Elegance looks effortless on you.",
  "You glow with a quiet beauty.",
  "Some people are worth melting for.",
  "Your voice has the softness of a lullaby and the power of a symphony.",
  "Your eyes sparkle brighter than the stars above.",
  "You’re the definition of effortless grace.",
  "Your voice is a lullaby to the soul.",
  "Every word you speak sounds like a melody.",
  "Every word from you feels like a gift.",
  "Your voice is as soothing as a gentle rain.",
  "Meeting you was like listening to a song for the first time and knowing it would be my favorite.",
  "Your presence is gentle, yet it leaves a lasting impact.",
  "Life is better with you in it.",
  "You’re like a soft melody in a loud world.",
  "Your presence is gentle, yet it leaves a lasting impact.",
  "There’s something timeless about you.",
  "You’re like a rare book,uncommon, intriguing, unforgettable.",
  "I’ll always root for you, even from afar.",
  "No matter what, I’m glad our paths crossed.",
  "You deserve happiness, in whatever form that takes.",
  "You taught me a lot, even if neither of us realized it at the time.",
  "I’ll always be glad I knew you.",
  "You're so smart.",
  "You look amazing everyday.",
  "You make simplicity look sophisticated.",
  "You don’t even realize how brilliant you are.",
  "Your brain is your best feature.",
  "Even at a distance, you still stand out.",
  "You were never just another person, you’re a rare kind of unforgettable.",
  "I don’t think you realize how naturally magnetic you are.",
  "There’s nothing ordinary about you, and that’s what makes you incredible.",
  "No matter where life takes you, you’ll always be someone worth remembering.",
  "Your smile is contagious.",
  "I'm so glad you're you.",
  "You're enough.",
  "You’re more capable than you realize.",
  "You're like sunshine on a rainy day.",
  "You're the poem I never knew how to write.",
  "You bring something rare to the world.",
  "You make things better just by being in them.",
  "You’re naturally intriguing.",
  "You're the risk worth taking.",
  "You move through life with a kind of grace most people lack.",
  "You have an elegance in the way you carry yourself.",
  "You don’t ask for much, but you deserve everything.",
  "Your self-sufficiency is admirable.",
  "You’re more powerful than you think.",
  "You’d hate hearing this, but you’re unforgettable.",
  "You're the sunshine on a cloudy day.",
  "Your independence is impressive.",
  "You don’t need anyone’s approval.",
  "You’re not just intelligent, you’re insightful.",
  "You're gorgeous.",
  "You're an angel.",
  "Even if I get the opportunities to shine with the stars, I would still choose to sit under the rain with you.",
  "And if I could live life again, I would repeat every mistake so long as it leads me back to you.",
  "Maybe we'll never talk again, but at least I got to be liked by you once, and that was the best feeling ever.",
  "A single smile, so small, so true can heal the heart and brighten the view.",
  "Your beauty shines brighter than the break of day, like a masterpiece crafted by the hands of time.",
  "Your beauty is a gentle light.",
  "You're so perfect.",
  "You're such a gentle breeze on a perfect green hill.",
  "Even the moon envies your glow and the ocean sighs at your reflection.",
  "You're the flawlessness that makes the universe jealous.",
  "You're a masterpiece of nature, an ethereal grace.",
  "You’re like the soft glow of daylight on a perfect afternoon.",
  "You shine brighter than the stars on the clearest night.",
  "I'm so proud of you.",
  "I truly appreciate you.",
  "You're so beautiful you could make flowers bloom.",
  "You're so pretty.",
  "Your eyes are so beautiful.",
  "Your eyes have the warmest glow.",
  "You have such beautiful name.",
  "You're so fine.",
  "You have a great sense of humour.",
  "You look so clean.",
  "You're HER. period hhh",
  "Your hair is so pretty.",
  "You're unique.",
  "You're so charismatic.",
  "You're a masterpiece.",
  "You have an unearthly kind of beauty.",
  "You are poetry in motion.",
  "Everything about you is effortlessly stunning.",
  "You radiate an elegance that can’t be put into words.",
  "You're fena.",
  "You're a great example to others.",
  "Being around you makes everything better.",
  "Your eyes are breathtaking.",
  "Your voice is magnificent.",
  "You are perfect just the way you are.",
  "You're wonderful.",
  "You have a tremendous talent.",
  "I admire your ambition and your drive.",
  "You radiate warmth.",
  "You are effervescent.",
]

export default function Home() {
  const [message, setMessage] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<{ x: number; y: number; radius: number }[]>([])
  const animationRef = useRef<number>(0)
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const cleanup = useCallback(() => {
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current)
      messageTimerRef.current = null
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio("/music.mp3")
      audioRef.current.loop = true
    }
    return () => cleanup()
  }, [cleanup])

  const showMessage = useCallback((msg: string) => {
    setMessage(msg)
    
    if (messageTimerRef.current) {
      clearTimeout(messageTimerRef.current)
    }
    
    messageTimerRef.current = setTimeout(() => {
      setMessage(null)
      messageTimerRef.current = null
    }, 5000)
  }, [])

  const handleStarClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const clickedStar = starsRef.current.find(star => {
      const distance = Math.sqrt(Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2))
      return distance < star.radius + 10
    })

    if (clickedStar) {
      const randomIndex = Math.floor(Math.random() * MESSAGES.length)
      showMessage(MESSAGES[randomIndex])

      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e))
      }
    }
  }, [showMessage])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars(canvas)
    }

    function generateStars(canvas: HTMLCanvasElement) {
      const stars = []
      const count = Math.min(2000, Math.floor((canvas.width * canvas.height) / 1000))

      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.3
        })
      }

      starsRef.current = stars
    }

    const drawStars = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const time = Date.now() * 0.001
      
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * (0.01 + Math.random() * 0.01)) * 0.4 + 0.6
        
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`
        ctx.fill()
      })
      
      animationRef.current = requestAnimationFrame(drawStars)
    }

    handleResize()
    animationRef.current = requestAnimationFrame(drawStars)
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("click", handleStarClick)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("click", handleStarClick)
      cleanup()
    }
  }, [handleStarClick, cleanup])

  return (
    <main className="milky-way-container">
      <div className="space-background"></div>
      <div className="milky-way-band"></div>
      <div className="core-glow"></div>
      <div className="star-clusters"></div>
      <canvas ref={canvasRef} className="star-canvas"></canvas>

      {message && (
        <div className="message-popup">
          <p>{message}</p>
        </div>
      )}
    </main>
  )
}