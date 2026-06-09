import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, Line } from '@react-three/drei'
import * as THREE from 'three'

// Positions for a distributed system / microservices-topology feel
const NODE_COUNT = 18

function generateNodes(count) {
  return Array.from({ length: count }, (_, i) => {
    const theta = (i / count) * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 1.8 + Math.random() * 1.2
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta) * 0.6,
      r * Math.cos(phi)
    )
  })
}

function NodeMesh({ position, size, emissiveIntensity }) {
  const meshRef = useRef()
  const speed = useMemo(() => 0.3 + Math.random() * 0.4, [])
  const offset = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position.y + Math.sin(clock.elapsedTime * speed + offset) * 0.12
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color="#6366f1"
        emissive="#6366f1"
        emissiveIntensity={emissiveIntensity}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function ConnectionLines({ nodes }) {
  const lines = useMemo(() => {
    const result = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j])
        if (dist < 2.2) {
          result.push([nodes[i], nodes[j]])
        }
      }
    }
    return result
  }, [nodes])

  return (
    <>
      {lines.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#6366f1"
          lineWidth={0.4}
          transparent
          opacity={0.15}
        />
      ))}
    </>
  )
}

function Scene({ mousePos }) {
  const groupRef = useRef()
  const { viewport } = useThree()

  const nodes = useMemo(() => generateNodes(NODE_COUNT), [])

  const sizes = useMemo(
    () => nodes.map(() => 0.04 + Math.random() * 0.06),
    [nodes]
  )
  const intensities = useMemo(
    () => nodes.map(() => 0.3 + Math.random() * 0.5),
    [nodes]
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    // Slow base rotation
    groupRef.current.rotation.y = clock.elapsedTime * 0.06

    // Cursor tilt — subtle, elegant
    const targetX = (mousePos.current.y / window.innerHeight - 0.5) * 0.4
    const targetY = (mousePos.current.x / window.innerWidth - 0.5) * 0.4
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.z += (-targetY - groupRef.current.rotation.z) * 0.04
  })

  return (
    <group ref={groupRef}>
      <ConnectionLines nodes={nodes} />
      {nodes.map((pos, i) => (
        <NodeMesh
          key={i}
          position={pos}
          size={sizes[i]}
          emissiveIntensity={intensities[i]}
        />
      ))}
    </group>
  )
}

export default function HeroScene() {
  const mousePos = useRef({ x: 0, y: 0 })
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    if (prefersReducedMotion) return
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#6366f1" />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#8b5cf6" />
      {!prefersReducedMotion && <Scene mousePos={mousePos} />}
      {prefersReducedMotion && (
        <Scene mousePos={{ current: { x: 0, y: 0 } }} />
      )}
    </Canvas>
  )
}
