'use client'

import { Suspense, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Sparkles } from '@react-three/drei'
import { motion } from 'framer-motion'

export interface CoreNodeInfo {
  id: string
  label: string
  desc: string
  href: string
}

const CORE_NODES: CoreNodeInfo[] = [
  {
    id: 'api',
    label: 'API LAYER',
    desc: 'Versioned REST interfaces with auth, validation and rate limiting.',
    href: '#architecture',
  },
  {
    id: 'data',
    label: 'DATA LAYER',
    desc: 'Relational source of truth backed by distributed caching.',
    href: '#database',
  },
  {
    id: 'perf',
    label: 'PERFORMANCE',
    desc: 'Caching, indexing and async processing under load.',
    href: '#performance',
  },
  {
    id: 'sec',
    label: 'SECURITY',
    desc: 'JWT sessions, RBAC and layered API defense.',
    href: '#security',
  },
  {
    id: 'ops',
    label: 'PRODUCTION OPS',
    desc: 'CI/CD pipelines and real-world incident response.',
    href: '#devops',
  },
]

const ORBIT_R = 3.15

function Rig() {
  useFrame((state, delta) => {
    const cam = state.camera
    const scroll =
      typeof window !== 'undefined'
        ? Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1)
        : 0
    cam.position.x = THREE.MathUtils.damp(cam.position.x, state.pointer.x * 0.75, 2.2, delta)
    cam.position.y = THREE.MathUtils.damp(
      cam.position.y,
      0.55 - state.pointer.y * 0.45 - scroll * 1.2,
      2.2,
      delta,
    )
    cam.position.z = THREE.MathUtils.damp(cam.position.z, 7.8 - scroll * 2.4, 2.0, delta)
    cam.lookAt(0, 0, 0)
  })
  return null
}

function InteractiveNode({
  node,
  onHover,
}: {
  node: CoreNodeInfo
  onHover: (n: CoreNodeInfo | null) => void
}) {
  const group = useRef<THREE.Group>(null!)
  const target = useRef(1)

  const position = useMemo<[number, number, number]>(
    () => [Math.cos(nodeAngle(node.id)) * ORBIT_R, 0, Math.sin(nodeAngle(node.id)) * ORBIT_R],
    [node.id],
  )

  useFrame((_, delta) => {
    const s = THREE.MathUtils.damp(group.current.scale.x, target.current, 8, delta)
    group.current.scale.setScalar(s)
    group.current.rotation.y += delta * 0.4
  })

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        target.current = 1.55
        onHover(node)
      }}
      onPointerOut={() => {
        target.current = 1
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        document.querySelector(node.href)?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <mesh>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color="#FF6B2C" emissive="#FF6B2C" emissiveIntensity={0.55} roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh scale={1.9}>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshBasicMaterial color="#FF6B2C" wireframe transparent opacity={0.28} />
      </mesh>
      <Html center distanceFactor={11} position={[0, 0.55, 0]} className="select-none" zIndexRange={[20, 0]}>
        <span className="pointer-events-none whitespace-nowrap font-mono text-[9px] tracking-[0.22em] text-fg/90">
          {node.label}
        </span>
      </Html>
    </group>
  )
}

function nodeAngle(id: string) {
  const angles: Record<string, number> = {
    api: -0.55,
    data: 0.62,
    perf: 1.8,
    sec: 3.55,
    ops: 4.65,
  }
  return angles[id] ?? 0
}

function ServiceBoxes() {
  const group = useRef<THREE.Group>(null!)
  const boxes = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        angle: (i / 9) * Math.PI * 2,
        y: Math.sin(i * 1.7) * 0.35,
        size: 0.09 + (i % 3) * 0.03,
      })),
    [],
  )

  useFrame((_, delta) => {
    group.current.rotation.y -= delta * 0.12
  })

  return (
    <group ref={group}>
      {boxes.map(({ angle, y, size }, i) => (
        <mesh key={i} position={[Math.cos(angle) * 2.42, y, Math.sin(angle) * 2.42]}>
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial color="#C9D2DE" metalness={0.7} roughness={0.32} />
        </mesh>
      ))}
    </group>
  )
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4.6 + Math.random() * 5.5
      const theta = Math.random() * Math.PI * 2
      arr[i * 3] = Math.cos(theta) * r
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7
      arr[i * 3 + 2] = Math.sin(theta) * r
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 0.018
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#8B93A1" transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function CoreStructure() {
  const outer = useRef<THREE.Mesh>(null!)
  const accentRing = useRef<THREE.Mesh>(null!)
  const wire = useRef<THREE.Mesh>(null!)
  const solid = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    accentRing.current.rotation.z += delta * 0.22
    wire.current.rotation.y -= delta * 0.16
    wire.current.rotation.x += delta * 0.05
    solid.current.rotation.y += delta * 0.1
    outer.current.rotation.y += delta * 0.04
  })

  return (
    <group>
      <mesh ref={outer} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[ORBIT_R, 0.012, 12, 140]} />
        <meshBasicMaterial color="#F5F7FA" transparent opacity={0.16} />
      </mesh>

      <mesh ref={accentRing} rotation={[Math.PI / 2.2, 0.3, 0]}>
        <torusGeometry args={[3.6, 0.007, 8, 120, Math.PI * 0.65]} />
        <meshBasicMaterial color="#FF6B2C" transparent opacity={0.85} />
      </mesh>

      <mesh ref={wire}>
        <icosahedronGeometry args={[1.08, 1]} />
        <meshBasicMaterial color="#FF6B2C" wireframe transparent opacity={0.75} />
      </mesh>
      <mesh ref={solid}>
        <icosahedronGeometry args={[0.86, 1]} />
        <meshStandardMaterial
          color="#101319"
          emissive="#FF6B2C"
          emissiveIntensity={0.3}
          metalness={0.35}
          roughness={0.4}
        />
      </mesh>
      <pointLight color="#FF6B2C" intensity={14} distance={9} decay={2} />
    </group>
  )
}

export default function EngineeringCore({
  onHover,
  particleCount = 650,
}: {
  onHover: (n: CoreNodeInfo | null) => void
  particleCount?: number
}) {
  const [hovering, setHovering] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className="h-full w-full"
      data-cursor={hovering ? 'node' : undefined}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ fov: 42, position: [0, 0.55, 7.8] }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent onHover={(n) => {
            setHovering(!!n)
            onHover(n)
          }} particleCount={particleCount} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}

function SceneContent({
  onHover,
  particleCount,
}: {
  onHover: (n: CoreNodeInfo | null) => void
  particleCount: number
}) {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 7, 4]} intensity={1.05} />
      <pointLight position={[-6, -3, -4]} intensity={4} color="#5B6B84" />

      <Rig />
      <CoreStructure />
      <ServiceBoxes />
      <ParticleField count={particleCount} />
      <Sparkles count={36} scale={11} size={1.6} speed={0.25} color="#FF6B2C" opacity={0.4} />

      {CORE_NODES.map((node) => (
        <InteractiveNode key={node.id} node={node} onHover={onHover} />
      ))}
    </>
  )
}
