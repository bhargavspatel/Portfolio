import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// ── Camera targets for each section ────────────────────────────────────────
const CAM = {
  default:    { pos: [0, 2.8, 9.5], look: [0, 1.8, 0] },
  about:      { pos: [-0.5, 1.5, -0.2], look: [-0.5, 0.93, -2.2] },
  projects:   { pos: [0.2, 1.75, -0.8], look: [-0.5, 1.5, -2.5] },
  skills:     { pos: [0.5, 2.4, -2.5], look: [1.5, 2.0, -5.1] },
  experience: { pos: [1.5, 2.8, 1.0], look: [6.85, 2.5, -2.0] },
  contact:    { pos: [-3.0, 2.5, 1.5], look: [-6.85, 2.6, -0.5] },
}

// ── Smooth camera controller ────────────────────────────────────────────────
function CameraController({ activeSection }) {
  const { camera } = useThree()
  const posRef = useRef(new THREE.Vector3(0, 5, 14))
  const lookRef = useRef(new THREE.Vector3(0, 1.8, 0))
  const targetPos = useRef(new THREE.Vector3(...CAM.default.pos))
  const targetLook = useRef(new THREE.Vector3(...CAM.default.look))
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    camera.position.set(0, 5, 14)
    const t = activeSection ? CAM[activeSection] : CAM.default
    targetPos.current.set(...t.pos)
    targetLook.current.set(...t.look)
  }, [activeSection, camera])

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5)
      mouse.current.y = (e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(({ camera }) => {
    posRef.current.lerp(targetPos.current, 0.035)
    lookRef.current.lerp(targetLook.current, 0.045)

    // Subtle parallax only in default view
    const px = !activeSection ? mouse.current.x * 0.35 : 0
    const py = !activeSection ? -mouse.current.y * 0.15 : 0

    camera.position.set(
      posRef.current.x + px,
      posRef.current.y + py,
      posRef.current.z
    )
    camera.lookAt(lookRef.current)
  })

  return null
}

// ── Interactive wrapper ─────────────────────────────────────────────────────
function Interactive({ section, onHover, onLeave, onClick, children }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (!groupRef.current) return
    groupRef.current.traverse((child) => {
      if (child.isMesh && child.userData.interactive) {
        if (child.material) {
          child.material.emissiveIntensity = THREE.MathUtils.lerp(
            child.material.emissiveIntensity ?? 0,
            hovered ? (child.userData.hoverIntensity ?? 0.4) : (child.userData.baseIntensity ?? 0),
            0.12
          )
        }
      }
    })
  })

  return (
    <group
      ref={groupRef}
      onClick={(e) => { e.stopPropagation(); onClick(section) }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        onHover(section)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        onLeave()
        document.body.style.cursor = 'default'
      }}
    >
      {children}
    </group>
  )
}

// ── Floor ───────────────────────────────────────────────────────────────────
function Floor({ theme }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[24, 20]} />
      <meshStandardMaterial
        color={theme === 'light' ? '#b8915a' : '#1a1208'}
        roughness={theme === 'light' ? 0.85 : 0.6}
        metalness={theme === 'light' ? 0.0 : 0.1}
      />
    </mesh>
  )
}

// ── Room shell ──────────────────────────────────────────────────────────────
function Walls({ theme }) {
  const wallColor  = theme === 'light' ? '#d4dcc8' : '#0e1a0e'
  const ceilColor  = theme === 'light' ? '#e8ede0' : '#091209'
  return (
    <group>
      <mesh position={[0, 3.5, -5.2]} receiveShadow>
        <planeGeometry args={[16, 7]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[-7, 3.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[7, 3.5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[14, 7]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} metalness={0} />
      </mesh>
      <mesh position={[0, 7, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 14]} />
        <meshStandardMaterial color={ceilColor} roughness={1} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Window (daylight or night sky depending on theme) ──────────────────────
function WindowPanel({ theme }) {
  const glowRef = useRef()
  const isLight = theme === 'light'

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = isLight
        ? 1.2 + Math.sin(clock.elapsedTime * 0.3) * 0.05
        : 0.6 + Math.sin(clock.elapsedTime * 0.4) * 0.05
    }
  })

  // Stable random values so stars don't re-scatter on re-render
  const stars = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    id: i,
    y: (Math.sin(i * 7.3) * 0.5) * 2.2,
    z: (Math.cos(i * 4.1) * 0.5) * 1.4,
    r: 0.008 + (Math.abs(Math.sin(i * 13.7)) * 0.012),
    o: 0.3 + Math.abs(Math.sin(i * 9.1)) * 0.7,
  })), [])

  return (
    <group position={[-6.9, 3.5, 0.8]}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[0.12, 2.6, 1.8]} />
        <meshStandardMaterial
          color={isLight ? '#c8b89a' : '#1a1a2e'}
          roughness={0.5} metalness={isLight ? 0.1 : 0.6}
        />
      </mesh>

      {/* Window glass — misty garden (day) / moonlit forest (night) */}
      <mesh ref={glowRef} position={[0.04, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.6, 2.4]} />
        <meshStandardMaterial
          color={isLight ? '#a8d8a0' : '#0a1a08'}
          emissive={isLight ? '#78c878' : '#1a3a1a'}
          emissiveIntensity={isLight ? 1.0 : 0.5}
          roughness={0} metalness={0}
          transparent opacity={isLight ? 0.88 : 0.92}
        />
      </mesh>

      {/* Day: cherry blossom petals */}
      {isLight && [
        [0.1,  0.6],  [-0.3,  0.3], [0.2, -0.1],
        [-0.1, -0.5], [0.3,   0.0], [-0.2, 0.7],
      ].map(([cy, cz], i) => (
        <mesh key={i} position={[0.06, cy, cz]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.05 + (i % 3) * 0.03, 6]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#ffb7c5' : '#ff8fab'} transparent opacity={0.7} />
        </mesh>
      ))}

      {/* Day: bamboo stalks */}
      {isLight && [-0.45, -0.1, 0.3].map((z, i) => (
        <mesh key={`b${i}`} position={[0.06, 0, z]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.04, 2.2]} />
          <meshBasicMaterial color={['#5a8a3a', '#4a7a2a', '#6a9a4a'][i]} transparent opacity={0.6} />
        </mesh>
      ))}

      {/* Night: fireflies */}
      {!isLight && stars.map(({ id, y, z, r, o }) => (
        <mesh key={id} position={[0.06, y, z]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[r, 4]} />
          <meshBasicMaterial color={id % 3 === 0 ? '#a0ff80' : '#80ffb0'} transparent opacity={o * 0.8} />
        </mesh>
      ))}

      {/* Night: moonlight glow */}
      {!isLight && (
        <mesh position={[0.06, 0.7, 0.1]} rotation={[0, Math.PI / 2, 0]}>
          <circleGeometry args={[0.18, 16]} />
          <meshBasicMaterial color="#e8f8d0" transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  )
}

// ── Desk ────────────────────────────────────────────────────────────────────
function Desk() {
  const wood = <meshStandardMaterial color="#3b1f0c" roughness={0.7} metalness={0.05} />
  const metal = <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.9} />

  return (
    <group position={[-0.5, 0, -2.2]}>
      {/* Tabletop */}
      <mesh position={[0, 0.82, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.08, 1.4]} />
        {wood}
      </mesh>
      {/* Legs */}
      {[[-1.25, -1.25], [-1.25, 0.55], [1.25, -1.25], [1.25, 0.55]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.38, z]} castShadow>
          <cylinderGeometry args={[0.035, 0.035, 0.76, 8]} />
          {metal}
        </mesh>
      ))}
      {/* Keyboard */}
      <mesh position={[0.1, 0.875, 0.2]} castShadow>
        <boxGeometry args={[0.78, 0.022, 0.28]} />
        <meshStandardMaterial color="#0d0d14" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Mouse */}
      <mesh position={[0.65, 0.875, 0.2]} castShadow>
        <sphereGeometry args={[0.06, 10, 6]} />
        <meshStandardMaterial color="#111120" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  )
}

// ── Monitor (PROJECTS) ──────────────────────────────────────────────────────
function Monitor({ onHover, onLeave, onClick }) {
  const screenRef = useRef()
  useFrame(({ clock }) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.9 + Math.sin(clock.elapsedTime * 1.5) * 0.06
    }
  })

  return (
    <Interactive section="projects" onHover={onHover} onLeave={onLeave} onClick={onClick}>
      <group position={[-0.5, 0.86, -3.0]}>
        {/* Stand base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.16, 0.2, 0.04, 16]} />
          <meshStandardMaterial color="#1a1a2a" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Stand neck */}
        <mesh position={[0, 0.36, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 8]} />
          <meshStandardMaterial color="#1a1a2a" roughness={0.3} metalness={0.9} />
        </mesh>
        {/* Frame */}
        <mesh position={[0, 0.82, 0]} castShadow userData={{ interactive: true, baseIntensity: 0.02, hoverIntensity: 0.35 }}>
          <boxGeometry args={[1.5, 0.92, 0.07]} />
          <meshStandardMaterial color="#0d0d18" roughness={0.3} metalness={0.8} emissive="#6366f1" emissiveIntensity={0.02} />
        </mesh>
        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0.82, 0.02]}>
          <planeGeometry args={[1.36, 0.8]} />
          <meshStandardMaterial
            color="#061830"
            emissive="#38bdf8"
            emissiveIntensity={0.9}
            roughness={0}
            metalness={0}
          />
        </mesh>
        {/* Label */}
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.085}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
        >
          [ PROJECTS ]
        </Text>
      </group>
    </Interactive>
  )
}

// ── Nameplate (ABOUT) ───────────────────────────────────────────────────────
function Nameplate({ onHover, onLeave, onClick }) {
  return (
    <Interactive section="about" onHover={onHover} onLeave={onLeave} onClick={onClick}>
      <group position={[-1.3, 0.87, -2.2]}>
        <mesh castShadow userData={{ interactive: true, baseIntensity: 0.05, hoverIntensity: 0.5 }}>
          <boxGeometry args={[0.6, 0.06, 0.24]} />
          <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.9} emissive="#c9a84c" emissiveIntensity={0.05} />
        </mesh>
        <Text
          position={[0, 0.06, 0]}
          fontSize={0.07}
          color="#ffe4a0"
          anchorX="center"
          anchorY="middle"
        >
          B. PATEL
        </Text>
        <Text
          position={[0, 0.2, 0]}
          fontSize={0.045}
          color="#c9a84c"
          anchorX="center"
          anchorY="middle"
        >
          [ ABOUT ]
        </Text>
      </group>
    </Interactive>
  )
}

// ── Desk Lamp ───────────────────────────────────────────────────────────────
function DeskLamp() {
  const bulbRef = useRef()
  useFrame(({ clock }) => {
    if (bulbRef.current) {
      bulbRef.current.material.emissiveIntensity = 2.5 + Math.sin(clock.elapsedTime * 2.0) * 0.15
    }
  })
  return (
    <group position={[0.9, 0.86, -3.05]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.09, 0.12, 0.04, 12]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.84, 8]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0.88, 0]} castShadow>
        <coneGeometry args={[0.18, 0.22, 12]} />
        <meshStandardMaterial color="#b8860b" roughness={0.3} metalness={0.8} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={bulbRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial color="#fff4d0" emissive="#ffb347" emissiveIntensity={2.5} roughness={0} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Bookshelf (EXPERIENCE) ──────────────────────────────────────────────────
// ── Experience Timeline Board (right wall) ──────────────────────────────────
function ExperienceBoard({ onHover, onLeave, onClick }) {
  const scanRef = useRef()
  const glowRef = useRef()

  useFrame(({ clock }) => {
    if (scanRef.current) {
      // scanning line sweeps left to right
      scanRef.current.position.x = -1.25 + ((clock.elapsedTime * 0.55) % 2.5)
    }
    if (glowRef.current) {
      glowRef.current.material.emissiveIntensity = 0.25 + Math.sin(clock.elapsedTime * 0.9) * 0.08
    }
  })

  return (
    <Interactive section="experience" onHover={onHover} onLeave={onLeave} onClick={onClick}>
      <group position={[6.85, 2.6, -2.0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Frame border */}
        <mesh castShadow userData={{ interactive: true, baseIntensity: 0.05, hoverIntensity: 0.35 }}>
          <boxGeometry args={[3.2, 2.2, 0.09]} />
          <meshStandardMaterial color="#0d0820" roughness={0.3} metalness={0.9}
            emissive="#a855f7" emissiveIntensity={0.05} />
        </mesh>
        {/* Screen surface */}
        <mesh ref={glowRef} position={[0, 0, 0.05]}>
          <planeGeometry args={[3.0, 2.0]} />
          <meshStandardMaterial color="#060318" emissive="#3b1060"
            emissiveIntensity={0.25} roughness={0} metalness={0} />
        </mesh>

        {/* Scanning line */}
        <mesh ref={scanRef} position={[-1.25, 0, 0.065]}>
          <planeGeometry args={[0.012, 1.9]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
        </mesh>

        {/* Header text */}
        <Text position={[0, 0.82, 0.07]} fontSize={0.13} color="#c084fc"
          anchorX="center" anchorY="middle" letterSpacing={0.15}>
          EXPERIENCE TIMELINE
        </Text>

        {/* Divider line */}
        <mesh position={[0, 0.62, 0.065]}>
          <planeGeometry args={[2.7, 0.008]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.4} />
        </mesh>

        {/* Timeline horizontal line */}
        <mesh position={[0, 0.08, 0.066]}>
          <planeGeometry args={[2.5, 0.006]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.6} />
        </mesh>

        {/* Datadog node */}
        <mesh position={[-0.85, 0.08, 0.07]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1.5} />
        </mesh>
        <Text position={[-0.85, 0.28, 0.07]} fontSize={0.12} color="#a5b4fc"
          anchorX="center" anchorY="middle">Datadog</Text>
        <Text position={[-0.85, 0.12, 0.07]} fontSize={0.08} color="#6366f1"
          anchorX="center" anchorY="middle">2025 – Now</Text>
        {/* Datadog bullets */}
        {['FastAPI · React · PostgreSQL', 'Celery · RabbitMQ · Docker', 'LLM APIs · Vector Search'].map((t, i) => (
          <Text key={i} position={[-0.85, -0.12 - i * 0.17, 0.07]} fontSize={0.07}
            color="#7c6fa0" anchorX="center" anchorY="middle">{t}</Text>
        ))}

        {/* Chargebee node */}
        <mesh position={[0.85, 0.08, 0.07]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.5} />
        </mesh>
        <Text position={[0.85, 0.28, 0.07]} fontSize={0.12} color="#c4b5fd"
          anchorX="center" anchorY="middle">Chargebee</Text>
        <Text position={[0.85, 0.12, 0.07]} fontSize={0.08} color="#8b5cf6"
          anchorX="center" anchorY="middle">2022 – 2024</Text>
        {['Django · Flask · PostgreSQL', 'Docker · Kubernetes · CI/CD', 'ETL · scikit-learn'].map((t, i) => (
          <Text key={i} position={[0.85, -0.12 - i * 0.17, 0.07]} fontSize={0.07}
            color="#7c6fa0" anchorX="center" anchorY="middle">{t}</Text>
        ))}

        {/* Corner accent dots */}
        {[[-1.42, 0.92], [1.42, 0.92], [-1.42, -0.92], [1.42, -0.92]].map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0.07]}>
            <circleGeometry args={[0.04, 8]} />
            <meshBasicMaterial color="#a855f7" transparent opacity={0.6} />
          </mesh>
        ))}
      </group>
    </Interactive>
  )
}

// ── Whiteboard (SKILLS) ─────────────────────────────────────────────────────
function Whiteboard({ onHover, onLeave, onClick }) {
  return (
    <Interactive section="skills" onHover={onHover} onLeave={onLeave} onClick={onClick}>
      <group position={[1.5, 2.2, -5.15]}>
        {/* Frame */}
        <mesh castShadow userData={{ interactive: true, baseIntensity: 0.01, hoverIntensity: 0.3 }}>
          <boxGeometry args={[2.9, 1.7, 0.07]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} emissive="#6366f1" emissiveIntensity={0.01} />
        </mesh>
        {/* Board surface */}
        <mesh position={[0, 0, 0.04]}>
          <planeGeometry args={[2.7, 1.5]} />
          <meshStandardMaterial color="#f5f5f0" roughness={0.95} metalness={0} emissive="#ffffff" emissiveIntensity={0.08} />
        </mesh>
        {/* "Writing" lines */}
        {[-0.38, -0.08, 0.22].map((y, i) => (
          <mesh key={i} position={[-(0.1 * i), y, 0.05]}>
            <planeGeometry args={[1.8 - i * 0.3, 0.025]} />
            <meshBasicMaterial color="#9ca3af" transparent opacity={0.4} />
          </mesh>
        ))}
        <Text
          position={[0, 0.96, 0.05]}
          fontSize={0.12}
          color="#6366f1"
          anchorX="center"
          anchorY="middle"
        >
          [ SKILLS ]
        </Text>
      </group>
    </Interactive>
  )
}

// ── Contact Portal (left wall) ──────────────────────────────────────────────
function OrbitDot({ radius, speed, phase, color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed + phase
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.y = Math.sin(t) * radius
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 10, 10]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2.5} />
    </mesh>
  )
}

function ContactPortal({ onHover, onLeave, onClick }) {
  const outerRingRef = useRef()
  const innerRingRef = useRef()
  const discRef = useRef()

  useFrame(({ clock }) => {
    if (outerRingRef.current) outerRingRef.current.rotation.z = clock.elapsedTime * 0.35
    if (innerRingRef.current) innerRingRef.current.rotation.z = -clock.elapsedTime * 0.55
    if (discRef.current) {
      discRef.current.material.emissiveIntensity = 0.15 + Math.sin(clock.elapsedTime * 1.2) * 0.08
    }
  })

  return (
    <Interactive section="contact" onHover={onHover} onLeave={onLeave} onClick={onClick}>
      <group position={[-6.85, 2.6, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Outer rotating ring */}
        <mesh ref={outerRingRef} userData={{ interactive: true, baseIntensity: 1.2, hoverIntensity: 2.5 }}>
          <torusGeometry args={[1.05, 0.055, 20, 80]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={1.2} roughness={0} metalness={0.4} />
        </mesh>

        {/* Inner rotating ring */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[0.72, 0.032, 16, 64]} />
          <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.0} roughness={0} metalness={0} />
        </mesh>

        {/* Central disc */}
        <mesh ref={discRef}>
          <circleGeometry args={[0.68, 64]} />
          <meshStandardMaterial color="#0d0820" emissive="#2d1b69" emissiveIntensity={0.15}
            transparent opacity={0.88} roughness={0} metalness={0} />
        </mesh>

        {/* Orbiting dots */}
        <OrbitDot radius={1.05} speed={0.9}  phase={0}              color="#818cf8" />
        <OrbitDot radius={1.05} speed={0.9}  phase={Math.PI * 2/3}  color="#a78bfa" />
        <OrbitDot radius={1.05} speed={0.9}  phase={Math.PI * 4/3}  color="#c4b5fd" />

        {/* Text */}
        <Text position={[0, 0.18, 0.01]} fontSize={0.22} color="#e0e7ff"
          anchorX="center" anchorY="middle" letterSpacing={0.1}>
          CONTACT
        </Text>
        <Text position={[0, -0.12, 0.01]} fontSize={0.1} color="#6366f1"
          anchorX="center" anchorY="middle" letterSpacing={0.08}>
          GET IN TOUCH
        </Text>

        {/* Tick marks on outer ring */}
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2
          const r = 1.05
          return (
            <mesh key={i} position={[Math.cos(a) * r, Math.sin(a) * r, 0.01]}
              rotation={[0, 0, a]}>
              <planeGeometry args={[0.025, 0.1]} />
              <meshBasicMaterial color="#6366f1" transparent opacity={0.5} />
            </mesh>
          )
        })}

        {/* Point light inside portal */}
        <pointLight intensity={3} color="#6366f1" distance={5} />
      </group>
    </Interactive>
  )
}

// ── Indoor plant ────────────────────────────────────────────────────────────
function Plant() {
  return (
    <group position={[-5.5, 0, -4.2]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.15, 0.12, 0.4, 12]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.42, 10, 8]} />
        <meshStandardMaterial color="#1a4a1a" roughness={0.9} metalness={0} />
      </mesh>
      <mesh position={[0.25, 0.65, 0.1]} castShadow>
        <sphereGeometry args={[0.25, 8, 6]} />
        <meshStandardMaterial color="#1f5c1f" roughness={0.9} metalness={0} />
      </mesh>
    </group>
  )
}

// ── Chair ───────────────────────────────────────────────────────────────────
function Chair() {
  const mat = <meshStandardMaterial color="#111118" roughness={0.7} metalness={0.3} />
  return (
    <group position={[-0.5, 0, -0.8]}>
      <mesh position={[0, 0.56, 0]} castShadow>
        <boxGeometry args={[0.64, 0.07, 0.64]} />
        {mat}
      </mesh>
      <mesh position={[0, 1.0, -0.3]} castShadow>
        <boxGeometry args={[0.64, 0.82, 0.07]} />
        {mat}
      </mesh>
      {[[-0.28, -0.28], [-0.28, 0.28], [0.28, -0.28], [0.28, 0.28]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.26, z]} castShadow>
          <cylinderGeometry args={[0.025, 0.025, 0.52, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.24, 8]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.9} />
      </mesh>
      {[0, 72, 144, 216, 288].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        return (
          <group key={i} rotation={[0, rad, 0]}>
            <mesh position={[0.28, 0.06, 0]} rotation={[0, 0, Math.PI * 0.08]}>
              <cylinderGeometry args={[0.02, 0.02, 0.62, 6]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.9} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// ── Floating title ──────────────────────────────────────────────────────────
function RoomTitle() {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = 5.5 + Math.sin(clock.elapsedTime * 0.6) * 0.04
    }
  })
  return (
    <group ref={ref} position={[0, 5.5, -5.1]}>
      <Text
        fontSize={0.55}
        color="#e5e7eb"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
      >
        BHARGAV PATEL
      </Text>
      <Text
        position={[0, -0.55, 0]}
        fontSize={0.18}
        color="#6366f1"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.2}
      >
        SOFTWARE ENGINEER
      </Text>
    </group>
  )
}

// ── Hint text (UI) ──────────────────────────────────────────────────────────
function HintLabel({ hovered }) {
  if (!hovered) return null
  const labels = {
    projects: 'View Projects →',
    experience: 'View Experience →',
    skills: 'View Skills →',
    about: 'About Bhargav →',
    contact: 'Get in Touch →',
  }
  return (
    <Text
      position={[0, 0.2, 3.5]}
      fontSize={0.18}
      color="#6366f1"
      anchorX="center"
      anchorY="middle"
    >
      {labels[hovered] ?? ''}
    </Text>
  )
}

// ── Main exported scene ─────────────────────────────────────────────────────
export default function RoomScene({ theme = 'dark', activeSection, onSectionClick }) {
  const [hovered, setHovered] = useState(null)

  const handlers = {
    onHover: setHovered,
    onLeave: () => setHovered(null),
    onClick: onSectionClick,
  }

  const isLight = theme === 'light'

  return (
    <>
      {/* Bamboo Zen Garden — light: morning mist, dark: moonlit forest */}
      <color attach="background" args={[isLight ? '#c8e0c0' : '#060e06']} />

      {/* Ambient base */}
      <ambientLight intensity={isLight ? 2.0 : 0.8} color={isLight ? '#e8f5e0' : '#204820'} />

      {/* Main directional — morning sun (day) / moonlight (night) */}
      <directionalLight position={[0, 4, 10]} intensity={isLight ? 1.8 : 1.4}
        color={isLight ? '#f5ffe0' : '#a0c8a0'} />
      <directionalLight position={[-4, 6, 4]} intensity={isLight ? 1.2 : 0.8}
        color={isLight ? '#fffce8' : '#608060'} />

      {/* Ceiling spot — warm bamboo lantern feel */}
      <spotLight position={[0, 6.8, -1]} angle={0.6} penumbra={0.9}
        intensity={isLight ? 5 : 4} color={isLight ? '#f0ffe8' : '#204820'}
        castShadow shadow-mapSize={[512, 512]} />

      {/* Monitor glow */}
      <pointLight position={[-0.5, 1.6, -2.5]} intensity={isLight ? 1.2 : 2.0} color="#38bdf8" distance={6} />
      {/* Desk lamp — warm golden */}
      <pointLight position={[0.9, 1.75, -3.05]} intensity={isLight ? 3 : 4.5} color="#ffd580" distance={7} />
      {/* Window — filtered sunlight (day) / forest moonlight (night) */}
      <pointLight position={[-6.5, 3.5, 0.8]} intensity={isLight ? 5 : 3}
        color={isLight ? '#c8f0a0' : '#406040'} distance={16} />
      {/* Experience board accent — jade */}
      <pointLight position={[5.5, 2.5, -2.0]} intensity={isLight ? 1 : 2.0} color="#4ade80" distance={7} />
      {/* Contact portal accent — soft teal */}
      <pointLight position={[-5.5, 2.5, -0.5]} intensity={isLight ? 1 : 1.8} color="#2dd4bf" distance={7} />
      {/* Front fill */}
      <pointLight position={[0, 3, 9]} intensity={isLight ? 2.2 : 2.0}
        color={isLight ? '#e0f8d0' : '#305030'} distance={18} />

      {/* Room geometry */}
      <Floor theme={theme} />
      <Walls theme={theme} />
      <WindowPanel theme={theme} />

      {/* Furniture */}
      <Desk />
      <DeskLamp />
      <Chair />
      <Plant />

      {/* Interactive objects */}
      <Monitor {...handlers} />
      <Nameplate {...handlers} />
      <ExperienceBoard {...handlers} />
      <Whiteboard {...handlers} />
      <ContactPortal {...handlers} />

      {/* Floating title + hint */}
      <RoomTitle />
      <HintLabel hovered={hovered} />

      {/* Camera controller */}
      <CameraController activeSection={activeSection} />
    </>
  )
}
