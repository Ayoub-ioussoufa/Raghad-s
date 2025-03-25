"use client"

import { useState, useEffect, useRef } from "react"
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
  const starsRef = useRef<{ x: number; y: number; radius: number; twinkleSpeed: number; twinklePhase: number }[]>([])
  const messageTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null) // Updated type


  useEffect(() => {
    // Check if we're on the client side before creating the audio object
    if (typeof window !== 'undefined') {
      const audioInstance = new Audio("/music.mp3")
      setAudio(audioInstance)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      generateStars()
      drawStars()
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    function generateStars() {
      const stars = []

      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * (canvas ? canvas.width : 0);
        const y = Math.random() * (canvas ? canvas.height : 0);
        const radius = Math.random() * 1.5 + 0.3
        const twinkleSpeed = Math.random() * 0.01 + 0.001
        const twinklePhase = Math.random() * Math.PI * 2

        stars.push({ x, y, radius, twinkleSpeed, twinklePhase })
      }

      starsRef.current = stars
    }

    function drawStars() {
      if (!ctx) return
      if (!canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      
      starsRef.current.forEach(star => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.4 + 0.6;
        
        const sizeVariation = 1 + Math.sin(time * star.twinkleSpeed * 0.5 + star.twinklePhase) * 0.15;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * sizeVariation, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
        ctx.fill();
      });
      
      requestAnimationFrame(drawStars);
    }

    function handleClick(e: MouseEvent) {
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      for (const star of starsRef.current) {
        const distance = Math.sqrt(Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2))
        if (distance < star.radius + 10) {
          const randomMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)]
          setMessage(randomMessage)

          if (messageTimerRef.current) {
            clearTimeout(messageTimerRef.current)
          }

          messageTimerRef.current = setTimeout(() => {
            setMessage(null)
            messageTimerRef.current = null
          }, 5000)

          break
        }
      }

      if (audio && !isAudioPlaying) {
        audio.loop = true
        audio.play()
        setIsAudioPlaying(true)
      }
    }

    canvas.addEventListener("click", handleClick)

    drawStars()

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("click", handleClick)
      if (messageTimerRef.current) {
        clearTimeout(messageTimerRef.current)
      }
    }
  }, [isAudioPlaying, audio])

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